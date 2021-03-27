
import {createParamName,createParamDescription,createParam_Text,createParam_Integer,createParam_color,createParam_switch,createDropDownList} from "./params.js";

window.checkSession();



var primarySelectionIndex = -1;
var secoundarySelectionIndex = -1;
var appdataInstalledApps;
var appdataCurrentScores;

var deviceAvailable;
var selectedDeviceGroup;

const subnavprimary = document.getElementById("subnavprimary");
const subnavsecoundary = document.getElementById("subnavsecoundary")
const appdata = document.getElementById("appdata");
const settings = document.getElementById("settings");
const devices = document.getElementById("devices")
const home = document.getElementById("home")
const configblock = document.getElementById("config");
const dialog = document.getElementById("dialog");
const clickblock = document.getElementById("clickblock");

dialog.style.display = "none";
var state = "None";


var lastLoadingAnimation;
var lastLoadingAnimationSecoundary;

displayHomeSection();

setTimeout( checkSession,30000);

$(document).on('click', '.menubar > li', function (e) {
    $('a.activeLink').removeClass('activeLink');
    $(this).children('a').addClass('activeLink');
    checkSession();
});


$(document).on('click', '.verticalMenu > li', function (e) {
    $(this).parent().children(' li ').children('.activeSubNav').removeClass('activeSubNav');
    $(this).children('a').addClass('activeSubNav');


    if ($(this).parent().attr('id') == "subnavprimary") {
        primarySelectionIndex = $(this).parent().children(' li ').children('.activeSubNav').parent().index();

        configblock.innerHTML = "";

        $(".currentLoadingPrimary").hide();
        $(".currentLoadingPrimary").removeClass("currentLoadingPrimary")

        $(this).children('a').children("img").addClass("currentLoadingPrimary");
        $(this).children('a').children("img")[0].style.display = "block"
        lastLoadingAnimation = $(this).children('a').children("img")[0];

        if (state == "AppDaten") {

            generateSubNavSecoundaryAppData();
            subnavsecoundary.style.display = "block";
        } else if (state == "Settings") {

            generateSettingPage(primarySelectionIndex);

        } else if (state == "Devices") {

            subnavsecoundary.style.display = "block";
            generateSubNavSecoundaryDevice();

        }

    } else {

        secoundarySelectionIndex = $(this).parent().children(' li ').children('.activeSubNav').parent().index();

        if (state == "AppDaten") {
            $(".currentLoading").hide();
            $(".currentLoading").removeClass("currentLoading")

            $(this).children('a').children("img").addClass("currentLoading");
            $(this).children('a').children("img")[0].style.display = "block"
            lastLoadingAnimationSecoundary = $(this).children('a').children("img")[0]

            loadAppConfig();
        } else if (state == "Devices") {
            $(".currentLoading").hide();
            $(".currentLoading").removeClass("currentLoading")

            $(this).children('a').children("img").addClass("currentLoading");
            $(this).children('a').children("img")[0].style.display = "block"
            lastLoadingAnimationSecoundary = $(this).children('a').children("img")[0]

            loadDeviceConfig();

        }


    }

    e.preventDefault();
});


home.onclick = (e) => {
    configblock.innerHTML = "";


    state = "Home"
    subnavprimary.style.display = "none";
    subnavsecoundary.style.display = "none";
    console.log("welcome home")
    displayHomeSection();

}




appdata.onclick = (e) => {

    state = "AppDaten"
    configblock.innerHTML = "";

    subnavprimary.style.display = "block";
    subnavsecoundary.style.display = "none";

    subnavprimary.innerHTML = "";
    subnavsecoundary.innerHTML = "";

    const url = window.API + "/app/listinstalled?session=" + window.readCookie("session");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
    xmlHttp.onload = function () {

        const data = JSON.parse(xmlHttp.responseText)
        appdataInstalledApps = data;

        if (!data.list) return;
        for (var i = 0; i < data.list.length; i++) {

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
            li.insertAdjacentElement('beforeend', a);
            a.insertAdjacentElement('beforeend', img);
            subnavprimary.insertAdjacentElement('beforeend', li);


        }


    }

}


devices.onclick = (e) => {
    configblock.innerHTML = "";
    subnavprimary.innerHTML = "";
    state = "Devices"
    subnavprimary.style.display = "block";
    subnavsecoundary.style.display = "none";

    const url = window.API + "/device/listAvailable?session=" + window.readCookie("session");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
    xmlHttp.onload = function () {
        generateAddDeviceButton();

        const data = JSON.parse(xmlHttp.responseText)
        deviceAvailable = data;
        if (!data.data) return;
        for (var i = 0; i < data.data.length; i++) {

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
            a.innerText = data.data[i].name;
            li.insertAdjacentElement('beforeend', a);
            a.insertAdjacentElement('beforeend', img);
            subnavprimary.insertAdjacentElement('beforeend', li);


        }


    }


}



settings.onclick = (e) => {
    configblock.innerHTML = "";
    state = "Settings";
    subnavprimary.style.display = "block";
    subnavprimary.innerHTML = "";
    subnavsecoundary.style.display = "none";


    generateSubNavPrimary("API Keys");



}

function generateSubNavPrimary(name) {

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
    a.innerText = name;
    li.insertAdjacentElement('beforeend', a);
    a.insertAdjacentElement('beforeend', img);
    subnavprimary.insertAdjacentElement('beforeend', li);

}

function generateSubNavSecoundaryAppData() {
    const url = window.API + "/app/getAppScores?session=" + window.readCookie("session") + "&appuuid=" + appdataInstalledApps.list[primarySelectionIndex].UUID;
    var xmlHttp_getScores = new XMLHttpRequest();
    xmlHttp_getScores.open("GET", url, true);
    xmlHttp_getScores.send(null);
    subnavsecoundary.innerHTML = "";
    //subnavsecoundary.style.display = "none";


    configblock.innerHTML = "";

    xmlHttp_getScores.onload = function () {
        subnavsecoundary.innerHTML = "";
        generateCreateNewAppData();
        const d = JSON.parse(xmlHttp_getScores.responseText);

        for (var i = 0; i < d.write.length; i++) {//write auflisten permission
            generateSecoundary(d.write[i].name)

        }

        for (var i = 0; i < d.read.length; i++) {//read auflisten permission
            generateSecoundarySubContent(d.read[i].name, "Read-Only")
            d.read[i].readonly = true;

        }
        //subnavsecoundary.style.display = "block";
        lastLoadingAnimation.style.display = "none";


        appdataCurrentScores = d.write.concat(d.read);

    }

}


function generateSubNavSecoundaryDevice() {
    console.log(primarySelectionIndex)
    const url = window.API + "/device/listSpecificUserDevice?session=" + window.readCookie("session") + "&device=" + deviceAvailable.data[primarySelectionIndex - 1].UUID;
    var xmlHttp_getScores = new XMLHttpRequest();
    xmlHttp_getScores.open("GET", url, true);
    xmlHttp_getScores.send(null);
    subnavsecoundary.innerHTML = "";


    configblock.innerHTML = "";

    xmlHttp_getScores.onload = function () {
        subnavsecoundary.innerHTML = "";



        const button = document.createElement("button");

        button.id = "buttonaddscore"
        button.innerText = "Refresh"

        button.onclick = (e) => {

            lastLoadingAnimation.style.display="block"
            subnavsecoundary.style.display = "none";

            generateSubNavSecoundaryDevice();
        }
        subnavsecoundary.insertAdjacentElement('beforeend', button);





        console.log(xmlHttp_getScores.responseText)
        const d = JSON.parse(xmlHttp_getScores.responseText);
        if (!d.data) return;
        selectedDeviceGroup = d;

        for (var i = 0; i < d.data.length; i++) {

            if (d.data[i].online == 1) {
                generateSecoundarySubContent(d.data[i].name, "", `<span class="dot_online" title="Online-Status: Online"></span>`)
            } else {
                generateSecoundarySubContent(d.data[i].name, "", `<span class="dot_offline" title="Online-Status: Offline"></span>`)

            }

        }
        subnavsecoundary.style.display = "block";
        lastLoadingAnimation.style.display = "none";

    }

}

function generateSecoundary(content) {
    generateSecoundarySubContent(content, "");

}

function generateSecoundarySubContent(content, subcontent, customHTML) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const subtext = document.createElement("p");
    a.innerText = content;

    const img = document.createElement("img");
    img.src = "assets/loading.svg";
    img.width = 20;
    img.height = 20;
    img.style.marginBottom = "-4px";
    img.style.float = "right";
    img.class = "loadingAni"
    img.style.display = "none";
    subtext.innerText = subcontent;
    subtext.classList.add("subtext");
    if (customHTML)
        a.insertAdjacentHTML('beforeend', customHTML);
    a.insertAdjacentElement('beforeend', img);
    li.insertAdjacentElement('beforeend', a);
    if (subcontent && subcontent != "")
        a.insertAdjacentElement('beforeend', subtext);
    subnavsecoundary.insertAdjacentElement('beforeend', li);
}

function generateCreateNewAppData() {
    const div = document.createElement("div");
    const ti = document.createElement("input");
    const button = document.createElement("button");
    div.id = "scorenamediv"
    ti.type = "text"
    ti.id = "scorenameinput"
    ti.placeholder = "Name"
    button.id = "buttonaddscore"
    button.innerText = "Hinzufügen"

    div.insertAdjacentElement('beforeend', ti);
    div.insertAdjacentElement('beforeend', button);
    subnavsecoundary.insertAdjacentElement('beforeend', div);
    button.onclick = (e) => {

        if (!(ti.value.length > 3)) return;

        var add_url = window.API + "/app/addScore?session=" + window.readCookie("session") + "&name=" + ti.value + "&appuuid=" + appdataInstalledApps.list[primarySelectionIndex].UUID;
        console.log(add_url);

        var xmlHttp_add = new XMLHttpRequest();
        xmlHttp_add.open("GET", add_url, false);
        xmlHttp_add.send(null);

        const add_data = JSON.parse(xmlHttp_add.responseText)
        if (add_data.success = true)
            ti.value = "";

        generateSubNavSecoundaryAppData();
    }
}


function generateAddDeviceButton() {
    const div = document.createElement("div");
    const button = document.createElement("button");
    div.id = "scorenamediv"

    button.id = "buttonaddscore"
    button.innerText = "Hinzufügen"

    div.insertAdjacentElement('beforeend', button);
    subnavprimary.insertAdjacentElement('beforeend', div);
    button.onclick = (e) => {

        console.log("Add Device")

        //            X X X X X X
        //----------------ODER----------------
        //           Code eingeben: _______

        clickblock.style.pointerEvents  = "auto";
        clickblock.style.opacity = "1"
        dialog.style.display = "grid";
        dialog.innerHTML = "";
        dialog.innerHTML = ` 

<input type="number"  placeholder="Code" id="codeUserInput" max="16383"></input>
<button id="registerNewDevice">Verbinden</button>
<div id="colorcodeselectorbox">
<div color="red" class="colorclicker"></div>
<div color="red" class="colorclicker"></div>
<div color="red" class="colorclicker"></div>
<div color="red" class="colorclicker"></div>
<div color="red" class="colorclicker"></div>
<div color="red" class="colorclicker"></div>
<div color="red" class="colorclicker"></div>
</div>
<p id="errorlable"> </p>
<a id="closeDialog" href="#">Schließen</a>
 `;

        var deviceRegCode = 0;

        const registerNewDevice = document.getElementById("registerNewDevice")
        registerNewDevice.onclick = function () {
            var load_url = window.API + "/device/registerByCode?regCode=" + deviceRegCode + "&session=" + window.readCookie("session");
            var xmlHttp_load = new XMLHttpRequest();
            xmlHttp_load.open("GET", load_url, true);
            xmlHttp_load.onload = function () {
                console.log(xmlHttp_load.responseText);
                var res = JSON.parse(xmlHttp_load.responseText);

                if (res.error != undefined) {
                    console.log(res.error);
                    document.getElementById("errorlable").innerText = "";
                    document.getElementById("errorlable").innerText = res.error;
                } else {
                    dialog.style.display = "none";
                    clickblock.style.opacity = "0"
                    clickblock.style.pointerEvents  = "none";
                   // clickblock.style.display = "none";
                   
                   
                    //generateSubNavSecoundaryDevice(); todo set selection primary
                }
            }
            xmlHttp_load.send(null);


        }

        const closeTag = document.getElementById("closeDialog");
        closeTag.onclick = function () {

            dialog.style.display = "none";
            clickblock.style.opacity = "0"
            clickblock.style.pointerEvents  = "none";
            dialog.innerHTML = "";

        }

        const codeUserInput = document.getElementById("codeUserInput");



        codeUserInput.oninput = function () {
            if (codeUserInput.value > 16383) codeUserInput.value = 16383;
            if (codeUserInput.value < 0) codeUserInput.value = 0;
            codeUserInput.value = codeUserInput.value * 1;
            if (codeUserInput.value == 0) codeUserInput.value = "";
            deviceRegCode = codeUserInput.value;
            var codeUserInputcounter = 0;
            $(".colorclicker").parent().children().each(function (i) {
                var currentColorIterator = (deviceRegCode >> codeUserInputcounter) & 0x03;
                console.log(deviceRegCode)
                switch (currentColorIterator) {
                    case 0: {
                        $(this).css("background-color", "rgb(255, 255, 255)")
                        $(this).attr("color", "white")
                        break;
                    }
                    case 1: {
                        $(this).css("background-color", "rgb(255, 0, 0)")
                        $(this).attr("color", "red")
                        break;
                    }
                    case 2: {
                        $(this).css("background-color", "rgb(0, 255, 0)")
                        $(this).attr("color", "green")
                        break;
                    }

                    case 3: {
                        $(this).css("background-color", "rgb(0, 0, 255)")
                        $(this).attr("color", "blue")

                        break;
                    }

                }
                codeUserInputcounter += 2;
            })


        }



        $(".colorclicker").click(function () {

            var color = $(this).attr("color");

            if (color == "red") {
                $(this).css("background-color", "rgb(0, 255, 0)")
                $(this).attr("color", "green");
            } else if (color == "green") {
                $(this).css("background-color", "rgb(0, 0, 255)")
                $(this).attr("color", "blue");
            } else if (color == "blue") {
                $(this).css("background-color", "rgb(255, 255, 255)")
                $(this).attr("color", "white");
            } else {
                $(this).css("background-color", "rgb(255, 0, 0)")
                $(this).attr("color", "red");

            }
            var j = 0;
            deviceRegCode = 0;
            console.clear();

            $("#colorcodeselectorbox").children().each(function (i) {

                console.log($(this).css("background-color"))

                if ($(this).attr("color") == "white") {
                    deviceRegCode = deviceRegCode | (0x00 << j);
                }
                if ($(this).attr("color") == "red") {
                    deviceRegCode = deviceRegCode | (0x01 << j);

                }
                if ($(this).attr("color") == "green") {
                    deviceRegCode = deviceRegCode | (0x02 << j);

                }
                if ($(this).attr("color") == "blue") {
                    deviceRegCode = deviceRegCode | (0x03 << j);

                }

                j = j + 2;
            })
            codeUserInput.value = deviceRegCode;
        })



    }
}



var currentUserAppData;
var currentParamContainer;
function loadAppConfig() {

    configblock.innerHTML = "";
    var load_url = window.API + "/app/getScoreConfig?session=" + window.readCookie("session") + "&scoreuuid=" + appdataCurrentScores[secoundarySelectionIndex - 1].uuid;

    var xmlHttp_load = new XMLHttpRequest();
    xmlHttp_load.open("GET", load_url, true);
    xmlHttp_load.onload = function () {

        currentUserAppData = JSON.parse(xmlHttp_load.responseText);

        configblock.innerHTML = "";


        lastLoadingAnimationSecoundary.style.display = "none"
        var data = appdataInstalledApps.list[primarySelectionIndex].config.settings;
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var currentConfig
                if (currentUserAppData.config[data[i].targetName] != undefined) {
                    currentConfig = currentUserAppData.config[data[i].targetName];
                } else {
                    currentConfig = data[i].default;
                }



                currentParamContainer = document.createElement("div");
                currentParamContainer.classList.add("paramContainer")



                createParamName(data[i].displayname,currentParamContainer);


                if (data[i].type == "integer") {
                    createParam_Integer(currentConfig, data[i].targetName, currentUserAppData.config,currentParamContainer);
                }
                if (data[i].type == "color") {
                    createParam_color(currentConfig, data[i].targetName, currentUserAppData.config,currentParamContainer);
                }
                if (data[i].type == "text") {
                    createParam_Text(currentConfig, data[i].targetName, currentUserAppData.config,currentParamContainer);
                }
                if (data[i].type == "switch") {
                    createParam_switch(currentConfig, data[i].targetName, currentUserAppData.config,currentParamContainer);
                }
                

                createParamDescription(data[i].description,currentParamContainer);

                configblock.insertAdjacentElement('beforeend', currentParamContainer);

            }
        }
        generateButtonsForScore();


        if (appdataCurrentScores[secoundarySelectionIndex - 1].readonly) {
            $("#config *").not(".removescoreaccess").not(".setasdefault").prop("disabled", true);
        }


    }

    xmlHttp_load.send(null);


}

var currentDeviceData;
function loadDeviceConfig() {
    configblock.innerHTML = "";
    var load_url = window.API + "/device/getDeviceConfig?session=" + window.readCookie("session") + "&device=" + selectedDeviceGroup.data[secoundarySelectionIndex - 1].uuid;

    var xmlHttp_load = new XMLHttpRequest();
    xmlHttp_load.open("GET", load_url, true);
    xmlHttp_load.onload = function () {

        const load_comApps = window.API + "/device/listinstalledcompatibleapps?session=" + window.readCookie("session")+"&deviceuuid="+selectedDeviceGroup.data[secoundarySelectionIndex - 1].uuid;
        console.log(load_comApps)
        var xmlHttp_comApps = new XMLHttpRequest();
        xmlHttp_comApps.open("GET", load_comApps, true);
        xmlHttp_comApps.onload = function () {

        currentDeviceData = JSON.parse(JSON.parse(xmlHttp_load.responseText).data);

        var comAppsUUID = []
        var comAppsName = []


    
        JSON.parse(xmlHttp_comApps.responseText).list.forEach(e=> {
            comAppsUUID.push(e.UUID); comAppsName.push(e.name); console.log(e) 
        })

        configblock.innerHTML = "";



        lastLoadingAnimationSecoundary.style.display = "none"
        console.log(deviceAvailable.data[primarySelectionIndex - 1].config)
        var data = JSON.parse(deviceAvailable.data[primarySelectionIndex - 1].config).settings;
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var currentConfig
                if (currentDeviceData[data[i].targetName] != undefined) {
                    currentConfig = currentDeviceData[data[i].targetName];
                } else {
                    currentConfig = data[i].default;
                }


                currentParamContainer = document.createElement("div");
                currentParamContainer.classList.add("paramContainer")


                createParamName(data[i].displayname,currentParamContainer);


                if (data[i].type == "integer") {
                    createParam_Integer(currentConfig, data[i].targetName,currentDeviceData, currentParamContainer);
                }
                if (data[i].type == "color") {
                    createParam_color(currentConfig, data[i].targetName,currentDeviceData, currentParamContainer);
                }
                if (data[i].type == "text") {
                    createParam_Text(currentConfig, data[i].targetName, currentDeviceData,currentParamContainer);
                }
                if (data[i].type == "switch") {
                    createParam_switch(currentConfig, data[i].targetName,currentDeviceData, currentParamContainer);
                }
                if(data[i].type == "applicationselect") {



                    createDropDownList(currentConfig, data[i].targetName, currentDeviceData,currentParamContainer,comAppsName,comAppsUUID);

                    
                }

                createParamDescription(data[i].description,currentParamContainer);

                configblock.insertAdjacentElement('beforeend', currentParamContainer);

            }
        }
        generateButtonsForDevice();



    }
    xmlHttp_comApps.send(null);
    }

    xmlHttp_load.send(null);


}



function generateButtonsForScore() {
    const apply = document.createElement("button");
    apply.innerText = "Anwenden";
    apply.classList.add("applyScore");
    apply.onclick = function () {

        console.log(JSON.stringify(currentUserAppData.config))

        var save_url = window.API + "/app/saveAppScore?session=" + window.readCookie("session") + "&params=" + encodeURIComponent(JSON.stringify(currentUserAppData.config)) + "&scoreuuid=" + appdataCurrentScores[secoundarySelectionIndex - 1].uuid;

        var xmlHttp_save = new XMLHttpRequest();
        xmlHttp_save.open("GET", save_url, true);
        xmlHttp_save.onload = function () {

            console.log(xmlHttp_save.responseText)
        }
        xmlHttp_save.send(null);

    }

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Löschen";
    deleteButton.classList.add("deleteScore")

    deleteButton.onclick = function () {

        var delete_url = window.API + "/app/deleteAppScore?session=" + window.readCookie("session") + "&scoreuuid=" + appdataCurrentScores[secoundarySelectionIndex - 1].uuid;

        var xmlHttp_delete = new XMLHttpRequest();
        xmlHttp_delete.open("GET", delete_url, true);
        xmlHttp_delete.onload = function () {
            generateSubNavSecoundaryAppData();
            console.log(xmlHttp_delete.responseText)
        }
        xmlHttp_delete.send(null);
    }


    const deleteaccessButton = document.createElement("button");
    deleteaccessButton.innerText = "Meinen Zugriff löschen";
    deleteaccessButton.classList.add("removescoreaccess");

    deleteaccessButton.onclick = function () {

        var deleteaccessButton_url;

        if (appdataCurrentScores[secoundarySelectionIndex - 1].readonly) {
            console.log(appdataCurrentScores[secoundarySelectionIndex - 1])
            deleteaccessButton_url = window.API + "/app/removeReadScore?session=" + window.readCookie("session") + "&scoreuuid=" + appdataCurrentScores[secoundarySelectionIndex - 1].uuid;
        } else {
            console.log(appdataCurrentScores[secoundarySelectionIndex - 1])

            deleteaccessButton_url = window.API + "/app/removeWriteScore?session=" + window.readCookie("session") + "&scoreuuid=" + appdataCurrentScores[secoundarySelectionIndex - 1].uuid;
        }
        var xmlHttp_deleteaccess = new XMLHttpRequest();
        xmlHttp_deleteaccess.open("GET", deleteaccessButton_url, true);
        xmlHttp_deleteaccess.onload = function () {
            generateSubNavSecoundaryAppData();
            console.log(xmlHttp_deleteaccess.responseText)
        }
        xmlHttp_deleteaccess.send(null);




    }

    const setdefaultButton = document.createElement("button");
    setdefaultButton.innerText = "Zur Verwendung aktivieren";
    setdefaultButton.classList.add("setasdefault");

    setdefaultButton.onclick = function () {
        var url_setdefault = window.API + "/app/setDefaultScore?session="+ window.readCookie("session") + "&scoreuuid=" + appdataCurrentScores[secoundarySelectionIndex - 1].uuid;

        var xmlHttp_setdefault = new XMLHttpRequest();
        xmlHttp_setdefault.open("GET", url_setdefault, true);
        xmlHttp_setdefault.onload = function () {
            generateSubNavSecoundaryAppData();
            console.log(xmlHttp_setdefault.responseText)
        }
        xmlHttp_setdefault.send(null);
    }
 

    configblock.insertAdjacentElement('beforeend', apply);
    configblock.insertAdjacentElement('beforeend', deleteButton);
    configblock.insertAdjacentElement('beforeend', deleteaccessButton);
    configblock.insertAdjacentElement('beforeend', setdefaultButton);

}


function generateButtonsForDevice() {
    const apply = document.createElement("button");
    apply.innerText = "Anwenden";
    apply.classList.add("applyScore");

    apply.onclick = function () {

        var save_url = window.API + "/device/saveConfig?session=" + window.readCookie("session") + "&params=" + encodeURIComponent(JSON.stringify(currentDeviceData)) + "&deviceuuid=" + selectedDeviceGroup.data[secoundarySelectionIndex-1].uuid;

        var xmlHttp_save = new XMLHttpRequest();
        xmlHttp_save.open("GET", save_url, true);
        xmlHttp_save.onload = function () {

            console.log(xmlHttp_save.responseText)
        }
        xmlHttp_save.send(null);

    }

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Gerät trennen";
    deleteButton.classList.add("deleteScore")

    deleteButton.onclick = function () {

        var delete_url = window.API + "/device/deleteDevice?session=" + window.readCookie("session") + "&deviceuuid=" + selectedDeviceGroup.data[secoundarySelectionIndex-1].uuid;

        var xmlHttp_delete = new XMLHttpRequest();
        xmlHttp_delete.open("GET", delete_url, true);
        xmlHttp_delete.onload = function () {
            generateSubNavSecoundaryDevice();
            console.log(xmlHttp_delete.responseText)
        }
        xmlHttp_delete.send(null);
    }

    configblock.insertAdjacentElement('beforeend', apply);
    configblock.insertAdjacentElement('beforeend', deleteButton);

}

function displayHomeSection() {


    const hello = document.createElement("h1")
    hello.id = "helloUser"

    var getAccountInfos = window.API + "/account/info?session=" + window.readCookie("session");

    var xmlHttp_accinfo = new XMLHttpRequest();
    xmlHttp_accinfo.open("GET", getAccountInfos, true);
    xmlHttp_accinfo.onload = function () {
        const accInfo = JSON.parse(xmlHttp_accinfo.responseText);
        hello.innerText = timegreeting() + " " + accInfo.name + "!";
        console.log(accInfo)
    }
    xmlHttp_accinfo.send(null);

    configblock.insertAdjacentElement('beforeend', hello)
}


function timegreeting() {
    const time = new Date();
    const hour = time.getHours();

    if (hour >= 11 && hour < 17) {

        return "Guten Tag";

    } else if ((hour >= 17) || (hour < 4)) {
        return "Guten Abend";


    } else {
        return "Guten Morgen";
    }


}

function generateSettingPage(psi) {

    lastLoadingAnimation.style.display = "none";

}