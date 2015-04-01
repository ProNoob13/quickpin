(function() {

  var qp = {

    positions: [],

    init: function() {
      chrome.browserAction.onClicked.addListener(qp.onTrigger);
    },

    onTrigger: function(tab) {
      if(!tab.pinned) {
        qp.positions[tab.id] = tab.index;
      }
      
      chrome.tabs.update(tab.id, {pinned: !tab.pinned}, qp.afterUpdate);
    },

    afterUpdate: function(tab) {
      if(!tab.pinned && tab.id in qp.positions) {
        chrome.tabs.move(tab.id, {index: qp.positions[tab.id]}, qp.afterMove);
      }
    },

    afterMove: function(tab) {
      if(tab.id in qp.positions) {
        qp.positions = qp.positions.slice(tab.id, 1);
      }
    }

  };

  qp.init();

}());