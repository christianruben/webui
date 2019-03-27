export const util = {
    deleteAllCookies:()=>{
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++)
          util.deleteCookie(cookies[i].split("=")[0]);
     },
     
     setCookie:(name, value, expirydays)=>{
      var d = new Date();
      d.setTime(d.getTime() + (expirydays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = name + "=" + value + "; " + expires;
     },
     deleteCookie:(name)=>{
        util.setCookie(name,"",-1);
     }
}