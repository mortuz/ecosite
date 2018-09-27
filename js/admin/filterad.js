var filid = [];
var filname = [];



function getAllData() {
    $.ajax({
        type: "GET",
        url: urlbase + "/api/Admin/GetFilters/" + site,
        success: function (response) {

            var i;
            var arrayList = response.split('|');
            var DataJson;


            for (i = 1; i < arrayList.length; i++) {
                var DataStr = arrayList[i];

                DataJson = JSON.parse(DataStr);

                filid.push(DataJson.Id);
                filname.push(DataJson.Name);
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
        elem[i].innerHTML = "<input type='text' value='" + elem[i].innerHTML + "'  class='a" + containt + "'>";// class='" + containt + "'
    }
    document.getElementById('g' + containt).style.visibility = "visible";
    document.getElementById('e' + containt).style.visibility = "hidden";
}
function SaveContaint(containt) {
    var elem = document.getElementsByClassName('a' + containt);
    var Product = JSON.stringify(     
            {
                'Id': elem[0].value, 'Name': elem[1].value, 'Site': { 'Id': site }
            }       
    );

    $.ajax({
        type: "POST",
        url: urlbase + "/api/Admin/GetEditFilter/" + site,
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
    elem[1].innerHTML = DataJson.Name;
    //"<input type='text' value='" + elem[i].innerHTML + "'  class='a" + containt + "'>";// class='" + containt + "'

    document.getElementById('g' + containt).style.visibility = "hidden";
    document.getElementById('e' + containt).style.visibility = "visible";

}
function PutData() {
    var strContent = "<table><thead><tr ><th>Id</th><th> Name</th></tr><tbody>";
    var i = 0;
    for (i; i < filname.length; i++) {

        strContent += "<tr>\
                    <td class='cl"+ filid[i] + "'>" + filid[i] + "</td>\
                    <td class='cl"+ filid[i] + "'>" + filname[i] + "</td>\
         <td><a onclick = \"EditContaint(\'cl"+ filid[i] + "\')\"  id='ecl" + filid[i] + "'>edit</a></td>\
         <td><a onclick = \"SaveContaint(\'cl"+ filid[i] + "\')\"  id='gcl" + filid[i] + "' style='visibility: hidden;'>save</a></td>\
                               </tr>";
    }

    document.getElementById("Containt").innerHTML = strContent + "</tbody></table>";
}