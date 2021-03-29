document.addEventListener("submit", (e) => {
    const form = e.target;

    submitForm(form);
    
    document.getElementById("afterSubmit").style.visibility = "visible";
    document.getElementById("afterSubmit").classList = "visible";
    e.preventDefault();
})

function submitForm(form) {
    // In our case, XMLHttpRequest is better then fetch, because the response will take long time
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.status === 200) {
            showResponse(xhr, "success");
        } else {
            // Received response, there is an error on the backend
            showResponse(xhr, "error");
        }
    }
    xhr.onerror = function () {
        // Other type of error
        console.log(xhr.status);
        showResponse("error");
    }
    xhr.open (form.method, form.action, true);
    xhr.send (new FormData(form));
    return false;
}

function showResponse(xhr, which) {
    document.getElementById("responseMessage").style.visibility = "visible";
    document.getElementById("responseMessage").innerText = xhr.responseText;
    if (which === "success") {
        document.getElementById("responseMessage").classList = "visible success";
    }
    if (which === "error") {
        document.getElementById("responseMessage").classList = "visible error";
    }
}
