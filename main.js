function getCoursePage(course) {
    showLoadingIndicator(course.code);
    
    chrome.runtime.sendMessage(course, function(response) {
        console.log("Message response for " + course.code + ": " + (response ? "received" : "null"));
        
        var subjectDiv = findSubjectDivByCourseCode(course.code);
        if (subjectDiv) {
            var loadingSpan = subjectDiv.querySelector('.rating-loading');
            if (loadingSpan) loadingSpan.remove();
        }
        
        if (response) {
            var ratingMatch = response.match(/(\d\.\d)\s*\/\s*5/);
            if (ratingMatch) {
                var rating = ratingMatch[1];
                addRatingToCourse(course.code, rating);
            }
        }
    });
}

function findSubjectDivByCourseCode(courseCode) {
    var courseContainers = document.getElementsByClassName("courseattrContainer");
    
    for (var i = 0; i < courseContainers.length; i++) {
        var subjectDiv = courseContainers[i].getElementsByClassName("subject")[0];
        if (!subjectDiv) continue;
        
        var currentCode = subjectDiv.innerText.split(' ')[0] + subjectDiv.innerText.split(' ')[1];
        if (currentCode === courseCode) {
            return subjectDiv;
        }
    }
    return null;
}

function showLoadingIndicator(courseCode) {
    var subjectDiv = findSubjectDivByCourseCode(courseCode);
    if (subjectDiv) {
        subjectDiv.insertAdjacentHTML('beforeend', ' <span class="rating-loading">loading...</span>');
    }
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    var courseContainers = document.getElementsByClassName("courseattrContainer");
    console.log("Found " + courseContainers.length + " courses");

    for (var i = 0; i < courseContainers.length; i++) {
        var subjectDiv = courseContainers[i].getElementsByClassName("subject")[0];
        if (!subjectDiv) continue;
        
        var courseText = subjectDiv.innerText;
        var courseCode = courseText.split(' ')[0] + " " + courseText.split(' ')[1];
        console.log("Found course: " + courseCode);
        
        var url = "https://ust.space/review/" + courseCode.replace(/\s/g, '');
        
        if (!subjectDiv.querySelector('.rating')) {
            var linkContainer = document.createElement("span");
            linkContainer.innerHTML = " <a class='rating lower-bar' target='_blank' href=" + url + ">(Link to USTSPACE ↗)</a>";
            subjectDiv.appendChild(linkContainer);
        }

        var courseJSON = { code: courseCode.replace(/\s/g, '') };
        console.log("Getting " + courseJSON.code + " rating");
        getCoursePage(courseJSON);
    }
}
=======
    return chrome.runtime.sendMessage(course, function(response) {
        console.log("Message response: " + response);
    });
}

if (document.readyState === "complete") {
    var courses = document.getElementsByTagName("h2");

    for (var i = 0; i < courses.length; i++) {
        var courseCode = courses[i].innerText.slice(0,10).replace(/\s/g, '');
        var url = "https://ust.space/review/" + courseCode;
        console.log(courseCode + "\'s URL: " + url);
        courses[i].innerHTML +=  " <a class='rating lower-bar' target='_blank' href=" + url + ">Rating</a>";

        var courseJSON = { code: courseCode };
        console.log("Getting " + courseJSON.code + " rating");
        // getCoursePage(courseJSON);
    }
}
>>>>>>> 690dcc389276159e831310d03ecaff3799bd9c46
