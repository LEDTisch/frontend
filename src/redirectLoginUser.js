
if(window.readCookie("session")!='') {

const url = `${window.API}/auth/validateSession?session=${window.readCookie("session")}`;
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url, false ); // false for synchronous request
xmlHttp.send( null );
console.log(xmlHttp.responseText);

if(JSON.parse(xmlHttp.responseText).success ==true)
    window.location.replace("dashboard.html");

}