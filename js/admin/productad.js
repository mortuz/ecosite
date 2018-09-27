var proid = [];
var proname = [];
var proprice = [];
var prodescription = [];
var prodetail = [];


function getAllProduct() 
    {
    $.ajax({
        type: "GET",
        url: urlbase + "/api/Admin/GetProducts/" + site,
        success: function (response) {

            var i;
            var arrayList = response.split('|');
            var DataJson;


            for (i = 1; i < arrayList.length; i++) {
                var DataStr = arrayList[i];

                DataJson = JSON.parse(DataStr);

                proid.push(DataJson.Id);
                proname.push(DataJson.Name);
                proprice.push(DataJson.Price);
                prodescription.push(DataJson.Description);
                prodetail.push(DataJson.Detail);
            }

            PutProduct();

        }
    })
}
function getProduct(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            var i;
            var DataJson;

                DataJson = JSON.parse(DataStr);

                proid.push(DataJson.Id);
                proname.push(DataJson.Name);
                proprice.push(DataJson.Price);
                prodescription.push(DataJson.Description);
                prodetail.push(DataJson.Detail);

            PutProduct();
        };
    }
    xhttp.open("GET", urlbase + "/api/Admin/GetProduct/"+ id+"|"+ site, true);
    xhttp.send();
}
getAllProduct();
function EditContaint(containt)
{
    var elem = document.getElementsByClassName(containt);
    var i;
    for (i = 0; i < elem.length; i++) {
        elem[i].style.backgroundColor = "orange";
        elem[i].innerHTML = "<input type='text' value='" + elem[i].innerHTML + "'  class='a" + containt + "'>";// class='" + containt + "'
    }
    document.getElementById('g' + containt).style.visibility = "visible"; 
    document.getElementById('e' + containt).style.visibility = "hidden"; 
}
function SaveContaint1(containt)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
            if (respHttp == 1) {
                getAllProduct()
            }

        };
    }
    var elem = document.getElementsByClassName(containt);
    var i = 0;

    var json = { contact_name: 'Scott', company_name: 'HP' };

    xhttp.open("GET", urlbase + "/api/Admin/GetEditProduct/" + JSON.stringify(json)+ "|" + site, true);
    xhttp.send();
}
function SaveContaint(containt) {
    var elem = document.getElementsByClassName('a'+containt);
    var Product = JSON.stringify({
        'Id':  elem[0].value, 'Name':  elem[1].value , 'Price': '9'
        , 'Description': 'test description', 'Detail': 'test detail'
    });

    $.ajax({
        type: "POST",
        url: urlbase + "/api/Admin/GetEditProduct/"+site,
        data: Product,
        contentType: "application/json",
        success: function (response) {
            var DataJson = JSON.parse(response);
            alert(DataJson.Name);
        }
    });
}

function PutProduct()
{
    var strContent = "<table>";
    var i = 0;
    for (i; i < proname.length; i++) {

        strContent += "<tr>\
                    <td class='cl"+ proid[i]+"'>"+ proid[i] + "</td>\
                    <td class='cl"+ proid[i] +"'>"+ proname[i] + "</td>\
                    <td>" + prodescription[i] + "</td>\
                    <td>" + proprice[i] + "</td>\
                    <td>" + prodetail[i] + "</td>\
         <td><a onclick = \"EditContaint(\'cl"+ proid[i] + "\')\"  id='ecl" + proid[i] + "'>edit</a></td>\
         <td><a onclick = \"SaveContaint(\'cl"+ proid[i] + "\')\"  id='gcl" + proid[i] + "' style='visibility: hidden;'>save</a></td>\
                               </tr>";
    }

    document.getElementById("Containt").innerHTML = strContent + "</table>";
}