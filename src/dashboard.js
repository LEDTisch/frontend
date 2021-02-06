
if(window.readCookie("session")=='') {
    window.location.replace("index.html");
}else{

    const url = `${window.API}/auth/validateSession?session=${window.readCookie("session")}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
    
    if(JSON.parse(xmlHttp.responseText).result !="yes")
        window.location.replace("index.html");
    
    }

const subnavprimary = document.getElementById("subnavprimary");
const subnavsecoundary = document.getElementById("subnavsecoundary")
const appdata = document.getElementById("appdata");
const settings = document.getElementById("settings");
const devices = document.getElementById("devices")
const home = document.getElementById("home")
var state="None";



$(document).on('click', '.menubar > li', function (e) {
                $('a.activeLink').removeClass('activeLink');
                $(this).children('a').addClass('activeLink');
    e.preventDefault();
});


$(document).on('click', '.verticalMenu > li', function (e) {
    $(this).parent().children(' li ').children('.activeSubNav').removeClass('activeSubNav');
    $(this).children('a').addClass('activeSubNav');
e.preventDefault();
});


home.onclick= (e) => {


    state="home"
    subnavprimary.style.display = "none";
    subnavsecoundary.style.display = "none";

}

appdata.onclick =  (e) => {
state="AppDAten"
subnavprimary.style.display = "block";
subnavsecoundary.style.display = "block";

subnavprimary.innerHTML="";
subnavsecoundary.innerHTML="";

const url =window.API+"/app/listinstalled?session="+window.readCookie("session");
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url, false ); 
xmlHttp.send( null );

const data = JSON.parse(xmlHttp.responseText)

for(var i=0;i<data.list.length;i++){
console.log(data.list[i].name);


const li = document.createElement("li");
const a = document.createElement("a");
a.innerText = data.list[i].name;
li.insertAdjacentElement('beforeend',a);
subnavprimary.insertAdjacentElement('beforeend',li);

}
const div=document.createElement("div");
const ti=document.createElement("input");
const button=document.createElement("button");
div.id="scorenamediv"
ti.type="text"
ti.id="scorenameinput"
ti.placeholder="Name"
button.id="buttonaddscore"
button.innerText="Hinzufügen"
div.insertAdjacentElement('beforeend',ti);
div.insertAdjacentElement('beforeend',button);
subnavsecoundary.insertAdjacentElement('beforeend',div);

}


settings.onclick = (e) => {
    state="Settings"
    subnavprimary.style.display = "none";
    subnavsecoundary.style.display = "none";



}

devices.onclick  = (e) => {
    state="Devices"
    subnavprimary.style.display = "none";
    subnavsecoundary.style.display = "none";


}