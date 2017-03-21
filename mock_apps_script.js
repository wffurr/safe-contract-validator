var DOMParser = require('xmldom').DOMParser;

// Mock out Google Apps Script API

var UrlFetchApp = {
  results: {},
  addResult: function(url, result) {
    UrlFetchApp.results[url] = result;
  },
  fetch: function(url) {
    for (var prefix in UrlFetchApp.results) {
      if (url.startsWith(prefix)) {
        return {
          getContentText: function() {
            return UrlFetchApp.results[prefix];
          }
        };
      }
    }
    throw "Unrecognized URL in UrlFetchApp: " + url;
  }
};

var XmlElement = function(node) {
  return {
    getChild: function(tagname) {
      for (var i in node.childNodes) {
        if (node.childNodes[i].tagName == tagname) {
          return new XmlElement(node.childNodes[i]);
        }
      }
    },
    getChildren: function(tagname) {
      var result = [];
      for (var i in node.childNodes) {
        if (node.childNodes[i].tagName == tagname) {
          result.push(new XmlElement(node.childNodes[i]));
        }
      }
      return result;
    },
    getAttribute: function(attrname) {
      for (var i in node.attributes) {
        if (node.attributes[i].name == attrname) {
          return {
            getValue: function() {
              return node.attributes[i].value;
            }
          };
        }
      }
      throw "Attribute " + attrname + " not found.";
    },
    getText: function() {
      return node.textContent;
    }
  };
};

var XmlService = {
  parse: function(xml) {
    var doc = new DOMParser().parseFromString(xml, 'text/xml');
    
    return {
      getRootElement: function() {
        return new XmlElement(doc.firstChild);
      }
    };
  }
};
