var urlbase = "http://localhost:58933";

function getvalues(url) {
    var xhttp = new XMLHttpRequest();
  
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //var rep = this.responseText.split('|')[0].slice(1).replace(/\\/g, "");
             a = this.responseText.slice(1).replace(/\\/g, "").slice(0, -1);
          document.getElementById("Text").innerHTML = a; 
           
        } 
    };
    xhttp.open("GET", urlbase + url, true);
    xhttp.send();


}
