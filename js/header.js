﻿function getTitle() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);              
            var DataJson = JSON.parse(respHttp);
            var strTitle = "";
            if (DataJson.Img == "") {
                strTitle = "<h1 class='title'><a href='/'>" + DataJson.Name + "</a></h1>";
            }
            else
            {
                strTitle="<h1 class='title'><a href='/'><img src='/img/logo.png' alt=" + DataJson.Name +" height='30' style='margin-top:10px; margin-bottom:10px'></a></h1>";
            }
            
            document.getElementById("Title").innerHTML = strTitle;
            
            if (DataJson.Isqual == 1)
            {
                
                isService=1;
            }
            
        }
    };
    xhttp.open("GET", urlbase + "/api/Header/GetConfig/" + site, true);
    xhttp.send();
}
function getPage1() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
            

        }
    };

    if (typeof page !== 'undefined') { 
        xhttp.open("GET", urlbase + "/api/Header/GetPage/" + page + "|" + site, true);
        xhttp.send();
    }
}

function getPage() {
    if (typeof page !== 'undefined') {
        $.ajax({
            type: "GET",
            url: urlbase + "/api/Header/GetPage/" + page + "|" + site,
            success: function (response) {
                var DataJson = JSON.parse(response);

                document.title = DataJson.Title;
                document.querySelector('meta[name="description"]').setAttribute("content", DataJson.Description);
            }
        });
    }
}

function getCategory() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
            var strlistcat = /*<div  class='menu'>*/"<ul><li><a href='/Index.html?u="+u+"'>Home</a></li>";

            var urlService;

            var i;
            var arrayCateg = respHttp.split('|');
            var CategJson;
            for (i = 1; i < arrayCateg.length; i++)
            {
                var CategStr = arrayCateg[i];

                // CategStr = CategStr.substr(0, choiceStr.length - 1);

                CategJson = JSON.parse(CategStr);

                strlistcat += "<li class='selected'><a href='/Home/Product.html?cat=" + CategJson.Id+"&u="+u+"'>" + CategJson.Name + "</a></li>";

                urlService = "/Home/Product.html?cat=" + CategJson.Id + "&u=" + u ;
            }
            
               
            strlistcat += "<li><a href='/Home/About.html'>About</a></li>";
            strlistcat += "<li><a href='/Home/Portfolio.html'>Portfolio</a></li>";
            strlistcat += "<li><a href='/Home/contactus.html'>contact</a></li>";
            
            document.getElementById("CatMenu").innerHTML = strlistcat + "</ul>";/*</div>*/
        }
    };
    xhttp.open("GET", urlbase + "/api/Header/GetCat/1|" + site, true);
    xhttp.send();
}

function getCountListProduct() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            document.getElementById("ProList").innerHTML = "<a href='/Home/ListProduct.html?u=" + u + "'>Checkout: <strong>"
                + respHttp + "</strong></a>";
        }
    };
    xhttp.open("GET", urlbase + "/api/ListProduts/GetCount/" + site, true);
    xhttp.send();
}
function GetAllUrl(url) {
    let paramlist = (new URL(document.location)).searchParams;
    let param = paramlist.get("u");
    window.location.replace(url + "?u=" + param); 
}
function GetIfConnected() {
    $.ajax({
        type: "GET",
        url: urlbase + "/api/Connexion/GetConnected/" + u + "|" + site,
        success: function (response) {
            if (response == "0") {
                return 0;
            }
            else {
                return 1;
            }
        }
    });
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
function getConnexion1() {

    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            if (respHttp == "0") {
                document.getElementById("Connexion").innerHTML = "<a href='/Home/Connexion.html'>Log In</a>";
            }
            else
            {
                var DataJson = JSON.parse(respHttp);
                u = DataJson.User.Id;
                document.getElementById("Connexion").innerHTML = "<a href='/Panel/Index.html?u=" + u + "'>\
                Welcome " + DataJson.FirstName + "</a><a onclick='GetDisconnect()' style='cursor: pointer;'> Disconnect</a>";
            }
           
        }
    };

    xhttp.open("GET", urlbase + "/api/Connexion/GetConnected/" + u + "|" + site, true);
    xhttp.send();
}
function GetDisconnect()
{
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
            getConnexion();
            location.reload();
        }
    };

    xhttp.open("GET", urlbase + "/api/Connexion/GetDisconnect/" + u + "|" + site, true);
    xhttp.send();
}
function GetDeleteList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
        }
    };

    xhttp.open("GET", urlbase + "/api/ListProduts/GetDeleteList/" + u + "|" + site, true);
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
function GetRedirectionConnexion(u1) {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
            if (respHttp.indexOf('?') !== -1)
                window.location.replace(respHttp + "&u=" + u1);
            else
                window.location.replace(respHttp + "?u=" + u1);
        }
    };

    xhttp.open("GET", urlbase + "/api/Trace/GetBackConnexion/" + site, true);
    xhttp.send();
}


//<div id='ListCat'></div><div class= 'header'><div id='ProList'></div ><div id='Connexion'></div></div><a href='/Home/Contact.html'>Contact</a> 
getTitle();
getConnexion();
getCategory();
getCountListProduct();
getPage();

document.write("<div class='header-top'>\
    <div class='wrapper'>\
        <div class='row'>\
            <div class='col-3'>\
                <div id='Title'></div>\
            </div>\
            <div class='col-9'>\
                <div class='info-wrap'>\
                        <div class='info' id='ProList'></div>\
                    <div class='info' id='Connexion'></div>\
                    <div class='info'><a href='/Home/Contact.html'>Contact</a></div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>\
    <div class='header'>\
        <div id='ListCat'>\
            <div class='wrapper'>\
                <div class='row'>\
                    <div class='col-12'>\
                        <div class='menu'>\
                            <div id='mobnavbar'><button type='button' class='btn-navbar' data-toggle='collapse' data-target='.nav-collapse'> <span class='icon-bar'> </span> <span class='icon-bar'> </span> <span class='icon-bar'> </span> </button></div>\
                            <div class='navbar' id='CatMenu'>\
                                <!--Mwnu Category-->\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>");

