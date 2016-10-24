eval(require('fs').readFileSync('./mock_apps_script.js', 'utf8'));
eval(require('fs').readFileSync('./validator.js', 'utf8'));

// Tests

UrlFetchApp.addResult('https://api.eveonline.com/corp/Contracts.xml.aspx',
'<eveapi version="2">' +
  '<currentTime>2016-10-24 21:08:59</currentTime>' + 
  '<result>' +
    '<rowset name="contractList" key="contractID" columns="contractID,issuerID,issuerCorpID,assigneeID,acceptorID,startStationID,endStationID,type,status,title,forCorp,availability,dateIssued,dateExpired,dateAccepted,numDays,dateCompleted,price,reward,collateral,buyout,volume">' +
      '<row contractID="109279782" issuerID="94345370" issuerCorpID="98477920" assigneeID="94687401" acceptorID="94687401" startStationID="60005746" endStationID="60005746" type="ItemExchange" status="Completed" title="" forCorp="1" availability="Private" dateIssued="2016-10-04 13:13:08" dateExpired="2016-10-18 13:13:08" dateAccepted="2016-10-04 13:16:11" numDays="0" dateCompleted="2016-10-04 13:16:11" price="0.00" reward="0.00" collateral="0.00" buyout="0.00" volume="1170229.145"/>' +
    '</rowset>' +
  '</result>' +
'</eveapi>');

UrlFetchApp.addResult('https://api.eveonline.com/eve/CharacterInfo.xml.aspx',
'');

UrlFetchApp.addResult('https://api.eveonline.com/corp/ContractItems.xml.aspx',
'');

UrlFetchApp.addResult('http://evepraisal.com',
'');

var result = validateContracts('', '');
console.log(result);