const name_email_input = document.getElementById("email_name_input");
const passwordinput = document.getElementById("passwordinput");
const signupButton = document.getElementById("submitButton");

signupButton.onclick = function(e) {
    console.log($("#signinfor").serialize())
    
    const url = `${window.API}/signin?name_email=${email_name_input.value}&password=${passwordinput.value}`;
    console.log(url);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
    
    }
