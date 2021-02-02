 
    const url = `${window.API}/auth/signout?session=${window.readCookie("session")}`;
    console.log(url);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
    window.deleteCookie("session");
    window.location.replace("index.html");
