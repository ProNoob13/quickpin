/**
 * Top level Quickpin namespace
 */
var qp = Object.create(null);

/**
 * Used to store tab positions
 */
qp.positions = [];

/**
 * Adds onActivated handler to browserAction.onClicked event
 *
 * @return {Object} self
 */
qp.init = function (){
  chrome.browserAction.onClicked.addListener(qp.onActivated);

  return this;
};

/**
 * Gets called when browserAction.onClicked is triggered
 *
 * @call qp.toggle
 * @param {Object} tab
 */
qp.onActivated = function (tab){
  qp.toggle(tab);
};

/**
 * Toggles tab pin status
 *
 * @param {Object} tab
 */
qp.toggle = function (tab){
  if(!tab.pinned)
    qp.positions[tab.id] = tab.index;

  chrome.tabs.update(tab.id, {pinned: !tab.pinned}, qp.onUpdated);
};

/**
 * Gets called after pin toggle
 *
 * @param {Object} tab
 */
qp.onUpdated = function (tab){
  if(!tab.pinned && qp.positions[tab.id])
    chrome.tabs.move(tab.id, {index: qp.positions[tab.id]}, qp.onMoved);
};

/**
 * Gets called when tab is moved back
 *
 * @call qp.clearPosition
 * @param {Object} tab
 */
qp.onMoved = function (tab){
  qp.clearPosition(tab.id);
};

/**
 * Slices the position of the moved tab from qp.positions array
 *
 * @param {Number} tab_id
 */
qp.clearPosition = function (tab_id){
  if(qp.positions[tab_id])
    qp.positions = qp.positions.slice(tab_id, 1);
};


// Run
qp.init();