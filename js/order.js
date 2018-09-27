function onLoad() {
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

function getOrder() {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
            respHttp = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);

            var DataJson = JSON.parse(respHttp);

            window.location.replace("/Home/Invoice.html?i=" + DataJson.Id+"&u=" +u);
        }
    };
    var Adress = document.getElementById("Adress").value.split('.').join('=');
    var Adress2 = document.getElementById("Adress2").value.split('.').join('=');
    var Zip = document.getElementById("Zip").value.split('.').join('=');
    var Town = document.getElementById("Town").value.split('.').join('=');
    var Country = document.getElementById("Country").value.split('.').join('=');

    xhttp.open("GET", urlbase + "/api/Order/GetAddOrder/" + Adress + "|" + Adress2 + "|" + Zip + "|" + Town + "|" + Country + "|" + u + "|"+site, true);
    xhttp.send();
}
function ChangeAddress1() {
    document.getElementById("AdressOrder1").style.visibility = "visible";
    document.getElementById("AdressOrder2").style.visibility = "hidden";

}
function ChangeAddress2() {
    document.getElementById("AdressOrder2").style.visibility = "visible";
    document.getElementById("AdressOrder1").style.visibility = "hidden";
}



//document.write("<h2>Order</h2>\
//    <input type = 'radio' name = 'rdaddress' value = '1' onchange='ChangeAddress1();' checked >  Adress same of current client < br >\
//    <input type = 'radio' name = 'rdaddress' value = '2' onchange='ChangeAddress2();' > Diffrent Adress  of current client < br >\
//    <div id = 'AdressOrder1' >the adress of order it s sa;e of your adress client</div > <div id='AdressOrder2'>\
//   <table><tr><td>Adress </td><td><input id='Adress' type='text' /></td></tr>\
//    <tr> <td>Adress 2</td> <td><input id='Adress2' type='text' /></td></tr >\
//     <tr> <td>Zip</td> <td><input id='Zip' type='text' /></td></tr >\
//     <tr> <td>Town</td> <td><input id='Town' type='text' /></td></tr >\
//     <tr> <td>Country</td> <td><input id='Country' type='text' /></td></tr >\
//     <tr> <td></td> <td></td></tr ></table>\
// </div> <input name='btOrder' value='Order' onclick='getOrder()' type='submit' /> ");
window.onload = function () {
    onLoad();

        if (document.getElementsByName("rdaddress").value == "0") {
            document.getElementById("AdressOrder2").style.visibility = "visible";
            document.getElementById("AdressOrder1").style.visibility = "hidden";

        }
        else {
            document.getElementById("AdressOrder2").style.visibility = "hidden";
            document.getElementById("AdressOrder1").style.visibility = "visible";

        }

     };


