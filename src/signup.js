const signupButton = document.getElementById("submitButton");
const nameinput = document.getElementById("usernameinput");
const emailinput = document.getElementById("emailinput");
const passwordinput = document.getElementById("passwordinput");

signupButton.onclick = function(e) {
console.log($("#signupfor").serialize())

const url = `${window.API}/auth/signup?name=${nameinput.value}&email=${emailinput.value}&password=${passwordinput.value}`;
console.log(url);
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url, false ); // false for synchronous request
xmlHttp.send( null );
console.log(xmlHttp.responseText)
if(!JSON.parse(xmlHttp.responseText).error) {
window.createCookie("session", JSON.parse(xmlHttp.responseText).session,1);
window.location.replace("dashboard.html");
}else{
    //TODO handle Error
}

}