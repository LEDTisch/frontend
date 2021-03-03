export function createParamName(text,currentParamContainer) {

    const ptag = document.createElement("p");
    ptag.innerText = text;
    ptag.classList.add("paramname");
    console.log(currentParamContainer)

    currentParamContainer.insertAdjacentElement('beforeend', ptag)

}

export function createParamDescription(text,currentParamContainer) {

    const ptag = document.createElement("p");


    ptag.innerText = text;
    ptag.classList.add("paramdescription");

    currentParamContainer.insertAdjacentElement('beforeend', ptag)

}


export function createParam_Text(defaultparam, targetname, variable,currentParamContainer) {
    const div = document.createElement("div");
    const input = document.createElement("input");

    div.class = "param"



    input.type = "text"
    input.class = "integerinput"
    input.value = defaultparam
    input.onchange = function () {
        variable[targetname] = input.value;
    }


    div.insertAdjacentElement('beforeend', input);

    currentParamContainer.insertAdjacentElement('beforeend', div)
}
export function createParam_Integer(defaultparam, targetname, variable,currentParamContainer) {
    const div = document.createElement("div");
    const input = document.createElement("input");

    div.class = "param"
    input.type = "number"
    input.class = "integerinput"
    input.value = defaultparam
    input.onchange = function () {
        variable[targetname] = input.value;
    }



    div.insertAdjacentElement('beforeend', input);

    currentParamContainer.insertAdjacentElement('beforeend', div)
}
export function createParam_color(currentParam, targetname, variable,currentParamContainer) {
    const div = document.createElement("div");
    const input = document.createElement("input");

    div.class = "param"



    input.type = "color"
    input.class = "colorinput"
    input.value = currentParam;

    input.onchange = function () {
        variable[targetname] = input.value;
    }


    div.insertAdjacentElement('beforeend', input);
    console.log(currentParamContainer)
    currentParamContainer.insertAdjacentElement('beforeend', div)

}
export function createParam_switch(currentParam, targetname, variable,currentParamContainer) {
    const div = document.createElement("div");

    const toggle = document.createElement("div");

    div.class = "checkbox-container"

    toggle.innerHTML = '<label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>'

    toggle.childNodes[0].childNodes[0].checked = currentParam;

    toggle.childNodes[0].childNodes[0].onchange = function () {
        variable[targetname] = toggle.childNodes[0].childNodes[0].checked;
    }


    div.insertAdjacentElement('beforeend', toggle);

    currentParamContainer.insertAdjacentElement('beforeend', div)
}


export function createDropDownList(currentParam, targetname, variable,currentParamContainer,optionsSelect,targets) {
    const div = document.createElement("div");

    const dropdown = document.createElement("select");

   


    var options = "";


    for(let i=0;i<optionsSelect.length;i++) {

        options+=`<option value="${optionsSelect[i]}">${optionsSelect[i]}</option>`
        console.log(optionsSelect[i])
    }
   

    dropdown.innerHTML = options;


    dropdown.value = optionsSelect[targets.indexOf(currentParam)];

    dropdown.onchange = function () {
        variable[targetname] = targets[optionsSelect.indexOf(dropdown.value)];
        console.log(targets[optionsSelect.indexOf(dropdown.value)])
    }


    div.insertAdjacentElement('beforeend', dropdown);

    currentParamContainer.insertAdjacentElement('beforeend', div)
}