/*============================================================================*
  ImportJSON by William Furr (william.furr@gmail.com)
  ============================================================================
  Version:      1.0
  Copyright:    (c) 2016 by William Furr
  License:      CC BY-NC-SA 4.0
                https://creativecommons.org/licenses/by-nc-sa/4.0/
  Github URL:   https://github.com/wffurr/safe-contract-validator
  ----------------------------------------------------------------------------
  A library for importing EVE contracts and validating that they meet the
  Nobody in Local [SA.FE] loot buy contract requirements.
  ----------------------------------------------------------------------------
  Changelog:
  
  1.0    Initial release
 *===========================================================================*/

/**
 * Configuration fields for API key and price calculations
 */
PRICE_EPSILON = 10;
TAX_RATE = 0.85;

/**
 * Fetch all SA.FE contracts from the EVE XML API
 *
 * @return 2D array of contract data and validation.
 */
function validateContracts(keyID, vCode) {
  var contracts = getContracts(keyID, vCode);
  var name_cache = {};
  var output = [];
  for (var i = 0, leni = contracts.length; i < leni; i++) {
    populateFields(contracts[i], name_cache, keyID, vCode);
    validate(contracts[i]);
    output.push(buildOutput(contracts[i]));
  }
  return output;
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
  populateItems(contract, keyID, vCode);
}

/**
 * Adds fieldName and fieldCorp fields to contract for each name-related field:
 *   issuer, assignee, and acceptor.
 *
 * Uses name_cache to avoid repeat API calls for the same characterID
 */
function populateNames(contract, name_cache) {
  var url = 'https://api.eveonline.com/eve/CharacterInfo.xml.aspx?characterID=';
  var nameID, xml, doc, root, name, corp;
  for (var name_field in {issuer:1, assignee:1, acceptor:1}) {
    name_id = contract[name_field + 'ID'];
    if (!(name_id in name_cache)) {
      xml = UrlFetchApp.fetch(url + name_id);
      doc = XmlService.parse(xml);
      root = doc.getRootElement();
      name_cache[name_id] = {
        name: root.getChild('result').getChild('characterName').getText(),
        corp: root.getChild('result').getChild('corporation').getText()
      };
    }
    contract[name_field + 'Name'] = name_cache[name_id].name;
    contract[name_field + 'Corp'] = name_cache[name_id].corp;
  }
}

/**
 * Adds contractItems and evepraisalItems fields to contract
 */
function populateItems(contract, keyID, vCode) {
  var contract_items_url =
      'https://api.eveonline.com/corp/ContractItems.xml.aspx?keyID=' + keyID +
      '&vCode=' + vCode + '&contractID=';
  var xml = UrlFetchApp.fetch(contract_items_url + contract.contractID);
  var doc = XmlService.parse(xml);
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
    var evepraisal = JSON.parse(json);
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
  // TODO allow contracts issued to SOUND Holding?
  // How does that work with the API key?
  if (contract.assigneeName !== 'Nobody in Local') {
    contract.valid = false;
    contract.error_msg = 'Contract is not assigned to Nobody in Local';
    return;
  }
  if (contract.startStationID != 1021149293700) {
    contract.valid = false;
    contract.error_msg = 'Contract is not in DHOP';
  }
  if (contract.reward > 0 || contract.collateral > 0) {
    contract.valid = false;
    contract.error_msg = 'Contract has collateral or reward > 0';
    return;
  }
  if (!'evepraisal' in contract) {
    contract.valid = false;
    contract.error_msg = 'EVEpraisal URL not found in contract title';
    return;
  }
  if (contract.price !== 0 &&
        Math.abs(Math.round(contract.price) -
        Math.round(contract.evepraisal.buy_total * TAX_RATE)) > PRICE_EPSILON) {
    contract.valid = false;
    contract.error_msg = 'Contract price does not match evepraisal price * ' +
                         'tax rate';
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
    contract.price,
    contract.dateIssued,
    contract.numDays,
    contract.valid,
    contract.error_msg,
    contract.status,
    contract.acceptorName,
    contract.dateAccepted,
  ];
  // TODO figure out date sorting, doesn't seem to work
  result = result.sort(function(x, y) {
      if (x.numDays != y.numDays) {
        return y.numDays - x.numDays;
      } else {
        return y.dateIssued - x.dateIssued;
      }
    });
  return result;
}