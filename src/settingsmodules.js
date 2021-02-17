var exports = {

    createParamName: function (text) {

        const ptag = document.createElement("p");
        ptag.innerText = text;
        ptag.classList.add("paramname");
        
        window.currentParamContainer.insertAdjacentElement('beforeend',ptag)
    
    },
    
    createParamDescription:  function (text) {
    
        const ptag = document.createElement("p");
    
    
        ptag.innerText = text;
        ptag.classList.add("paramdescription");
        
        window.currentParamContainer.insertAdjacentElement('beforeend',ptag)
    
    },
    
    
    createParam_Text:  function (defaultparam,targetname,variable){
        const div=document.createElement("div");
        const input=document.createElement("input");
    
        div.class="param"
    
    
    
        input.type="text"
        input.class="integerinput"
        input.value=defaultparam
        input.onchange = function () {
            variable[targetname] =input.value;
        }
    
    
        div.insertAdjacentElement('beforeend',input);
    
        window.currentParamContainer.insertAdjacentElement('beforeend',div)
    },
    createParam_Integer:  function (defaultparam,targetname,variable){
        const div=document.createElement("div");
        const input=document.createElement("input");
    
        div.class="param"
        input.type="number"
        input.class="integerinput"
        input.value=defaultparam
        input.onchange = function () {
            variable[targetname] =input.value;
        }
    
    
    
        div.insertAdjacentElement('beforeend',input);
    
        window.currentParamContainer.insertAdjacentElement('beforeend',div)
    },
    createParam_color: function (currentParam,targetname,variable){
        const div=document.createElement("div");
        const input=document.createElement("input");
    
        div.class="param"
    
    
    
        input.type="color"
        input.class="colorinput"
        input.value = currentParam;
      
        input.onchange = function () {
            variable[targetname] =input.value;
        }
    
    
        div.insertAdjacentElement('beforeend',input);
    
        window.currentParamContainer.insertAdjacentElement('beforeend',div)
    
    },
    createParam_switch: function (currentParam,targetname,variable){
        const div=document.createElement("div");
    
        const toggle=document.createElement("div");
    
        div.class="checkbox-container"
    
        toggle.innerHTML='<label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>'
      
        toggle.childNodes[0].childNodes[0].checked = currentParam;
    
        toggle.childNodes[0].childNodes[0].onchange = function() {
            currentConfig.config[targetname] =toggle.childNodes[0].childNodes[0].checked;
        }
    
    
        div.insertAdjacentElement('beforeend',toggle);
    
        window.currentParamContainer.insertAdjacentElement('beforeend',div)
    }

}

module.exports = exports;