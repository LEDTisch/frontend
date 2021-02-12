
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

displayHomeSection();

$(document).on('click', '.menubar > li', function (e) {
                $('a.activeLink').removeClass('activeLink');
                $(this).children('a').addClass('activeLink');
});


$(document).on('click', '.verticalMenu > li', function (e) {
    $(this).parent().children(' li ').children('.activeSubNav').removeClass('activeSubNav');
    $(this).children('a').addClass('activeSubNav');


    if( $(this).parent().attr('id') == "subnavprimary") {
        primarySelectionIndex = $(this).parent().children(' li ').children('.activeSubNav').parent().index();

        configblock.innerHTML = "";

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
    configblock.innerHTML ="";


    state="Home"
    subnavprimary.style.display = "none";
    subnavsecoundary.style.display = "none";
    console.log("welcome home")
    displayHomeSection();

}

appdata.onclick =  (e) => {
state="AppDaten"
configblock.innerHTML ="";

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
    
    if(!data.list) return;
    for(var i=0;i<data.list.length;i++){
    
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.src = "assets/loading.svg";
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
    configblock.innerHTML ="";
    state="Settings";
    subnavprimary.style.display = "none";
    subnavsecoundary.style.display = "none";


}

 function generateSubNavSecoundaryAppData() {
    const url=window.API+"/app/getAppScores?session="+window.readCookie("session")+"&appuuid="+appdataInstalledApps.list[primarySelectionIndex].UUID;
    var xmlHttp_getScores=new XMLHttpRequest();
    xmlHttp_getScores.open( "GET", url, true);
    xmlHttp_getScores.send(null);
    subnavsecoundary.innerHTML="";
    //subnavsecoundary.style.display = "none";


    configblock.innerHTML ="";

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
    //subnavsecoundary.style.display = "block";
    lastLoadingAnimation.style.display = "none";


    appdataCurrentScores = d.write.concat(d.read);

}

}

function generateSecoundary(content) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = content;

    const img = document.createElement("img");
    img.src = "assets/loading.svg";
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
    configblock.innerHTML ="";

    state="Devices"
    subnavprimary.style.display = "none";
    subnavsecoundary.style.display = "none";


}


var currentUserAppData;
var currentParamContainer;
function loadAppConfig() {

    configblock.innerHTML="";
    var load_url =window.API+"/app/getScoreConfig?session="+window.readCookie("session")+"&scoreuuid="+appdataCurrentScores[secoundarySelectionIndex-1].uuid;
    
    var xmlHttp_load = new XMLHttpRequest();
    xmlHttp_load.open( "GET", load_url, true );
    xmlHttp_load.onload = function()  {
        console.log(xmlHttp_load.responseText);

        currentUserAppData=JSON.parse(xmlHttp_load.responseText);

        configblock.innerHTML="";



        lastLoadingAnimationSecoundary.style.display = "none"
        var data=appdataInstalledApps.list[primarySelectionIndex].config.settings;
        if(data) {
        for(var i=0;i<data.length;i++){
            var currentConfig
            if(currentUserAppData.config[data[i].targetName]!=undefined){
                 currentConfig = currentUserAppData.config[data[i].targetName];
            }else{
                currentConfig = data[i].default;
            }


          
             currentParamContainer = document.createElement("div");
             currentParamContainer.classList.add("paramContainer")  
            

            createParamName(data[i].displayname);


            if(data[i].type=="integer"){
                createParam_Integer(currentConfig,data[i].targetName);
            }
            if(data[i].type=="color"){
                createParam_color(currentConfig,data[i].targetName);
            }
            if(data[i].type=="text"){
                createParam_Text(currentConfig,data[i].targetName);
            }
            if(data[i].type=="switch"){
                createParam_switch(currentConfig,data[i].targetName);
            }

            createParamDescription(data[i].description);

            configblock.insertAdjacentElement('beforeend',currentParamContainer);

        }
    }
   generateButtonsForScore();


}
    
    xmlHttp_load.send( null );
    

}

function createParamName(text) {

    const ptag = document.createElement("p");
    ptag.innerText = text;
    ptag.classList.add("paramname");
    
    currentParamContainer.insertAdjacentElement('beforeend',ptag)

}

function createParamDescription(text) {

    const ptag = document.createElement("p");


    ptag.innerText = text;
    ptag.classList.add("paramdescription");
    
    currentParamContainer.insertAdjacentElement('beforeend',ptag)

}


function createParam_Text(defaultparam,targetname){
    const div=document.createElement("div");
    const input=document.createElement("input");

    div.class="param"



    input.type="text"
    input.class="integerinput"
    input.value=defaultparam
    input.onchange = function () {
        currentUserAppData.config[targetname] =input.value;
    }


    div.insertAdjacentElement('beforeend',input);

    currentParamContainer.insertAdjacentElement('beforeend',div)
}
function createParam_Integer(defaultparam,targetname){
    const div=document.createElement("div");
    const input=document.createElement("input");

    div.class="param"
    input.type="number"
    input.class="integerinput"
    input.value=defaultparam
    input.onchange = function () {
        currentUserAppData.config[targetname] =input.value;
    }



    div.insertAdjacentElement('beforeend',input);

    currentParamContainer.insertAdjacentElement('beforeend',div)
}
function createParam_color(currentParam,targetname){
    const div=document.createElement("div");
    const input=document.createElement("input");

    div.class="param"



    input.type="color"
    input.class="colorinput"
    input.value = currentParam;
  
    input.onchange = function () {
        currentUserAppData.config[targetname] =input.value;
    }


    div.insertAdjacentElement('beforeend',input);

    currentParamContainer.insertAdjacentElement('beforeend',div)

}
function createParam_switch(currentParam,targetname){
    const div=document.createElement("div");

    const toggle=document.createElement("div");

    div.class="checkbox-container"

    toggle.innerHTML='<label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>'
  
    toggle.childNodes[0].childNodes[0].checked = currentParam;

    toggle.childNodes[0].childNodes[0].onchange = function() {
        currentUserAppData.config[targetname] =toggle.childNodes[0].childNodes[0].checked;
    }


    div.insertAdjacentElement('beforeend',toggle);

    currentParamContainer.insertAdjacentElement('beforeend',div)
}


function generateButtonsForScore() {
    const apply =  document.createElement("button");
    apply.innerText = "Anwenden";
    apply.class = "applyScore";
    apply.onclick = function() {

        console.log(JSON.stringify(currentUserAppData.config))

      var save_url =window.API+"/app/saveAppScore?session="+window.readCookie("session")+"&params="+encodeURIComponent(JSON.stringify(currentUserAppData.config))+"&scoreuuid="+appdataCurrentScores[secoundarySelectionIndex-1].uuid;

      var xmlHttp_save = new XMLHttpRequest();
      xmlHttp_save.open( "GET", save_url, true );
      xmlHttp_save.onload = function()  {  
    
        console.log(xmlHttp_save.responseText)
    }
    xmlHttp_save.send( null );

  }

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Löschen";
  deleteButton.class = "deleteScore";

  deleteButton.onclick = function() {

    //TODO cray out if you dont have write perms!
    var delete_url =window.API+"/app/deleteAppScore?session="+window.readCookie("session")+"&scoreuuid="+appdataCurrentScores[secoundarySelectionIndex-1].uuid;

    var xmlHttp_delete = new XMLHttpRequest();
    xmlHttp_delete.open( "GET", delete_url, true );
    xmlHttp_delete.onload = function()  {  
        generateSubNavSecoundaryAppData();
      console.log(xmlHttp_delete.responseText)
  }
  xmlHttp_delete.send( null );



    }



  configblock.insertAdjacentElement('beforeend',apply);
  configblock.insertAdjacentElement('beforeend',deleteButton);


}

function displayHomeSection() {


    const hello = document.createElement("h1")
    hello.id = "helloUser"

    var getAccountInfos =window.API+"/account/info?session="+window.readCookie("session");

    var xmlHttp_accinfo = new XMLHttpRequest();
    xmlHttp_accinfo.open( "GET", getAccountInfos, true );
    xmlHttp_accinfo.onload = function()  {  
      const accInfo =  JSON.parse(xmlHttp_accinfo.responseText);
      hello.innerText = timegreeting()+" "+accInfo.name+"!";
      console.log(accInfo)
  }
  xmlHttp_accinfo.send( null );

  configblock.insertAdjacentElement('beforeend',hello)
  console.log("inserted")
}


function timegreeting() {
const time = new Date();
const hour = time.getHours();

    if(hour>=11&&hour<17) {

        return "Guten Tag";

    }else if((hour>=17)||(hour<4)){
        return "Guten Abend";


    }else{
        return "Guten Morgen";
    }


}