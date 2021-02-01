const signupButton = document.getElementById("submitButton");
const nameinput = document.getElementById("usernameinput");
const emailinput = document.getElementById("emailinput");
const passwordinput = document.getElementById("passwordinput");

signupButton.onclick = function(e) {
console.log($("#signupfor").serialize())

const url = `${window.API}/signup?name=${nameinput.value}&email=${emailinput.value}&password=${passwordinput.value}`;
console.log(url);
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url, false ); // false for synchronous request
xmlHttp.send( null );
console.log(xmlHttp.responseText)

}