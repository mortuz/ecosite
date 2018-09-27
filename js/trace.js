var urlbase = "http://localhost:58933";
function getTrace() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
           
         
           var strContent= "<table style='width:100%'>";
            var arrayList = respHttp.split('|');
            var DataJson; var i;
            for (i = 1; i < arrayList.length; i++) {
                var DataStr = arrayList[i];
                DataJson = JSON.parse(DataStr);

                strContent += "<tr><td>" + DataJson.Id + "</td><td>" + DataJson.Ip + "</td><td>" + DataJson.User.Id + "</td><td>" + DataJson.Date.toString() + "</td>"+
                    " <td> " + DataJson.Page + "</td > <td>" + DataJson.BackUrl + "</td> <td>" + DataJson.Localisation + "</td> </tr > ";
                   
            }
             var strContent =strContent + "</table>";
            document.getElementById("Trace").innerHTML = strContent;
        }
    };
    xhttp.open("GET", urlbase + "/api/Trace/GetTrace/"+site, true);
    xhttp.send();
}


getTrace();

document.write("<h2>Trace</h2><div id='Trace'>\
    </div >  ");