
function geTopProduct() {
    var xhttp = new XMLHttpRequest();
    //xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            var strContent = "";
            var i;
            var arrayList = respHttp.split('|');
            var DataJson;
            for (i = 1; i < arrayList.length; i++) {
                var DataStr = arrayList[i];
                DataJson = JSON.parse(DataStr);

                strContent += "<div><a href='/Home/Detail.html?pro=" + DataJson.Id + "'>" + DataJson.Name + "</a>&nbsp;" + DataJson.Price + " €</div>";
            }

            document.getElementById("TopProduct").innerHTML = "<h3>Top Product</h3>" + strContent;
        }
    };
    xhttp.open("GET", urlbase + "/api/Home/GetIsTop/" + site, true);
    xhttp.send();
}

function gePromotion() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
            if (respHttp != "0") {
                var strContent = "";
                var i;
                var arrayList = respHttp.split('|');
                var DataJson;
                for (i = 1; i < arrayList.length; i++) {
                    var DataStr = arrayList[i];
                    DataJson = JSON.parse(DataStr);

                    strContent += "<div><a href='/Home/Detail.html?pro=" + DataJson.Id + "'>" + DataJson.Name + "</a>&nbsp;" + DataJson.Price + " €&nbsp; -" + DataJson.Discount + "%</div>";
                    document.getElementById("PromotionProduct").innerHTML = "<h3>Promotion Product</h3>" + strContent;
                }
            }
            else
            {
                document.getElementById("PromotionProduct").innerHTML = "";
            }

           
        }
    };
    xhttp.open("GET", urlbase + "/api/Home/GetPromotion/" + site, true);
    xhttp.send();
}
//document.write("<h3>Product</h3><div id='TopProduct'></div>");
//document.write("<div id='PromotionProduct'></div>");

//geTopProduct();
//gePromotion();
function getUrlCategory() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
          

            var urlService;

            var i;
            var arrayCateg = respHttp.split('|');
            var CategJson;
            for (i = 1; i < arrayCateg.length; i++) {
                var CategStr = arrayCateg[i];

                // CategStr = CategStr.substr(0, choiceStr.length - 1);

                CategJson = JSON.parse(CategStr);

          

                urlService = "/Home/Product.html?cat=" + CategJson.Id + "&u=" + u;
            }


            putUrlService(urlService);
           
        }
    };
    xhttp.open("GET", urlbase + "/api/Header/GetCat/1|" + site, true);
    xhttp.send();
}
function putUrlService(urlService) {
    document.getElementById("UrlIndex").innerHTML = "<a id='aplan' class='btn btn-full js--scroll-to-plans'\
    href = '"+ urlService + "' > Voir produits</a >\
        <a id='astart' class='btn btn-ghost js--scroll-to-start' href='"+ urlService + "'>Achat produits</a>";
}

getUrlCategory();