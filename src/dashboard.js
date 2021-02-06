
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

var primarySelectionIndex = -1;
var secoundarySelectionIndex = -1;
var appdataInstalledApps;
var appdataCurrentScores;

const subnavprimary = document.getElementById("subnavprimary");
const subnavsecoundary = document.getElementById("subnavsecoundary")
const appdata = document.getElementById("appdata");
const settings = document.getElementById("settings");
const devices = document.getElementById("devices")
const home = document.getElementById("home")
const configblock = document.getElementById("config");
var state="None";


var lastLoadingAnimation;
var lastLoadingAnimationSecoundary;

$(document).on('click', '.menubar > li', function (e) {
                $('a.activeLink').removeClass('activeLink');
                $(this).children('a').addClass('activeLink');
    e.preventDefault();
});


$(document).on('click', '.verticalMenu > li', function (e) {
    $(this).parent().children(' li ').children('.activeSubNav').removeClass('activeSubNav');
    $(this).children('a').addClass('activeSubNav');


    if( $(this).parent().attr('id') == "subnavprimary") {
        primarySelectionIndex = $(this).parent().children(' li ').children('.activeSubNav').parent().index();


    if(state=="AppDaten"){
        $(".currentLoadingPrimary").hide();
        $(".currentLoadingPrimary").removeClass("currentLoadingPrimary")

        $(this).children('a').children("img").addClass("currentLoadingPrimary");
        $(this).children('a').children("img")[0].style.display ="block"
        lastLoadingAnimation = $(this).children('a').children("img")[0];
        generateSubNavSecoundaryAppData();
   
        
    }
    subnavsecoundary.style.display = "block";

}else{

    secoundarySelectionIndex = $(this).parent().children(' li ').children('.activeSubNav').parent().index();

  if(state=="AppDaten"){
        $(".currentLoading").hide();
        $(".currentLoading").removeClass("currentLoading")

        $(this).children('a').children("img").addClass("currentLoading");
        $(this).children('a').children("img")[0].style.display ="block"
        lastLoadingAnimationSecoundary = $(this).children('a').children("img")[0]

        loadAppConfig();


        
    }

}

e.preventDefault();
});


home.onclick= (e) => {


    state="home"
    subnavprimary.style.display = "none";
    subnavsecoundary.style.display = "none";

}

appdata.onclick =  (e) => {
state="AppDaten"
subnavprimary.style.display = "block";
subnavsecoundary.style.display = "none";

subnavprimary.innerHTML="";
subnavsecoundary.innerHTML="";

const url =window.API+"/app/listinstalled?session="+window.readCookie("session");
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url, true ); 
xmlHttp.send( null );
xmlHttp.onload = function() {
    const data = JSON.parse(xmlHttp.responseText)
    appdataInstalledApps = data;
    
    for(var i=0;i<data.list.length;i++){
    console.log(data.list[i].name);
    
    
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.src = "loading.svg";
    img.width = 20;
    img.height = 20;
    img.style.marginBottom = "-4px";
    img.style.float = "right";
    img.class = "loadingAni"
    img.style.display = "none";
    a.innerText = data.list[i].name;
    li.insertAdjacentElement('beforeend',a);
    a.insertAdjacentElement('beforeend',img);
    subnavprimary.insertAdjacentElement('beforeend',li);
    
    
    }
    
    
}






}



settings.onclick = (e) => {
    state="Settings".
    subnavprimary.style.display = "none";
    subnavsecoundary.style.display = "none";



}

 function generateSubNavSecoundaryAppData() {
    const url=window.API+"/app/getAppScores?session="+window.readCookie("session")+"&appuuid="+appdataInstalledApps.list[primarySelectionIndex].UUID;
    var xmlHttp_getScores=new XMLHttpRequest();
    xmlHttp_getScores.open( "GET", url, true);
    xmlHttp_getScores.send(null);
    subnavsecoundary.innerHTML="";
    subnavsecoundary.style.display = "none";


xmlHttp_getScores.onload = function() {
    subnavsecoundary.innerHTML="";
    generateCreateNew();
    const d=JSON.parse(xmlHttp_getScores.responseText);
   
    for(var i=0;i<d.write.length;i++){//write auflisten permission
        generateSecoundary(d.write[i].name)
        
    }

    for(var i=0;i<d.read.length;i++){//write auflisten permission
        generateSecoundary(d.read[i].name)
        
    }
    subnavsecoundary.style.display = "block";
    lastLoadingAnimation.style.display = "none";


    appdataCurrentScores = d.write.concat(d.read);

}

}

function generateSecoundary(content) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = content;

    const img = document.createElement("img");
    img.src = "loading.svg";
    img.width = 20;
    img.height = 20;
    img.style.marginBottom = "-4px";
    img.style.float = "right";
    img.class = "loadingAni"
    img.style.display = "none";
    a.insertAdjacentElement('beforeend',img);
    li.insertAdjacentElement('beforeend',a);
    subnavsecoundary.insertAdjacentElement('beforeend',li);
}

function generateCreateNew() {
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
button.onclick = (e) => {

    if(!(ti.value.length>3))  return;

var add_url =window.API+"/app/addScore?session="+window.readCookie("session")+"&name="+ti.value+"&appuuid="+appdataInstalledApps.list[primarySelectionIndex].UUID;
console.log(add_url);

var xmlHttp_add = new XMLHttpRequest();
xmlHttp_add.open( "GET", add_url, false ); 
xmlHttp_add.send( null );

 const add_data = JSON.parse(xmlHttp_add.responseText)
 if(add_data.success = true)
ti.value = "";

generateSubNavSecoundaryAppData();
}
}

devices.onclick  = (e) => {
    state="Devices"
    subnavprimary.style.display = "none";
    subnavsecoundary.style.display = "none";


}

function loadAppConfig() {
    var load_url =window.API+"/app/getScoreConfig?session="+window.readCookie("session")+"&scoreuuid="+appdataCurrentScores[secoundarySelectionIndex-1].uuid;
    
    var xmlHttp_load = new XMLHttpRequest();
    xmlHttp_load.open( "GET", load_url, true );
    xmlHttp_load.onload = function()  {

        console.log(appdataInstalledApps.list[primarySelectionIndex]);
        lastLoadingAnimationSecoundary.style.display = "none"
        var data=appdataInstalledApps.list[primarySelectionIndex].config.settings;
        configblock.innerHTML="";
        for(var i=0;i<data.length;i++){
            console.log(data[i].type);
            if(data[i].type=="integer"){
                createParam_Integgier(data[i].default,data[i].displayname);
            }
            if(data[i].type=="color"){
                createParam_color(data[i].default,data[i].displayname);
            }


        }


    }
    
    xmlHttp_load.send( null );
    

}
function createParam_Integer(defaultparam,displayname){
    const div=document.createElement("div");
    const diname=document.createElement("p");
    const input=document.createElement("input");

    div.class="param"

    diname.innerText=displayname;
    diname.class="displaynametext";

    input.type="number"
    input.class="integerinput"
    input.placeholder=defaultparam


    div.insertAdjacentElement('beforeend',diname);
    div.insertAdjacentElement('beforeend',input);

    configblock.insertAdjacentElement('beforeend',div)

}
function createParam_color(currentParam,displayname){
    const div=document.createElement("div");
    const diname=document.createElement("p");
    const input=document.createElement("input");

    div.class="param"

    diname.innerText=displayname;
    diname.class="displaynametext";

    input.type="color"
    input.class="colorinput"
  


    div.insertAdjacentElement('beforeend',diname);
    div.insertAdjacentElement('beforeend',input);

    configblock.insertAdjacentElement('beforeend',div)

}
