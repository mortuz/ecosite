
function addBasket(pro) {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            document.getElementById("ProList").innerHTML = "<a href='ListProduct.html'>Nbre Product: <b>" + respHttp + "</b></a>";

            if (isService == 1)
            {
                window.location.replace("/Home/ListProduct.html" + "?u=" + u);

            }
        }
    };
    xhttp.open("GET", urlbase + "/api/ListProduts/GetAddProdtList/" + pro + "|1|" + site, true);
    xhttp.send();
}
function getTree() {
    var xhttp = new XMLHttpRequest();
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

                strContent += "<div><a href='/Home/Product.html?cat=" + DataJson.Id + "'>" + DataJson.Name + "</a>&nbsp; &nbsp;</div>";
            }

            document.getElementById("CatPanel").innerHTML = "<h3>Les cat :</h3>" + strContent;
        }
    };


    let cat = paramlist.get("cat");
    xhttp.open("GET", urlbase + "/api/Product/GetTreeCat/" + cat + "|" + site, true);
    xhttp.send();
}

var proid = [];
var proname = [];
var proprice = [];
var prodescription = [];
var prodetail = [];
function getProductCat1()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
            var produstStr = respHttp.split('|1|')[0];
            var maxPage = respHttp.split('|1|')[1];
            var strContent = "";
            var i;
            var arrayList = produstStr.split('|');
            var DataJson;
       
            if (isService != 1) {
                for (i = 1; i < arrayList.length; i++) {
                    var DataStr;
                    var DataStr2;
                    if (respHttp.indexOf("=") !== -1) {
                        DataStr = arrayList[i].split('=')[0];
                        DataStr2 = arrayList[i].split('=')[1];
                    }
                    else {
                        DataStr = arrayList[i];
                    }

                    DataJson = JSON.parse(DataStr);

                    strContent += "<div><a href='/Home/Detail.html?pro=" + DataJson.Id + "'>" + DataJson.Name + "</a>&nbsp;"
                        + DataJson.Price + "€ &nbsp;" + "&nbsp;"
                        + DataJson.Detail + " <br/>" + "<a onclick = 'addBasket(" + DataJson.Id + ")' style='cursor: pointer;'>Add basket</a></div>";

                    if (DataStr2) {
                        var DataJson2 = JSON.parse(DataStr2);
                        strContent += "<a href='/Home/Detail.html?pro=" + DataJson.Id + "'><img src='" + DataJson2.Path + "' width=100 alt='" + DataJson.Name + " img'/></a>";
                    }
                }

                document.getElementById("Product").innerHTML = "<h3>Les produits</h3>" + strContent;

                var page = paramlist.get("p");
                if (!page)
                    page = 0;


                //alert(page);
                document.getElementById("Pagination").innerHTML = "<h3><a href ='/Home/Product.html?cat="
                    + paramlist.get("cat") + "&p=" + (++page) + "'>Next</a>..." + maxPage + "</h3>";

            }
            else
            {//Service
                for (i = 1; i < arrayList.length; i++) {
                    var DataStr;
                    var DataStr2;
                    if (respHttp.indexOf("=") !== -1) {
                        DataStr = arrayList[i].split('=')[0];
                        DataStr2 = arrayList[i].split('=')[1];
                    }
                    else {
                        DataStr = arrayList[i];
                    }

                    DataJson = JSON.parse(DataStr);

                    proid.push(DataJson.Id);
                    proname.push(DataJson.Name);
                    proprice.push(DataJson.Price);
                    prodescription.push(DataJson.Description);
                    prodetail.push(DataJson.Detail);
                    
                }
                PutService(); 
            }
            
        }
    };

    var ord = document.getElementById("selorder");

    if (ord) {
        ord = ord.value;
    }
    else {
        ord = 0;
    }
   

    let p = paramlist.get("p");

    let cat = paramlist.get("cat");

    

    var f = "";
    if (currentfilter)
        f = currentfilter;

    xhttp.open("GET", urlbase + "/api/Product/GetProductTree/" + cat + "|" + p + "|" + ord + "|" + f + "|" + site, true);
    xhttp.send();
}

function getProductCat() {
    var ord = document.getElementById("selorder");
    if (ord) {
        ord = ord.value;
    }
    else {
        ord = 0;
    }
    let p = paramlist.get("p");
    let cat = paramlist.get("cat");
    var f = "";
    if (currentfilter)
        f = currentfilter;

    $.ajax({
        type: "GET",
        url: urlbase + "/api/Product/GetProductTree/" + cat + "|" + p + "|" + ord + "|" + f + "|" + site,
        success: function (response) {
            var produstStr = response.split('|1|')[0];
            var maxPage = respHttp.split('|1|')[1];
            var strContent = "";
            var i;
            var arrayList = produstStr.split('|');
            var DataJson;

            if (isService != 1) {
                for (i = 1; i < arrayList.length; i++) {
                    var DataStr;
                    var DataStr2;
                    if (respHttp.indexOf("=") !== -1) {
                        DataStr = arrayList[i].split('=')[0];
                        DataStr2 = arrayList[i].split('=')[1];
                    }
                    else {
                        DataStr = arrayList[i];
                    }

                    DataJson = JSON.parse(DataStr);

                    strContent += "<div><a href='/Home/Detail.html?pro=" + DataJson.Id + "'>" + DataJson.Name + "</a>&nbsp;"
                        + DataJson.Price + "€ &nbsp;" + "&nbsp;"
                        + DataJson.Detail + " <br/>" + "<a onclick = 'addBasket(" + DataJson.Id + ")' style='cursor: pointer;'>Add basket</a></div>";

                    if (DataStr2) {
                        var DataJson2 = JSON.parse(DataStr2);
                        strContent += "<a href='/Home/Detail.html?pro=" + DataJson.Id + "'><img src='" + DataJson2.Path + "' width=100 alt='" + DataJson.Name + " img'/></a>";
                    }
                }

                document.getElementById("Product").innerHTML = "<h3>Les produits</h3>" + strContent;

                var page = paramlist.get("p");
                if (!page)
                    page = 0;


                //alert(page);
                document.getElementById("Pagination").innerHTML = "<h3><a href ='/Home/Product.html?cat="
                    + paramlist.get("cat") + "&p=" + (++page) + "'>Next</a>..." + maxPage + "</h3>";

            }
            else {//Service
                for (i = 1; i < arrayList.length; i++) {
                    var DataStr;
                    var DataStr2;
                    if (respHttp.indexOf("=") !== -1) {
                        DataStr = arrayList[i].split('=')[0];
                        DataStr2 = arrayList[i].split('=')[1];
                    }
                    else {
                        DataStr = arrayList[i];
                    }

                    DataJson = JSON.parse(DataStr);

                    proid.push(DataJson.Id);
                    proname.push(DataJson.Name);
                    proprice.push(DataJson.Price);
                    prodescription.push(DataJson.Description);
                    prodetail.push(DataJson.Detail);

                }
                PutService();
            }   
        }
    })
}

function getFilter() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            var strContent = "";
            var i;
            var arrayList = respHttp.split('[');
            var DataJson; var DataJson1; var datastr;

            for (i = 1; i < arrayList.length; i++) {
                datastr = arrayList[i].split(']')[0];
                DataJson = JSON.parse(datastr);
                strContent += "<h4>" + DataJson.Name + "</h4>";
               
                var arrayList1 = arrayList[i].split(']')[1].split('|');
               
                for (j = 1; j < arrayList1.length; j++) {
                    var DataStr = arrayList1[j];
                    DataJson1 = JSON.parse(DataStr);
                    strContent += "<input type='checkbox' id='ch" + DataJson.Id + "_val" + DataJson1.Id
                        + "' name='ch" + DataJson.Id + "' value='val" + DataJson1.Id
                        + "' onclick='getChangeFilter(this)'> " + DataJson1.Value;
                    strContent += "<br/>";

                    arrayfilter.push("ch" + DataJson.Id + "_val" + DataJson1.Id);
                }
            }
            document.getElementById("Filter").innerHTML = strContent;
        }
    };
    let cat = paramlist.get("cat");
    xhttp.open("GET", urlbase + "/api/Product/GetFilter/" + cat + "|" + site, true);
    xhttp.send();
}
var arrayfilter=[];
var currentfilter="";
function getChangeFilter(cb) {
    currentfilter = "";
    var i;
    for (i = 0; i < arrayfilter.length; i++) {
        var cb = document.getElementById(arrayfilter[i])
        if (cb.checked) {
            currentfilter += cb.name + "=" + cb.value+"$";
        }
    }
       
    getProductCat();
}

getProductCat();

if (isService != 1) {
    getTree();

    getFilter();

    document.write("\
    \
        \
   \
    <div class='row'>\
        <div class='col-3 menu'>\
            <div id='CatPanel'></div>\
            <h3>Filter</h3> <div id='Filter'></div>\
        </div>\
    <div class='col-9'>\
        <div><h4>Order</h4><select id='selorder' onchange='getProductCat()'>\
            <option value='0'> Default</option >\
            <option value='1'> Price down to high</option >\
             <option value='2'>Price high to down</option>\
            <option value='3'>Alphabet Asc</option>\
            <option value='4'>Alphabet Desc</option>\
         </select></div>\
    <h2>List Produits</h2>\
         <div id='Product' ></div> <div id='Pagination'></div>\
        </div>\
    </div>");
}
else {

   
}

function PutService() {

    var i = 0;
    for (i; i < proname.length; i++) {

        document.getElementById("Service").innerHTML += "\
            <div class= 'service-box' >\
            <div class='y-box'>\
                <div class='circle'><div class='icon'><img src='/img/icon-hosting.png' alt='hosting'></div></div>\
                </div>\
                <div class='service-info'>\
                    <h2>"+ proname[i] + "</h2>\
                    <p>" + prodescription[i] + "</p>\
                                <div class='service-price'>A partir de <strong>€" + proprice[i] + "/mo </strong></div>\
                                <p><strong>" + prodetail[i] + "</strong></p>\
                                <div class='lm-btn'><a onclick = 'addBasket(" + proid[i] + ")'>Buy</a></div>\
                            </div>\
                        </div>";
    }
    //Requires annual/multi-year purchase paid in advance. Prices exclude VAT at 20% 


    
}