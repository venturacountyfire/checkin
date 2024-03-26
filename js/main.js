function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });

}

function startHide(element) {
    element.className = "buttonHide";

}

function startShow(element) {
    element.className = "buttonShow";

}

var postURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeoIdKlgCfugldQBEK0MF4mKyiYofhS0tJ9KL5erm0TvqWFOA/formResponse";

async function showError(button, elements, prevClass = false) {
    elements.forEach(element => {
        element.style.animation = "lookatme .2s ease 2";

    });

    await delay(500);

    elements.forEach(element => {
        // JavaScript hack. Basically tells CSS to be prepared to play the previous animation again.
        // If animation is set to "", some elements that have other animations will replay those animations once the flash is finished, which is ugly.
        element.style.animation = "1";
        element.style.class = prevClass || element.style.class;

    });

}

async function startCheckIn() {
    var button = document.getElementById("check-in");

    var email = document.getElementById("email");
    var label = document.getElementById("emailLabel");
    if(email.value == "" || !email.value.includes("@ventura.org")) {
        showError(button, [email, label]);
        return;

    }

    var fsYes = document.getElementById("fullshiftyes");
    var fsNo = document.getElementById("fullshiftno");
    var fsLabel = document.getElementById("fullshiftLabel");
    if(!fsYes.checked && !fsNo.checked) {
        showError(button, [fsLabel]);
        return;

    }

    var reason = document.getElementById("reason");
    var reasonLabel = document.getElementById("reasonLabel");
    if(fsNo.checked && reason.value == "") {
        showError(button, [reason, reasonLabel]);
        return;

    }

    var sbYes = document.getElementById("standbyyes");
    var sbNo = document.getElementById("standbyno");
    var sbLabel = document.getElementById("standbyLabel");
    if(!sbYes.checked && !sbNo.checked) {
        showError(button, [sbLabel], "");
        return;

    }

    email = document.getElementById("email").value || "no val";
    var fullShift = document.getElementById("fullshiftyes").checked;
    reason = document.getElementById("reason").value || "no val";
    var standby = document.getElementById("standbyyes").checked;

    startHide(button);

    document.getElementById("fullshiftyes").value = (fullShift ? "Yes" : "No");
    document.getElementById("fullshiftno").value = (fullShift ? "Yes" : "No");
    document.getElementById("standbyyes").value = (standby ? "I am on standby tonight" : "I am not on standby tonight");
    document.getElementById("standbyno").value = (standby ? "I am on standby tonight" : "I am not on standby tonight");
    document.getElementById("gform").submit();

    document.getElementById("invisible").onload = async function() {
        await delay(1000);
        window.location.href="confirmation.html";

    };

}

async function pushReason() {
    var div = document.getElementById("reasonDiv");
    var reason = document.getElementById("reason");

    div.className = "checkinShow";
    reason.className = "checkinShow";

}

async function popReason() {
    var div = document.getElementById("reasonDiv");

    if(div.className == "checkinHidden")
        return;

    div.className = "checkinHide";

}

function backToHome() {
    window.location.href="index.html";

}