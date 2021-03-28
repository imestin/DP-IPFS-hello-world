const serverURL = "http://localhost:3000";


function switchToUpload() {
    document.getElementById("display").style.display = "none"; 
    document.getElementById("upload").style.display = "block"; 
}

function switchToDisplay() {
    fetchCID();                                                           // Fetch the CID of the newly uploaded image
    document.getElementById("upload").style.display = "none"; 
    document.getElementById("display").style.display = "block"; 
}

function handleUpload() {
    document.getElementById("afterSubmit").style.display = "block";
}


async function fetchCID() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", serverURL + "/get-cid", true);
    displayMessage("Fetching the CID from Dash Platform...");
    emptyImgTag();
    xmlHttp.onload = function (e) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                displayCID(JSON.parse(xmlHttp.responseText).CID);
                displayMessage("Fetching the image from IPFS...");
                loadImage(JSON.parse(xmlHttp.responseText).CID);
            } else {
                displayMessage("Error while trying to fetch the CID" + xmlHttp.statusText);
            }
        }
    }
    xmlHttp.onerror = function (e) {
        console.error(xmlHttp.statusText);
    }
    xmlHttp.send( null );
}


function emptyImgTag() {
    document.getElementById("theImage").setAttribute("src", "");
}

function displayCID(cid) {
    document.getElementById("cidLabel").innerText = "CID:   " + cid;
}

function displayMessage(message) {
    document.getElementById("infoBox").style.display = "block";
    document.getElementById("infoBox").innerText = message;
}

function loadImage(fetchedCID) {
    var image = document.getElementById("theImage");
    image.setAttribute("src", "https://ipfs.io/ipfs/" + fetchedCID);
    image.onload = function() {
        document.getElementById("infoBox").style.display = "none";
    }
}