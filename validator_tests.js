eval(require('fs').readFileSync('./mock_apps_script.js', 'utf8'));
eval(require('fs').readFileSync('./validator.js', 'utf8'));

// Tests

UrlFetchApp.addResult('https://api.eveonline.com/corp/Contracts.xml.aspx',
'<eveapi version="2">' +
  '<currentTime>2016-10-24 21:08:59</currentTime>' + 
  '<result>' +
    '<rowset name="contractList" key="contractID" columns="contractID,issuerID,issuerCorpID,assigneeID,acceptorID,startStationID,endStationID,type,status,title,forCorp,availability,dateIssued,dateExpired,dateAccepted,numDays,dateCompleted,price,reward,collateral,buyout,volume">' +
      '<row contractID="116238992" issuerID="836864942" issuerCorpID="98477920" assigneeID="98477920" acceptorID="0" startStationID="1021149293700" endStationID="1021149293700" type="ItemExchange" status="Outstanding" title="http://evepraisal.com/e/16301192" forCorp="0" availability="Private" dateIssued="2017-03-21 13:17:22" dateExpired="2017-03-28 13:17:22" dateAccepted="" numDays="0" dateCompleted="" price="1258745956.00" reward="0.00" collateral="0.00" buyout="0.00" volume="538.13"/>' +
    '</rowset>' +
  '</result>' +
'</eveapi>');

UrlFetchApp.addResult('https://api.eveonline.com/eve/CharacterInfo.xml.aspx?characterID=836864942',
'<eveapi version="2">' +
  '<currentTime>2017-03-21 13:57:22</currentTime>' +
  '<result>' +
    '<characterID>836864942</characterID>' +
    '<characterName>Raksan Ibid</characterName>' +
    '<race>Amarr</race>' +
    '<bloodlineID>5</bloodlineID>' +
    '<bloodline>Amarr</bloodline>' +
    '<ancestryID>3</ancestryID>' +
    '<ancestry>Religious Reclaimers</ancestry>' +
    '<corporationID>98477920</corporationID>' +
    '<corporation>Nobody in Local</corporation>' +
    '<corporationDate>2016-10-01 22:45:00</corporationDate>' +
    '<allianceID>99000739</allianceID>' +
    '<alliance>Of Sound Mind</alliance>' +
    '<allianceDate>2016-09-28 13:23:00</allianceDate>' +
    '<securityStatus>4.81795862252079</securityStatus>' +
    '<rowset name="employmentHistory" key="recordID" columns="recordID,corporationID,corporationName,startDate">' +
      '<row recordID="42793442" corporationID="98477920" corporationName="Nobody in Local" startDate="2016-10-01 22:45:00"/>' +
      '<row recordID="42793438" corporationID="1000066" corporationName="Viziam" startDate="2016-10-01 22:44:00"/>' +
      '<row recordID="37958328" corporationID="544497016" corporationName="Valkyries of Night" startDate="2015-04-30 02:31:00"/>' +
      '<row recordID="5079233" corporationID="1000066" corporationName="Viziam" startDate="2007-02-17 17:39:00"/>' +
      '<row recordID="5079232" corporationID="1001562011" corporationName="Sturmgrenadier Inc" startDate="2006-05-11 00:27:00"/>' +
      '<row recordID="5079231" corporationID="1000166" corporationName="Imperial Academy" startDate="2006-03-21 23:27:00"/>' +
    '</rowset>' +
  '</result>' +
  '<cachedUntil>2017-03-21 14:36:41</cachedUntil>' +
'</eveapi>');

UrlFetchApp.addResult('https://api.eveonline.com/corp/ContractItems.xml.aspx?contractID=116238992',
'<eveapi version="2">' +
  '<currentTime>2017-03-21 13:58:47</currentTime>' +
  '<result>' +
    '<rowset name="itemList" key="recordID" columns="recordID,typeID,quantity,rawQuantity,singleton,included">' +
      '<row recordID="2204719735" typeID="30618" quantity="5" singleton="0" included="1"/>' +
      '<row recordID="2204719736" typeID="30615" quantity="4" singleton="0" included="1"/>' +
      '<row recordID="2204719737" typeID="30558" quantity="1" singleton="0" included="1"/>' +
      '<row recordID="2204719738" typeID="30588" quantity="4" singleton="0" included="1"/>' +
      '<row recordID="2204719739" typeID="9826" quantity="4" singleton="0" included="1"/>' +
      '<row recordID="2204719740" typeID="30745" quantity="890" singleton="0" included="1"/>' +
      '<row recordID="2204719741" typeID="30744" quantity="890" singleton="0" included="1"/>' +
      '<row recordID="2204719742" typeID="30746" quantity="254" singleton="0" included="1"/>' +
      '<row recordID="2204719743" typeID="30600" quantity="3" singleton="0" included="1"/>' +
      '<row recordID="2204719744" typeID="30605" quantity="2" singleton="0" included="1"/>' +
      '<row recordID="2204719745" typeID="25617" quantity="9" singleton="0" included="1"/>' +
      '<row recordID="2204719746" typeID="30586" quantity="1" singleton="0" included="1"/>' +
      '<row recordID="2204719747" typeID="30633" quantity="2" singleton="0" included="1"/>' +
      '<row recordID="2204719748" typeID="20116" quantity="165" singleton="0" included="1"/>' +
      '<row recordID="2204719749" typeID="11496" quantity="138" singleton="0" included="1"/>' +
      '<row recordID="2204719750" typeID="20425" quantity="159" singleton="0" included="1"/>' +
      '<row recordID="2204719751" typeID="20115" quantity="153" singleton="0" included="1"/>' +
      '<row recordID="2204719752" typeID="20114" quantity="139" singleton="0" included="1"/>' +
      '<row recordID="2204719753" typeID="30562" quantity="3" singleton="0" included="1"/>' +
      '<row recordID="2204719754" typeID="30747" quantity="92" singleton="0" included="1"/>' +
    '</rowset>' +
  '</result>' +
  '<cachedUntil>2027-03-19 13:17:47</cachedUntil>' +
'</eveapi>');

UrlFetchApp.addResult('http://evepraisal.com/e/16301192.json',
'{' +
'  "created": 1490102215, ' +
'  "id": 16301192, ' +
'  "items": [' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Components", ' +
'      "groupID": 880, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Ancient Coordinates Database", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 1119425.82, ' +
'          "max": 2388888.88, ' +
'          "median": 1340011.14, ' +
'          "min": 190000.0, ' +
'          "percentile": 190000.0, ' +
'          "price": 190000.0, ' +
'          "stddev": 528462.32, ' +
'          "volume": 4377.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 1067505.57, ' +
'          "max": 1400000.0, ' +
'          "median": 1340011.14, ' +
'          "min": 190000.0, ' +
'          "percentile": 1400000.0, ' +
'          "price": 1400000.0, ' +
'          "stddev": 556798.82, ' +
'          "volume": 4000.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 1670303.85, ' +
'          "max": 2388888.88, ' +
'          "median": 1559499.98, ' +
'          "min": 1500000.0, ' +
'          "percentile": 1500000.0, ' +
'          "price": 1500000.0, ' +
'          "stddev": 334120.95, ' +
'          "volume": 377.0' +
'        }' +
'      }, ' +
'      "quantity": 254, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30746, ' +
'      "typeName": "Ancient Coordinates Database", ' +
'      "volume": 0.1' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "General", ' +
'      "groupID": 280, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Carbon", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 240.39, ' +
'          "max": 350.0, ' +
'          "median": 330.15, ' +
'          "min": 3.01, ' +
'          "percentile": 3.01, ' +
'          "price": 3.01, ' +
'          "stddev": 127.19, ' +
'          "volume": 4419994.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 240.17, ' +
'          "max": 330.19, ' +
'          "median": 330.15, ' +
'          "min": 3.01, ' +
'          "percentile": 330.19, ' +
'          "price": 330.19, ' +
'          "stddev": 134.94, ' +
'          "volume": 4410000.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 338.37, ' +
'          "max": 350.0, ' +
'          "median": 338.87, ' +
'          "min": 334.0, ' +
'          "percentile": 334.09, ' +
'          "price": 334.0, ' +
'          "stddev": 6.95, ' +
'          "volume": 9994.0' +
'        }' +
'      }, ' +
'      "quantity": 4, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 9826, ' +
'      "typeName": "Carbon", ' +
'      "volume": 0.01' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Datacores", ' +
'      "groupID": 333, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Datacore - Defensive Subsystems Engineering", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 6044.73, ' +
'          "max": 7411.0, ' +
'          "median": 7155.5, ' +
'          "min": 508.3, ' +
'          "percentile": 2534.49, ' +
'          "price": 2534.49, ' +
'          "stddev": 1555.9, ' +
'          "volume": 258024.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 3697.59, ' +
'          "max": 4000.0, ' +
'          "median": 3510.0, ' +
'          "min": 508.3, ' +
'          "percentile": 4000.0, ' +
'          "price": 4000.0, ' +
'          "stddev": 1408.45, ' +
'          "volume": 63000.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 6802.94, ' +
'          "max": 7411.0, ' +
'          "median": 7155.5, ' +
'          "min": 4633.99, ' +
'          "percentile": 5364.72, ' +
'          "price": 4633.99, ' +
'          "stddev": 806.52, ' +
'          "volume": 195024.0' +
'        }' +
'      }, ' +
'      "quantity": 138, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 11496, ' +
'      "typeName": "Datacore - Defensive Subsystems Engineering", ' +
'      "volume": 0.1' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Datacores", ' +
'      "groupID": 333, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Datacore - Electronic Subsystems Engineering", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 6134.09, ' +
'          "max": 8447.99, ' +
'          "median": 6900.0, ' +
'          "min": 1111.0, ' +
'          "percentile": 3799.34, ' +
'          "price": 3799.34, ' +
'          "stddev": 2021.7, ' +
'          "volume": 167611.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 3799.34, ' +
'          "max": 4200.0, ' +
'          "median": 4200.0, ' +
'          "min": 1111.0, ' +
'          "percentile": 4200.0, ' +
'          "price": 4200.0, ' +
'          "stddev": 1290.92, ' +
'          "volume": 42000.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 6914.75, ' +
'          "max": 8447.99, ' +
'          "median": 6944.98, ' +
'          "min": 6889.94, ' +
'          "percentile": 6899.71, ' +
'          "price": 6889.94, ' +
'          "stddev": 727.91, ' +
'          "volume": 125611.0' +
'        }' +
'      }, ' +
'      "quantity": 165, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 20116, ' +
'      "typeName": "Datacore - Electronic Subsystems Engineering", ' +
'      "volume": 0.1' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Datacores", ' +
'      "groupID": 333, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Datacore - Engineering Subsystems Engineering", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 5149.31, ' +
'          "max": 7000.0, ' +
'          "median": 7000.0, ' +
'          "min": 101.07, ' +
'          "percentile": 101.07, ' +
'          "price": 101.07, ' +
'          "stddev": 2021.46, ' +
'          "volume": 460440.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 1099.75, ' +
'          "max": 4200.08, ' +
'          "median": 101.07, ' +
'          "min": 101.07, ' +
'          "percentile": 4200.01, ' +
'          "price": 4200.08, ' +
'          "stddev": 1341.21, ' +
'          "volume": 143200.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 6977.26, ' +
'          "max": 7000.0, ' +
'          "median": 7000.0, ' +
'          "min": 5699.04, ' +
'          "percentile": 6599.16, ' +
'          "price": 5699.04, ' +
'          "stddev": 612.86, ' +
'          "volume": 317240.0' +
'        }' +
'      }, ' +
'      "quantity": 153, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 20115, ' +
'      "typeName": "Datacore - Engineering Subsystems Engineering", ' +
'      "volume": 0.1' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Datacores", ' +
'      "groupID": 333, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Datacore - Offensive Subsystems Engineering", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 6337.21, ' +
'          "max": 8198.98, ' +
'          "median": 6900.0, ' +
'          "min": 1000.02, ' +
'          "percentile": 1691.78, ' +
'          "price": 1691.78, ' +
'          "stddev": 2015.09, ' +
'          "volume": 387922.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 2678.87, ' +
'          "max": 4200.01, ' +
'          "median": 2420.02, ' +
'          "min": 1000.02, ' +
'          "percentile": 4200.0, ' +
'          "price": 4200.01, ' +
'          "stddev": 1192.01, ' +
'          "volume": 52100.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 6904.77, ' +
'          "max": 8198.98, ' +
'          "median": 6900.0, ' +
'          "min": 5499.98, ' +
'          "percentile": 6886.25, ' +
'          "price": 5499.98, ' +
'          "stddev": 951.94, ' +
'          "volume": 335822.0' +
'        }' +
'      }, ' +
'      "quantity": 159, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 20425, ' +
'      "typeName": "Datacore - Offensive Subsystems Engineering", ' +
'      "volume": 0.1' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Datacores", ' +
'      "groupID": 333, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Datacore - Propulsion Subsystems Engineering", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 6183.66, ' +
'          "max": 8900.0, ' +
'          "median": 6939.99, ' +
'          "min": 1017.84, ' +
'          "percentile": 4223.32, ' +
'          "price": 4223.32, ' +
'          "stddev": 1462.25, ' +
'          "volume": 570598.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 4422.19, ' +
'          "max": 4510.0, ' +
'          "median": 4505.05, ' +
'          "min": 1017.84, ' +
'          "percentile": 4510.0, ' +
'          "price": 4510.0, ' +
'          "stddev": 1343.22, ' +
'          "volume": 150700.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 6815.85, ' +
'          "max": 8900.0, ' +
'          "median": 6939.99, ' +
'          "min": 5490.0, ' +
'          "percentile": 5558.62, ' +
'          "price": 5490.0, ' +
'          "stddev": 973.65, ' +
'          "volume": 419898.0' +
'        }' +
'      }, ' +
'      "quantity": 139, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 20114, ' +
'      "typeName": "Datacore - Propulsion Subsystems Engineering", ' +
'      "volume": 0.1' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Defensive Relics", ' +
'      "groupID": 993, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Malfunctioning Armor Nanobot", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 547674.44, ' +
'          "max": 1300000.01, ' +
'          "median": 500400.0, ' +
'          "min": 50000.0, ' +
'          "percentile": 50000.0, ' +
'          "price": 50000.0, ' +
'          "stddev": 306864.67, ' +
'          "volume": 1580.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 466283.36, ' +
'          "max": 500400.03, ' +
'          "median": 500400.0, ' +
'          "min": 50000.0, ' +
'          "percentile": 500400.03, ' +
'          "price": 500400.03, ' +
'          "stddev": 157537.72, ' +
'          "volume": 1321.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 1106206.24, ' +
'          "max": 2599000.0, ' +
'          "median": 1099000.0, ' +
'          "min": 550300.81, ' +
'          "percentile": 550300.82, ' +
'          "price": 550300.81, ' +
'          "stddev": 499258.52, ' +
'          "volume": 303.0' +
'        }' +
'      }, ' +
'      "quantity": 4, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30615, ' +
'      "typeName": "Malfunctioning Armor Nanobot", ' +
'      "volume": 10.0' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Electronics Relics", ' +
'      "groupID": 990, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Malfunctioning Electromechanical Component", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 18411.36, ' +
'          "max": 3999998.95, ' +
'          "median": 25011.67, ' +
'          "min": 23.34, ' +
'          "percentile": 23.34, ' +
'          "price": 23.34, ' +
'          "stddev": 1370997.26, ' +
'          "volume": 101122.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 17975.61, ' +
'          "max": 1810000.03, ' +
'          "median": 23.34, ' +
'          "min": 23.34, ' +
'          "percentile": 17975.61, ' +
'          "price": 1810000.03, ' +
'          "stddev": 841698.9, ' +
'          "volume": 101100.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 2020909.07, ' +
'          "max": 3999998.95, ' +
'          "median": 1810000.04, ' +
'          "min": 1810000.04, ' +
'          "percentile": 1810000.04, ' +
'          "price": 1810000.04, ' +
'          "stddev": 938449.76, ' +
'          "volume": 22.0' +
'        }' +
'      }, ' +
'      "quantity": 3, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30600, ' +
'      "typeName": "Malfunctioning Electromechanical Component", ' +
'      "volume": 10.0' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Engineering Relics", ' +
'      "groupID": 992, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Malfunctioning Power Cores", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 1655340.91, ' +
'          "max": 9799000.0, ' +
'          "median": 1610000.01, ' +
'          "min": 2000.02, ' +
'          "percentile": 403818.45, ' +
'          "price": 403818.45, ' +
'          "stddev": 3937431.53, ' +
'          "volume": 1403.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 1354392.68, ' +
'          "max": 1610000.01, ' +
'          "median": 1056000.0, ' +
'          "min": 2000.02, ' +
'          "percentile": 1610000.0, ' +
'          "price": 1610000.01, ' +
'          "stddev": 607764.72, ' +
'          "volume": 1353.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 9799000.0, ' +
'          "max": 9799000.0, ' +
'          "median": 9799000.0, ' +
'          "min": 9798999.99, ' +
'          "percentile": 9798999.99, ' +
'          "price": 9798999.99, ' +
'          "stddev": 0.0, ' +
'          "volume": 50.0' +
'        }' +
'      }, ' +
'      "quantity": 1, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30586, ' +
'      "typeName": "Malfunctioning Power Cores", ' +
'      "volume": 10.0' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Propulsion Relics", ' +
'      "groupID": 971, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Malfunctioning Thruster Sections", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 858582.38, ' +
'          "max": 2940000.0, ' +
'          "median": 751000.02, ' +
'          "min": 500002.03, ' +
'          "percentile": 743689.4, ' +
'          "price": 743689.4, ' +
'          "stddev": 599944.24, ' +
'          "volume": 1190.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 743689.4, ' +
'          "max": 751000.02, ' +
'          "median": 625501.03, ' +
'          "min": 500002.03, ' +
'          "percentile": 751000.02, ' +
'          "price": 751000.02, ' +
'          "stddev": 125499.0, ' +
'          "volume": 1030.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 2238483.25, ' +
'          "max": 3489999.89, ' +
'          "median": 1489998.23, ' +
'          "min": 1100000.0, ' +
'          "percentile": 1219446.87, ' +
'          "price": 1100000.0, ' +
'          "stddev": 746286.21, ' +
'          "volume": 242.0' +
'        }' +
'      }, ' +
'      "quantity": 1, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30558, ' +
'      "typeName": "Malfunctioning Thruster Sections", ' +
'      "volume": 10.0' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Components", ' +
'      "groupID": 880, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Neural Network Analyzer", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 2000.0, ' +
'          "max": 2000.01, ' +
'          "median": 2000.01, ' +
'          "min": 2000.0, ' +
'          "percentile": 2000.0, ' +
'          "price": 2000.0, ' +
'          "stddev": 0.0, ' +
'          "volume": 105000.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 11221.17, ' +
'          "max": 188000.0, ' +
'          "median": 2000.0, ' +
'          "min": 2000.0, ' +
'          "percentile": 185675.79, ' +
'          "price": 188000.0, ' +
'          "stddev": 79648.47, ' +
'          "volume": 110550.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 203778.85, ' +
'          "max": 211100.0, ' +
'          "median": 205053.39, ' +
'          "min": 199405.15, ' +
'          "percentile": 199405.15, ' +
'          "price": 199405.15, ' +
'          "stddev": 4112.23, ' +
'          "volume": 475.0' +
'        }' +
'      }, ' +
'      "quantity": 890, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30744, ' +
'      "typeName": "Neural Network Analyzer", ' +
'      "volume": 0.1' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Salvaged Materials", ' +
'      "groupID": 754, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Power Circuit", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 537789.68, ' +
'          "max": 1299999.96, ' +
'          "median": 413011.5, ' +
'          "min": 50.0, ' +
'          "percentile": 354793.24, ' +
'          "price": 354793.24, ' +
'          "stddev": 276419.28, ' +
'          "volume": 150766.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 400569.49, ' +
'          "max": 413012.0, ' +
'          "median": 400000.0, ' +
'          "min": 220000.02, ' +
'          "percentile": 413012.0, ' +
'          "price": 413012.0, ' +
'          "stddev": 76249.82, ' +
'          "volume": 86155.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 748164.74, ' +
'          "max": 1299999.96, ' +
'          "median": 598999.46, ' +
'          "min": 439999.99, ' +
'          "percentile": 448418.16, ' +
'          "price": 439999.99, ' +
'          "stddev": 268086.06, ' +
'          "volume": 62111.0' +
'        }' +
'      }, ' +
'      "quantity": 9, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 25617, ' +
'      "typeName": "Power Circuit", ' +
'      "volume": 0.01' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Components", ' +
'      "groupID": 880, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Sleeper Data Library", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 273196.74, ' +
'          "max": 700333.77, ' +
'          "median": 415000.01, ' +
'          "min": 44399.98, ' +
'          "percentile": 44399.98, ' +
'          "price": 44399.98, ' +
'          "stddev": 151603.71, ' +
'          "volume": 25290.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 270785.47, ' +
'          "max": 465000.0, ' +
'          "median": 415000.01, ' +
'          "min": 44399.98, ' +
'          "percentile": 465000.0, ' +
'          "price": 465000.0, ' +
'          "stddev": 136431.2, ' +
'          "volume": 25079.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 559794.56, ' +
'          "max": 700333.77, ' +
'          "median": 572500.05, ' +
'          "min": 499716.3, ' +
'          "percentile": 499979.24, ' +
'          "price": 499716.3, ' +
'          "stddev": 73130.87, ' +
'          "volume": 211.0' +
'        }' +
'      }, ' +
'      "quantity": 890, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30745, ' +
'      "typeName": "Sleeper Data Library", ' +
'      "volume": 0.1' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Components", ' +
'      "groupID": 880, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Sleeper Drone AI Nexus", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 2312536.6, ' +
'          "max": 5564799.15, ' +
'          "median": 49998.99, ' +
'          "min": 99.99, ' +
'          "percentile": 99.99, ' +
'          "price": 99.99, ' +
'          "stddev": 1506628.68, ' +
'          "volume": 19887.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 1111407.43, ' +
'          "max": 4800003.59, ' +
'          "median": 49998.99, ' +
'          "min": 99.99, ' +
'          "percentile": 4800003.59, ' +
'          "price": 4800003.59, ' +
'          "stddev": 2303266.59, ' +
'          "volume": 14210.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 5319062.13, ' +
'          "max": 5564799.15, ' +
'          "median": 5312997.76, ' +
'          "min": 5299999.98, ' +
'          "percentile": 5311006.17, ' +
'          "price": 5299999.98, ' +
'          "stddev": 109969.87, ' +
'          "volume": 5677.0' +
'        }' +
'      }, ' +
'      "quantity": 92, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30747, ' +
'      "typeName": "Sleeper Drone AI Nexus", ' +
'      "volume": 0.1' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Defensive Relics", ' +
'      "groupID": 993, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Wrecked Armor Nanobot", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 10955.5, ' +
'          "max": 23999.98, ' +
'          "median": 11000.05, ' +
'          "min": 3116.72, ' +
'          "percentile": 10536.28, ' +
'          "price": 10536.28, ' +
'          "stddev": 5863.51, ' +
'          "volume": 14426.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 10861.73, ' +
'          "max": 11000.05, ' +
'          "median": 11000.05, ' +
'          "min": 3116.72, ' +
'          "percentile": 11000.05, ' +
'          "price": 11000.05, ' +
'          "stddev": 3716.23, ' +
'          "volume": 14250.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 44960.77, ' +
'          "max": 249998.0, ' +
'          "median": 54995.98, ' +
'          "min": 15500.0, ' +
'          "percentile": 15964.29, ' +
'          "price": 15500.0, ' +
'          "stddev": 82238.01, ' +
'          "volume": 532.0' +
'        }' +
'      }, ' +
'      "quantity": 5, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30618, ' +
'      "typeName": "Wrecked Armor Nanobot", ' +
'      "volume": 10.0' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Electronics Relics", ' +
'      "groupID": 990, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Wrecked Electromechanical Component", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 2381.8, ' +
'          "max": 11747.99, ' +
'          "median": 2404.0, ' +
'          "min": 2300.02, ' +
'          "percentile": 2300.02, ' +
'          "price": 2300.02, ' +
'          "stddev": 2864.5, ' +
'          "volume": 13207.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 2358.95, ' +
'          "max": 2408.87, ' +
'          "median": 2352.5, ' +
'          "min": 2300.02, ' +
'          "percentile": 2408.86, ' +
'          "price": 2408.87, ' +
'          "stddev": 50.5, ' +
'          "volume": 13090.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 121707.62, ' +
'          "max": 300000.0, ' +
'          "median": 89498.99, ' +
'          "min": 3999.98, ' +
'          "percentile": 3999.98, ' +
'          "price": 3999.98, ' +
'          "stddev": 71447.58, ' +
'          "volume": 305.0' +
'        }' +
'      }, ' +
'      "quantity": 2, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30605, ' +
'      "typeName": "Wrecked Electromechanical Component", ' +
'      "volume": 10.0' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Engineering Relics", ' +
'      "groupID": 992, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Wrecked Power Cores", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 1010.83, ' +
'          "max": 4798.0, ' +
'          "median": 1004.53, ' +
'          "min": 1004.5, ' +
'          "percentile": 1004.5, ' +
'          "price": 1004.5, ' +
'          "stddev": 1247.35, ' +
'          "volume": 20045.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 1004.52, ' +
'          "max": 1004.53, ' +
'          "median": 1004.52, ' +
'          "min": 1004.5, ' +
'          "percentile": 1004.53, ' +
'          "price": 1004.53, ' +
'          "stddev": 0.01, ' +
'          "volume": 20000.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 34397.67, ' +
'          "max": 245001.0, ' +
'          "median": 8487.49, ' +
'          "min": 2000.0, ' +
'          "percentile": 3476.98, ' +
'          "price": 2000.0, ' +
'          "stddev": 70370.59, ' +
'          "volume": 157.0' +
'        }' +
'      }, ' +
'      "quantity": 4, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30588, ' +
'      "typeName": "Wrecked Power Cores", ' +
'      "volume": 10.0' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Propulsion Relics", ' +
'      "groupID": 971, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Wrecked Thruster Sections", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 24279.42, ' +
'          "max": 118105.14, ' +
'          "median": 22142.34, ' +
'          "min": 20705.2, ' +
'          "percentile": 20822.61, ' +
'          "price": 20822.61, ' +
'          "stddev": 31578.74, ' +
'          "volume": 23659.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 22070.34, ' +
'          "max": 22142.34, ' +
'          "median": 22142.33, ' +
'          "min": 20705.2, ' +
'          "percentile": 22142.34, ' +
'          "price": 22142.34, ' +
'          "stddev": 641.02, ' +
'          "volume": 22300.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 227656.67, ' +
'          "max": 699998.0, ' +
'          "median": 58775.96, ' +
'          "min": 29997.98, ' +
'          "percentile": 29997.98, ' +
'          "price": 29997.98, ' +
'          "stddev": 230838.59, ' +
'          "volume": 2119.0' +
'        }' +
'      }, ' +
'      "quantity": 3, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30562, ' +
'      "typeName": "Wrecked Thruster Sections", ' +
'      "volume": 10.0' +
'    }, ' +
'    {' +
'      "category": "", ' +
'      "group": "Sleeper Offensive Relics", ' +
'      "groupID": 991, ' +
'      "market": true, ' +
'      "meta_level": null, ' +
'      "name": "Wrecked Weapon Subroutines", ' +
'      "prices": {' +
'        "all": {' +
'          "avg": 20314.56, ' +
'          "max": 104301.29, ' +
'          "median": 27000.0, ' +
'          "min": 5000.09, ' +
'          "percentile": 5000.09, ' +
'          "price": 5000.09, ' +
'          "stddev": 24830.15, ' +
'          "volume": 32945.0' +
'        }, ' +
'        "buy": {' +
'          "avg": 20102.42, ' +
'          "max": 27000.02, ' +
'          "median": 27000.0, ' +
'          "min": 5000.09, ' +
'          "percentile": 27000.01, ' +
'          "price": 27000.02, ' +
'          "stddev": 8634.78, ' +
'          "volume": 32620.0' +
'        }, ' +
'        "sell": {' +
'          "avg": 784835.06, ' +
'          "max": 997749.98, ' +
'          "median": 997749.98, ' +
'          "min": 29997.99, ' +
'          "percentile": 29997.99, ' +
'          "price": 29997.99, ' +
'          "stddev": 156917.59, ' +
'          "volume": 1963.0' +
'        }' +
'      }, ' +
'      "quantity": 2, ' +
'      "size": "", ' +
'      "slot": null, ' +
'      "tech_level": null, ' +
'      "typeID": 30633, ' +
'      "typeName": "Wrecked Weapon Subroutines", ' +
'      "volume": 10.0' +
'    }' +
'  ], ' +
'  "kind": "assets", ' +
'  "market_id": 30000142, ' +
'  "market_name": "Jita", ' +
'  "totals": {' +
'    "buy": 1395247926.2799997, ' +
'    "sell": 1517839008.46, ' +
'    "volume": 538.13' +
'  }' +
'}');

var result = validateContracts('', '');
console.log(result);