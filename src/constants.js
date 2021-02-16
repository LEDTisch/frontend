 window.API = "http://217.160.175.116:8146";
 window.createCookie = function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/"; 
};

window.readCookie = function getCookieValue(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
};


window.deleteCookie = function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
};