var listproid = [];
var listproname = [];
var listproquant = [];
var listproprice = [];
var listprokey = [];

function geListProduct() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            //var strContent = "<table>";
            var i;
            var arrayList = respHttp.split('|');
            var DataJson;

             listproid = [];
             listproname = [];
             listproquant = [];
             listproprice = [];
             listprokey = [];

            for (i = 1; i < arrayList.length; i++) {
                var DataStr = arrayList[i];
                DataJson = JSON.parse(DataStr);
               // var DatJson2 = JSON.parse(DataJson.Product);
                //strContent += "<tr><td><a href='/Home/Detail.html?pro=" + DataJson.Value.Product.Id + "'>"
                //    + DataJson.Value.Product.Name
                //    + "</a></td><td>" + DataJson.Value.Quantity + "</td><td>" + DataJson.Value.Product.Price + " €</td><td>"
                //    + DataJson.Value.Quantity * DataJson.Value.Product.Price + "</td></td><td><a onclick='getDelete(" + DataJson.Key +")'>Delete </a></td> </tr>";

                listproid.push(DataJson.Value.Product.Id);
                listproname.push(DataJson.Value.Product.Name);
                listproquant.push(DataJson.Value.Quantity);
                listproprice.push(DataJson.Value.Product.Price);
                listprokey.push(DataJson.Key);
            }
            putListProduct();
            //document.getElementById("ListProduct").innerHTML = strContent + "</table>";
        }
    };
    xhttp.open("GET", urlbase + "/api/ListProduts/GetLsit/" + site, true);
    xhttp.send();
}
function getTotal() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            document.getElementById("Total").innerHTML = "<h2>Total: <b>" + respHttp + " €</b></h2>";
        }
    };
    xhttp.open("GET", urlbase + "/api/ListProduts/GetTotal/" + site, true);
    xhttp.send();
}
function getDelete(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            geListProduct();
            getTotal();
        }
    };
    xhttp.open("GET", urlbase + "/api/ListProduts/GetDeleteProdtList/" + id + "|" + site, true);
    xhttp.send();
}
function getTraceConnexionOrder() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            if (respHttp == 0) {
                window.location.replace("/Home/Connexion.html");
            }
            else
            {
                window.location.replace("/Home/Order.html?u=" + u);
            }
           
        }
    };
    xhttp.open("GET", urlbase + "/api/Trace/GetTraceConnexionOrder/" + site, true);
    xhttp.send();
}
geListProduct();
getTotal();
//<h2>List Produits in basket</h2><div id='ListProduct'></div><div id='Total'></div>
//document.write("<a onclick='getTraceConnexionOrder()' style='cursor: pointer;'>Next</a>");

function putListProduct()
{
    var strContent = "<table> <thead><tr ><th>Produit</th><th> quantite</th><th>prix</th><th>total</th><th>Action</th></tr><tbody>";  
            var i = 0;
        for (i; i < listproid.length; i++) {
            strContent+=" <tr><td><a href='/Home/Detail.html?pro="+ listproid[i] + "'>" + listproname[i] + "</a></td>"+
             "<td>"+ listproquant[i] + "</td>"+
             "<td>"+ listproprice[i] + " €</td>"+
                "<td>" + listproquant[i] * listproprice[i] + " €</td>"+
             '<td><a href="#" onclick="' + "getDelete('"+ listprokey[i] + "')" +'">Delete </a></td></tr>';
            }''
    strContent += " </tbody></table>";

    document.getElementById("ListProduct").innerHTML = strContent;
}