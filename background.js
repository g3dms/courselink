async function sendRequest(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        console.log(`Fetch URL: ${url}`);
        console.log(`Fetch response: ${text}`);
        return text;
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}

async function scrapeCourse(courseCode) {
    const spaceURL = `https://ust.space/review/${courseCode}`;
    console.log(`USTSPACE URL: ${spaceURL}`);
    return await sendRequest(spaceURL);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(`Received message from ${request.code}`);
        
        scrapeCourse(request.code).then(response => {
            sendResponse(response);
        });
        
        return true;  
    }
);

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({url: "https://w5.ab.ust.hk/wcq/cgi-bin/2540/"});
});
