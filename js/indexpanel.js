
function getMenuPanel()
{
    document.getElementById("MenuPanel").innerHTML = "<h2><a href='/Panel/CurrentInvoice.html?u=" + u + "'>Current invoice</a></h2>\
    <h2> <a href='/Panel/Personnel.html?u=" + u + "''>Personnel</a></h2>\
    <h2> <a href='/Panel/Parameter.html?u="+ u + "''>Parameter</a></h2 > ";          
}
//getMenuPanel();