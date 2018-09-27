
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

var invid;
var invlastname;
var invfirstname;
var invadress;
var invadress2;
var invzip;
var invtown;
var invcountry;

function getInvoice() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
         
            var DataJson = JSON.parse(respHttp.split('|1|')[0]);

            //document.getElementById("Invoice").innerHTML = "<h2>ref invoice " + DataJson.Id + "<br/>\
            //"+ DataJson.Client.LastName + " " + DataJson.Client.FirstName +"<br/>\
            //"+ DataJson.Adress + " " + DataJson.Adress2 +"<br/>\
            //"+ DataJson.Zip + " " + DataJson.Town+" "+ DataJson.Country +"<br/>\
            //</h2> ";

            invid = DataJson.Id;
            invlastname = DataJson.Client.LastName;
            invfirstname = DataJson.Client.FirstName;
            invadress = DataJson.Adress;
            invadress2 = DataJson.Adress2;
            invzip = DataJson.Zip;
            invtown = DataJson.Town;
            invcountry = DataJson.Country;

            PutInvoice();

            var DataStr2 = respHttp.split('|1|')[1].split("|");
            var i;
            var strlistPro = " <table><thead><tr ><th>Produit</th><th> quantite</th><th>prix</th><th>total</th></tr><tbody>";
            for (i = 0; i < DataStr2.length - 1; i++) {
                var DataJson2 = JSON.parse(DataStr2[i]);
                strlistPro += "<tr><td>" + DataJson2.Product.Name + "</td><td>" + DataJson2.Product.Quantity
                    + "</td><td>" + DataJson2.Product.Price + "</td><td>"
                    + DataJson2.Product.Quantity * DataJson2.Product.Price + "</td></tr>"
            }
            strlistPro += "</tbody></table><table></table>";

            document.getElementById("Products").innerHTML = strlistPro;

            //window.location.replace("/Home/Invoice.html?i=" + DataJson.Id + "&u=" + u);
        }
    };
    let i = paramlist.get("i");
    xhttp.open("GET", urlbase + "/api/Invoice/GetInvoice/" + i + "|"+site, true);
    xhttp.send();
}
var totalprice = "";
function getTotal() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            document.getElementById("DivTotal").innerHTML = "<h2>Total: <b>" + respHttp + " €</b></h2>";

            totalprice = respHttp;
        }
    };
    xhttp.open("GET", urlbase + "/api/ListProduts/GetTotal/"+site, true);
    xhttp.send();
}

function getBuyPapal1()
{
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            var DataJson = JSON.parse(respHttp);

        }
    };
  
    xhttp.open("GET", urlbase + "/api/Invoice/GetPaypal/" + totalprice + "|" + site, true);
    xhttp.send();
}
function getBuyPaypal() {
    //alert(totalprice);
    var win = window.open(urlbase + "/api/Payment/?totalPrice=" + totalprice, '_blank');
    win.focus();
}

//GetConnexion();
getInvoice();
getTotal();
//document.write("<h2>Invoice</h2><div id='Client'></div> <div id='Invoice'></div><div id='Products'></div><div id='DivTotal'></div>");

function PutInvoice()
{
    document.getElementById("Invoice").innerHTML = "<h2>Ref invoice " + invid+" </h2>\
        <div class='client-info'>\
            <h3>"+ invlastname + " " + invfirstname+" </h3>\
            <span>"+ invadress + " " + invadress2 + " " + " " + invzip + " " + invtown + " " + invcountry+" </span>\
                            </div>";
}