/*var refs = document.getElementsByTagName('a');
var imgs = document.getElementsByTagName('img'); 
var i = 0;
setInterval(changeYoutube, 3000);
function changeYoutube() {
	for(i = 0; i < refs.length; i++) {
		refs[i].innerHTML = "";
	}
	for(i = 0; i < imgs.length; i++) {
		imgs[i].src = "https://i.pinimg.com/736x/f5/05/24/f50524ee5f161f437400aaf215c9e12f--plain-white-background-cristina.jpg";
	}
}*/

let flag = 0;
let element = document.getElementById("contents");
let parent = element.parentNode;
chrome.storage.local.get("value", function(val) {
	flag = val.value;
	if (flag == 0) 
		parent.removeChild(element);
});


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResopnse) {
	if(message.value) {
	  	if(message.toggle) {
		    if(message.value) 
				parent.removeChild(element);		
	  	}
	  	else { //reset the homepage of the youtube website
	  		chrome.runtime.sendMessage({value: "refresh"});
	  	}
	}
}




