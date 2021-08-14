
console.log('popup-index hi here!');


document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        // chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        //     createRootDiv(tabs[0].url, '');
        // });
        createRootDiv('https://sallysbakingaddiction.com/cherry-pie/');
    }
    
}

function createRootDiv(url, apikey){

    console.log('in create root div');

    var div = document.createElement("div");
    div.setAttribute("id", "root");
    div.setAttribute("data-param", url);
    document.getElementsByTagName('body')[0].prepend(div);

}