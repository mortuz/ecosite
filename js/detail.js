function getDetailProduct() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
            var res1;
            var res2;
            var res3;

            if (respHttp.indexOf("|2|") !== -1) {
                res1 = respHttp.split('|2|')[0];

                res3 = respHttp.split('|2|')[1];

            }
            else {
                res1 = respHttp;
            }
            var temp = res1;
            if (res1.indexOf("|1|") !== -1) {
                res1 = temp.split('|1|')[0];

                res2 = temp.split('|1|')[1];

            }
            else {
                res1 = temp;
            }
            var DataJson = JSON.parse(res1);

            document.getElementById("DetailProduct").innerHTML = "<div><h2>" + DataJson.Name + "</h2>&nbsp;"
                + DataJson.Price + " €<br>" + DataJson.Detail + "</div>";

            document.getElementById("AddBasket").innerHTML = "<h4>&nbsp;<a onclick='addBasket(" + DataJson.Id
                + ")'>Add basket</a></h4>";
            var strlist;
            if (res2)
            {
                var DataStr2 = res2.split("|");
                var i;               
                 strlist = "<table>";
                for (i = 0; i < DataStr2.length - 1; i++) {
                    if (DataStr2[i]) {
                        var DataJson2 = JSON.parse(DataStr2[i]);
                        strlist += "<tr><td>" + DataJson2.Filter.Name + "</td><td>" + DataJson2.FilterValue.Value + "</td></tr>"
                    }
                   
                }
                strlist += "<table>";

            }

            if (res3) {
                var DataStr3 = res3.split("|");
                var i;
                 strlist += "<table>";
                for (i = 0; i < DataStr3.length - 1; i++) {
                    if (DataStr3[i]) {
                        var DataJson3 = JSON.parse(DataStr3[i]);
                        strlist += "<tr><td><img src='" + DataJson3.Path + "' alt='" + DataJson.Name + " img'/></td></tr>"
                    }
                    
                }
                strlist += "<table>";                
            }
            document.getElementById("DetailProduct").innerHTML += strlist;
        }
    };

    let param = paramlist.get("pro");
    xhttp.open("GET", urlbase + "/api/Detail/" + param+"|"+site, true);
    xhttp.send();
}

function addBasket(pro) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            document.getElementById("ProList").innerHTML = "<a href='ListProduct.html'>Nbre Product: <b>" + respHttp + "</b></a>";

           
        }
    };
    xhttp.open("GET", urlbase + "/api/ListProduts/GetAddProdtList/" + pro + "|1|"+site, true);
    xhttp.send();
}

getDetailProduct();

document.write("<div id='DetailProduct'></div> &nbsp;");

document.write("<div id='AddBasket'></div>");