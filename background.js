
let flag = 0, toggle = true;
let youtube_tab;
chrome.storage.local.set({'value': flag}, function(){console.log("saved");});
//when the chrome button is clicked, sends message to content.js
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
	youtube_tab = tab.id;
	flag++;
	toggle = !(toggle);
	chrome.storage.local.set({'value': flag}, function() {
		console.log('saved!' + flag);
	});
    let msg = {
      value : true,
      toggle : toggle
    }
    chrome.tabs.sendMessage(tab.id, msg);
}
//refreshes the page
chrome.runtime.onMessage.addListener(function(message, sendResponse) {
	if(message.value === 'refresh') {			
		let params = {
			active : true,
			currentWindow : true
		};
		//get all the tabs
		chrome.tabs.query(params, function(tabs) {
			chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
		});	
	}
});

chrome.tabs.onRemoved.addListener(function(tabID, attachInfo) {
	if(tabID == youtube_tab)
		chrome.storage.local.set({'value': 0}, function(){});
});