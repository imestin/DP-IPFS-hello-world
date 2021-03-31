document.addEventListener("submit", (e) => {
    const form = e.target;
    
    clearMessages();
    submitForm(form);
    showAfterSubmit();
    

    toggleUploadButton(form, false);            // Disable the Upload button
    e.preventDefault();
})


function submitForm(form) {
    // In our case, XMLHttpRequest is better then fetch, because the response will take long time
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            showResponse(xhr, "success");
        } else {
            // Received response, there is an error on the backend
            showResponse(xhr, "error");
        }
        toggleUploadButton(form, true);         // Activate the Upload button
    }
    xhr.onerror = function () {
        // No response from backend
        console.log(xhr.status);
        showResponse(xhr, "error_no_response");
        toggleUploadButton(form, true);         // Activate the Upload button
    }
    xhr.open (form.method, form.action, true);
    xhr.send (new FormData(form));
    return false;
}

function showResponse(xhr, which) {
    document.getElementById("responseMessage").style.visibility = "visible";
    if (which === "success") {
        document.getElementById("responseMessage").innerText = xhr.responseText;
        document.getElementById("responseMessage").classList = "visible success";
    }
    if (which === "error") {
        document.getElementById("responseMessage").innerText = xhr.responseText;
        document.getElementById("responseMessage").classList = "visible error";
    }
    if (which === "error_no_response") {
        document.getElementById("responseMessage").innerText = "Server not reachable";
        document.getElementById("responseMessage").classList = "visible error";
    }
}

function toggleUploadButton(form, state) {
    if (state === true) {
        form[1].disabled = false;
    } else {
        form[1].disabled = true;
    }
}

function showAfterSubmit() {
    document.getElementById("afterSubmit").style.visibility = "visible";
    document.getElementById("afterSubmit").classList = "visible";
}

function clearMessages() {
    // This is necessary, because otherwise the animation wouldn't play
    var afterSubmit = document.getElementById("afterSubmit");
    var newAfterSubmit = afterSubmit.cloneNode(true);
    afterSubmit.parentNode.replaceChild(newAfterSubmit, afterSubmit);

    document.getElementById("responseMessage").style.visibility = "hidden";
    document.getElementById("afterSubmit").style.visibility = "hidden";
    document.getElementById("responseMessage").classList = "";
    document.getElementById("afterSubmit").classList = "";
}