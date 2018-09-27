var pagid = [];
var pagident = [];
var pagtitle = [];
var pagdescription = [];


function getAllData() {
    $.ajax({
        type: "GET",
        url: urlbase + "/api/Admin/GetPages/" + site,
        success: function (response) {

            var i;
            var arrayList = response.split('|');
            var DataJson;

            for (i = 1; i < arrayList.length; i++) {
                var DataStr = arrayList[i];

                DataJson = JSON.parse(DataStr);

                pagid.push(DataJson.Id);
                pagident.push(DataJson.Ident);
                pagtitle.push(DataJson.Title);
                pagdescription.push(DataJson.Description);
            }

            PutData();
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
    xhttp.open("GET", urlbase + "/api/Admin/GetProduct/" + id + "|" + site, true);
    xhttp.send();
}
getAllData();
function EditContaint(containt) {
    var elem = document.getElementsByClassName(containt);
    var i;
    for (i = 0; i < elem.length; i++) {
        elem[i].style.backgroundColor = "orange";
        elem[i].innerHTML = "<input type='text' value='" + elem[i].innerHTML.replace("'","''") + "'  class='a" + containt + "'>";// class='" + containt + "'
    }
    document.getElementById('g' + containt).style.visibility = "visible";
    document.getElementById('e' + containt).style.visibility = "hidden";
}
function SaveContaint(containt) {
    var elem = document.getElementsByClassName('a' + containt);
    var Product = JSON.stringify(     
            {
            'Id': elem[0].value, 'Ident': elem[1].value, 'Title': elem[2].value, 'Description': elem[3].value, 'Site': { 'Id': site }
            }       
    );

    $.ajax({
        type: "POST",
        url: urlbase + "/api/Admin/GetEditPage/" + site,
        data: Product,
        contentType: "application/json",
        success: function (response) {
            var DataJson = JSON.parse(response);
            DisplayData(containt, DataJson);
        }
    });
}
function DisplayData(containt, DataJson)
{
    var elem = document.getElementsByClassName(containt);
    var i;
    for (i = 0; i < elem.length; i++) {
        elem[i].style.backgroundColor = "inherit";       
    }
    elem[0].innerHTML = DataJson.Id;
    elem[1].innerHTML = DataJson.Ident;
    elem[2].innerHTML = DataJson.Title;
    elem[3].innerHTML = DataJson.Description;
    //"<input type='text' value='" + elem[i].innerHTML + "'  class='a" + containt + "'>";// class='" + containt + "'

    document.getElementById('g' + containt).style.visibility = "hidden";
    document.getElementById('e' + containt).style.visibility = "visible";

}
function PutData() {
    var strContent = "<table><thead><tr ><th>Id</th><th> Ident</th></tr><tbody>";
    var i = 0;
    for (i; i < pagid.length; i++) {

        strContent += "<tr>\
                    <td class='cl"+ pagid[i] + "'>" + pagid[i] + "</td>\
                    <td class='cl"+ pagid[i] + "'>" + pagident[i] + "</td>\
            <td class='cl"+ pagid[i] + "'>" + pagtitle[i] + "</td>\
            <td class='cl"+ pagid[i] + "'>" + pagdescription[i] + "</td>\
         <td><a onclick = \"EditContaint(\'cl"+ pagid[i] + "\')\"  id='ecl" + pagid[i] + "'>edit</a></td>\
         <td><a onclick = \"SaveContaint(\'cl"+ pagid[i] + "\')\"  id='gcl" + pagid[i] + "' style='visibility: hidden;'>save</a></td>\
                               </tr>";
    }

    document.getElementById("Containt").innerHTML = strContent + "</tbody></table>";
}