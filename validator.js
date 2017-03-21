/*============================================================================*
  ImportJSON by William Furr (william.furr@gmail.com)
  ============================================================================
  Version:      1.0
  Copyright:    (c) 2017 by William Furr
  License:      CC BY-NC-SA 4.0
                https://creativecommons.org/licenses/by-nc-sa/4.0/
  Github URL:   https://github.com/wffurr/safe-contract-validator
  ----------------------------------------------------------------------------
  A library for importing EVE contracts and validating that they meet the
  Nobody in Local [SA.FE] loot buy contract requirements.
  ----------------------------------------------------------------------------
  Changelog:
  
  1.0    Initial release
  1.1    Nonce for force-refresh and error handling
   1.2    Use NPC prices for blue loot
*===========================================================================*/

/**
 * Configuration fields for API key and price calculations
 */
PRICE_EPSILON = 1000000;
TAX_RATE = 0.85;

/**
 * Constants for contract verification
 */
ALLIANCE_ID=99000739;
NOBODY_IN_LOCAL_ID=98477920;
STATION_ID=1021149293700;

/**
 *  Blue loot is handled by fixed NPC buy orders, not evepraisal price.
 */
BLUE_LOOT = {
  'Ancient Coordinates Database': 1500000,
  'Neural Network Analyzer': 200000,
  'Sleeper Data Library': 500000,
  'Sleeper Drone AI Nexus': 5000000
};

/**
 * Fetch all SA.FE contracts from the EVE XML API
 *
 * @return 2D array of contract data and validation.
 */
function validateContracts(keyID, vCode, nonce) {
  var contracts = getContracts(keyID, vCode);
  var name_cache = {};
  var output = [];
  for (var i = 0, leni = contracts.length; i < leni; i++) {
    if (contracts[i].status != 'Outstanding') continue;
    populateFields(contracts[i], name_cache, keyID, vCode);
    validate(contracts[i]);
    output.push(buildOutput(contracts[i]));
  }
  if (output.length == 0) {
    output = ['No contracts found for Nobody in Local [SA.FE]'];
  }
  return output.sort(function(x, y) {
    if (x[7] != y[7]) {  // Status
      if (x[7] == 'Outstanding') return -1;
      if (y[7] == 'Outstanding') return 1;
    }
    if (x[4] != y[4]) {
      return parseEVEAPIDate(x[4]) - parseEVEAPIDate(y[4]);  // expiration date
    } else {
      return parseEVEAPIDate(y[3]) - parseEVEAPIDate(x[3]);  // issue date
    }
  });
}

/**
 * Get all SA.FE contracts as JS objects via the EVE XML API
 *
 * @see https://community.eveonline.com/news/dev-blogs/caks-and-contracts-in-the-api/
 */
function getContracts(keyID, vCode) {
  var url = 'https://api.eveonline.com/corp/Contracts.xml.aspx?keyID=' + keyID +
            '&vCode=' + vCode;
  var xml = UrlFetchApp.fetch(url).getContentText();
  var doc = XmlService.parse(xml);
  var root = doc.getRootElement();
  var rowset = root.getChild('result').getChild('rowset');
  var fields = rowset.getAttribute('columns').getValue().split(',');
  var rows = rowset.getChildren('row');
  var contracts = [], contract;
  for (var row_idx = 0; row_idx < rows.length; row_idx++) {
    contract = {};
    for (var field_idx = 0; field_idx < fields.length; field_idx++) {
      contract[fields[field_idx]] =
          rows[row_idx].getAttribute(fields[field_idx]).getValue();
    }
    contracts.push(contract);
  }
  return contracts;
}

/**
 * Given raw contract data, populate all missing fields
 *
 * name and corp for issuer / assignee / acceptor
 * item list
 * error field
 */
function populateFields(contract, name_cache, keyID, vCode) {
  populateNames(contract, name_cache);
  if (contract.type == 'ItemExchange') {
    populateItems(contract, keyID, vCode);
  }
}

/**
 * Adds fieldName and fieldCorp fields to contract for each name-related field:
 *   issuer, assignee, and acceptor.
 *
 * Uses name_cache to avoid repeat API calls for the same characterID
 */
function populateNames(contract, name_cache) {
  var name_id;
  for (var name_field in {issuer:1, assignee:1, acceptor:1}) {
    name_id = contract[name_field + 'ID'];
    if (name_id == 0) continue;
    if (!(name_id in name_cache)) {
      name_cache[name_id] = fetchCharacterOrCorporationName(name_id);
    }
    contract[name_field + 'Name'] = name_cache[name_id].name;
    contract[name_field + 'Corp'] = name_cache[name_id].corp;
  }
}

function fetchCharacterOrCorporationName(id) {
  // Try first as characterID, will 500 if ID is actually a corporation
  if (id == ALLIANCE_ID) {
    return {
      name: 'Of Sound Mind',
      corp: 'Of Sound Mind'
    };
  }
  if (id = NOBODY_IN_LOCAL_ID) {
    return {
      name: 'Nobody in Local',
      corp: 'Nobody in Local'
    }
  }
  var isCorp = false, resp, doc, root;
  var url = 'https://api.eveonline.com/eve/CharacterInfo.xml.aspx?characterID=';
  resp = UrlFetchApp.fetch(url + id, { muteHttpExceptions: true });
  if (resp.getResponseCode() == 500) {
    isCorp = true;
    url = 'https://api.eveonline.com/corp/CorporationSheet.xml.aspx?corporationID='
    resp = UrlFetchApp.fetch(url + id, { muteHttpExceptions: true });
    if (resp.getResponseCode() == 500) {
      return { name: 'unknown', corp: 'unknown' };
    }
  }
  var xml = resp.getContentText();
  doc = XmlService.parse(xml);
  root = doc.getRootElement();
  if (isCorp) {
    return {
      name: root.getChild('result').getChild('corporationName').getText(),
      corp: root.getChild('result').getChild('corporationName').getText()
    };
  } else {
    return {
      name: root.getChild('result').getChild('characterName').getText(),
      corp: root.getChild('result').getChild('corporation').getText()
    };
  }
}

/**
 * Adds contractItems and evepraisalItems fields to contract
 */
function populateItems(contract, keyID, vCode) {
  var contract_items_url =
      'https://api.eveonline.com/corp/ContractItems.xml.aspx?contractID=';
  var contract_items_url_key = '&keyID=' + keyID + '&vCode=' + vCode + '';
  try {
    var xml = UrlFetchApp.fetch(contract_items_url + contract.contractID + contract_items_url_key);
  } catch(error) {
    contract.valid = false;
    contract.error_msg = 'Unable to load contract items, EVE API error: ' + error.toString();
    return;
  }
  var doc = XmlService.parse(xml.getContentText());
  var root = doc.getRootElement();
  var rows = root.getChild('result').getChild('rowset').getChildren('row');
  var typeID;
  contract.contractItems = {};
  for (var i = 0, leni = rows.length; i < leni; i++) {
    typeID = rows[i].getAttribute('typeID').getValue();
    if (!(typeID in contract.contractItems)) {
      contract.contractItems[typeID] = 0;  
    }
    contract.contractItems[typeID] +=
        parseInt(rows[i].getAttribute('quantity').getValue());
  }
  
  var evepraisal_url = contract.title.match('http://evepraisal.com/e/[0-9]+');
  if (evepraisal_url) {
    var json = UrlFetchApp.fetch(evepraisal_url + '.json');
    var evepraisal = JSON.parse(json.getContentText());
    contract.evepraisal = {
      buy_total: evepraisal.totals.buy,
      market: evepraisal.market_name,
      created: new Date(evepraisal.created * 1000),
      items: {}
    };
    for (i = 0, leni = evepraisal.items.length; i < leni; i++) {
      typeID = evepraisal.items[i].typeID;
      if (!(typeID in contract.evepraisal.items)) {
        contract.evepraisal.items[typeID] = 0;
      }
      contract.evepraisal.items[typeID] +=
          parseInt(evepraisal.items[i].quantity);
    }
  }
}

/**
 * Adds valid and error_msg fields to a fully populated contract
 */
function validate(contract) {
  if (contract.valid === false) {
    return;  // Already failed validation
  }
  if (contract.type !== 'ItemExchange') {
    contract.valid = false;
    contract.error_msg = 'Not an Item Exchange contract';
    return;
  }
  // TODO allow contracts from alt corps / blue alts?
  if (contract.issuerCorp !== 'Nobody in Local') {
    contract.valid = false;
    contract.error_msg = 'Issuer is not a member of Nobody in Local';
    return;
  }
  if (contract.assigneeName !== 'Nobody in Local') {
    if (contract.assigneeName == 'Of Sound Mind') {
      contract.error_msg = 'Alliance contract - please mail issuer';
    } else {
      contract.valid = false;
      contract.error_msg = 'Contract is not assigned to Nobody in Local';
      return;
    }
  }
  if (contract.startStationID != STATION_ID) {
    contract.valid = false;
    contract.error_msg = 'Contract is not in DHOP';
    return;
  }
  if (contract.reward > 0 || contract.collateral > 0) {
    contract.valid = false;
    contract.error_msg = 'Contract has collateral or reward > 0';
    return;
  }
  if (!('evepraisal' in contract)) {
    contract.valid = false;
    contract.error_msg = 'EVEpraisal URL not found in contract title';
    return;
  }
  var evepraisal_price = calcEvepraisalPrice(contract.evepraisal);
  if (contract.price !== 0 &&
        Math.abs(Math.round(contract.price) -
        Math.round(evepraisal_price * TAX_RATE)) > PRICE_EPSILON) {
    contract.valid = false;
    contract.error_msg = 'Contract price (' + contract.price + ') does not match evepraisal price * ' +
                         'tax rate (' + evepraisal_price + ' * ' + TAX_RATE + ' = ' + Math.round(evepraisal_price * TAX_RATE) + ')';
    return;
  }
  for (var typeID in contract.contractItems) {
    if (contract.contractItems[typeID] != contract.evepraisal.items[typeID]) {
      contract.valid = false;
      contract.error_msg = 'Contract item missing or quantity mismatch with ' +
                           'evepraisal';
      return;
    }
  }
  for (typeID in contract.evepraisal.items) {
    if (contract.contractItems[typeID] != contract.evepraisal.items[typeID]) {
      contract.valid = false;
      contract.error_msg = 'Contract item missing or quantity mismatch with ' +
                           'evepraisal';
      return;
    }
  }
  if (parseEVEAPIDate(contract.dateExpired) < Date.now()) {
    contract.valid = false;
    contract.error_msg = 'Contract expired!  Ask issuer to re-issue.';
    return;
  }
  // TODO loot whitelist or blacklist check
  contract.valid = true;
}

/**
 * Given populated and validated contract data, builds the output array
 *
 */
function buildOutput(contract) {
  var result = [
    contract.title,
    contract.issuerName,
    parseFloat(contract.price),
    contract.dateIssued,
    contract.dateExpired,
    contract.valid,
    contract.error_msg,
    parseEVEAPIDate(contract.dateExpired) < Date.now() ? 'Expired' : contract.status,
    contract.acceptorName,
    contract.dateAccepted,
  ];
  return result;
}

/**
 * I don't know why this is a thing, but Date.parse in Google Apps script can't handle
 * simple date formats like 2016-10-22 02:35:14.
 */
function parseEVEAPIDate(date_string) {
  var parts = date_string.split(' ');
  var date_part = parts[0];
  var time_part = parts[1];
  var date = new Date();
  parts = date_part.split('-');
  date.setFullYear(parts[0], parseInt(parts[1]) - 1, parts[2]);
  parts = time_part.split(':');
  date.setHours(parts[0]);
  date.setMinutes(parts[1]);
  date.setSeconds(parts[2]);
  return date.valueOf();  // Unix timestamp
}

function calcEvepraisalPrice(evepraisal) {
  var total = 0;
  for (i = 0, leni = evepraisal.items.length; i < leni; i++) {
    var item = evepraisal.items[i];
    if (item.name in BLUE_LOOT) {
      total += BLUE_LOOT[item.name] * item.quantity;
    } else {
      total += item.prices.buy.max * item.quantity;
    }
  }
  return total;
}
