(function() {

  var qp = {

    positions: [],

    init: function() {
      return chrome.browserAction.onClicked.addListener(qp.toggle);
    },

    toggle: function(tab) {
      if(!tab.pinned) {
        qp.positions[tab.id] = tab.index;
      }
      
      chrome.tabs.update(tab.id, {pinned: !tab.pinned}, qp.updated);
    },

    updated: function(tab) {
      if(!tab.pinned && tab.id in qp.positions) {
        chrome.tabs.move(tab.id, {index: qp.positions[tab.id]}, qp.moved);
      }
    },

    moved: function(tab) {
      if(tab.id in qp.positions) {
        qp.positions = qp.positions.slice(tab.id, 1);
      }
    }

  };

  qp.init();

}());