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

async function fetchCID() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", serverURL + "/get-cid", true);
    xmlHttp.onload = function (e) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                setImageSource(JSON.parse(xmlHttp.responseText).CID);
            } else {
                console.error("Error while trying to fetch the CID", xmlHttp.statusText)
            }
        }
    }
    xmlHttp.onerror = function (e) {
        console.error(xmlHttp.statusText);
    }
    xmlHttp.send( null );
}

function setImageSource(fetchedCID) {
    document.getElementById("theImage").setAttribute("src", "https://ipfs.io/ipfs/" + fetchedCID);
}

function handleUpload() {
    document.getElementById("afterSubmit").style.display = "block";
}

// When the page loads, fetch the CID
fetchCID();