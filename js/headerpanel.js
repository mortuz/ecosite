window.onload = function () {
    $.ajax({
        type: "GET",
        url: urlbase + "/api/Connexion/GetConnected/" + u + "|" + site,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (response) {
            if (response == "0") {
                window.location.replace("/Index.html");
            }
        }
    });
};


function GetIfConnected() {
    let paramlist = (new URL(document.location)).searchParams;
    let param = paramlist.get("u");
    if (param == "")
        return "0";
    else
    return "1";
}
function getConnexion() {
    $.ajax({
        type: "GET",
        url: urlbase + "/api/Connexion/GetConnected/" + u + "|" + site,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (response) {
            if (response == "0") {
                document.getElementById("Connexion").innerHTML = "<a href='/Home/Connexion.html'>Log In</a>";
            }
            else {
                var DataJson = JSON.parse(response);
                u = DataJson.User.Id;
                document.getElementById("Connexion").innerHTML = "<a href='/Panel/Index.html?u=" + u + "'>\
                Welcome " + DataJson.FirstName + "</a><a onclick='GetDisconnect()' style='cursor: pointer;' > Disconnect</a>";
            }
        }
    });
}
function GetDisconnect()
{
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
            getConnexion();
        }
    };

    let param = paramlist.get("u");
    xhttp.open("GET", urlbase + "/api/Connexion/GetDisconnect/" + param + "|1", true);
    xhttp.send();

}


function GetConnexion(url)
{
    if (GetAllUrl()==0)
    {
        GetDeleteList();
        window.location.replace("/Index.html");
    }

}
function getTraceConnexionPanel() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            if (respHttp == 0) {
                window.location.replace("/Home/Connexion.html");
            }
       }
    };
    xhttp.open("GET", urlbase + "/api/Trace/GetTraceConnexionPanel/"+site, true);
    xhttp.send();
}
getConnexion();
getTraceConnexionPanel();

document.write("<div id='Connexion'></div>");


document.write("<div class='header - top'>"+
    "<div class= 'wrapper' >" +
    " <div class='row'>" +

    "<div class='col-3'>" +
    "    <div id='Title'><h1 class='title'><a href='/'><img src='/img/logo.png' alt='logo' /></a></h1></div>" +
    "</div>" +

       " <div class='col-9'>"+
          "  <div class='info-wrap'>"+
            "    <div class='info'><a href='tel:012-345-6789'><img src='images/icon-ph.png' alt='ph' /> 012-345-6789 </a></div>"+
           "     <div class='info'><a href='mailto:info@productsell.com'><img src='/img/icon-email.png' alt='email' /> info@productsell.com </a></div>"+
           "     <div class='info' id='ProList'><a href='/Home/ListProduct.html?u=null'>Nbre Product: <strong>0</strong></a></div>"+
           "     <div class='info' id='Connexion'><a href='/Home/Connexion.html'>Log In</a></div>"+
           " </div>"+
      "  </div>"+
   " </div>"+
   " </div > "+
"</div > "+
   " <div class='menuwrap'>"+    
   " <div class='wrapper'>"+  
    "<div class='row'>"+  
     "   <div class='col-12'>"+  
      "      <div class='menu'>"+  
       "         <div id='mobnavbar'><button type='button' class='btn-navbar' data-toggle='collapse' data-target='.nav-collapse'>"+  
        "            <span class='icon-bar'> </span> <span class='icon-bar'> </span>"+  
         "           <span class='icon-bar'> </span> </button></div>"+  
          "      <div class='navbar'>"+  
           "         <ul>"+  
            "            <li><a href='/Panel/Index.html?u=undefined'>Acceuil</a></li>"+  
             "           <li><a href='/Panel/CurrentInvoice.html?u=undefined'>Current invoice</a></li>"+  
    "          <li class='selected'><a href='/Panel/Personnel.html?u=undefined'>Personnel</a></li>   " +
    "         <li><a href='/Panel/Parameter.html?u=undefined'>Parameter</a></li>" +
    "    </ul>" +
               " </div></div></div></div></div ></div>");
