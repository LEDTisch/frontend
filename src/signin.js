const name_email_input = document.getElementById("email_name_input");
const passwordinput = document.getElementById("passwordinput");
const signupButton = document.getElementById("submitButton");
signupButton.onclick = function(e) {
    
    const url = `${window.API}/auth/signin?eorn=${email_name_input.value}&password=${passwordinput.value}`;
    console.log(url);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);

    if(!JSON.parse(xmlHttp.responseText).error) {
        window.createCookie("session", JSON.parse(xmlHttp.responseText).session,1);
        window.location.replace("dashboard.html");
        }else{
            errorlable.innerHTML = JSON.parse(xmlHttp.responseText).error;
        }
    
    }
