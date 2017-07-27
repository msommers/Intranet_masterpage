
var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var jobDetails = [];
var searchURL = "https://api.icims.com/customers/7132/search/jobs?staleness=0&searchJson=%7B%22filters%22%3A%5B%7B%22name%22%3A%22job.folder%22%2C%22value%22%3A%5B%22D31001%22%5D%2C%22operator%22%3A%22%3D%22%7D%2C%7B%22name%22%3A%22job.jobpost.type%22%2C%22value%22%3A%5B%223%22%5D%2C%22operator%22%3A%22%3D%22%7D%2C%7B%22name%22%3A%22job.jobpost.isposted%22%2C%22value%22%3A%5B%22Yes%22%5D%2C%22operator%22%3A%22%3D%22%7D%2C%7B%22name%22%3A%22job.jobpost.status%22%2C%22value%22%3A%5B%221%22%5D%2C%22operator%22%3A%22%3D%22%7D%2C%7B%22name%22%3A%22job.customfield2005.text%22%2C%22value%22%3A%5B%22Yes%22%5D%2C%22operator%22%3A%22%3D%22%7D%5D%2C%22operator%22%3A%22%26%22%7D";
/************************************************Data Retrieval *********************************************************/
function getData(url){
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            resolve(data);
          } else {
            reject(Error(xhr.statusText));
          }
        }
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Access-Control-Allow-Origin","*");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.setRequestHeader("Authorization", "Basic aW50ZXJuYWxqb2JhcGk6e2VMNycheUY3OGYm");
          // Handle network errors
        xhr.onerror = function() {
          reject(Error("Network Error"));
        };
        xhr.send(null);
      });
}
/************************************************End Data Retrieval*****************************************************/

/************************************************UI Builder************************************************************/
function uiBuilder(jobDetails){
  var html="";
  var location="Billerica";
  for (var i = 0; i < jobDetails.length; i++) {
        html += "<p class='hot-job-title'>"+jobDetails[i].jobtitle+"<br/> <span class='hot-job-details'>" + location + " - Posted "+ jobDetails[i].updateddate+"</span></p>"
      }
   $('#loadingmessage').hide(); // hide the loading message
  document.getElementById("result").innerHTML=html;
}
/************************************************End UI Builder********************************************************/

/************************************************Entry Point***********************************************************/
getData(searchURL)
.then(function(response) {
      for (var i = 0; i < response.searchResults.length; i++) {
          getData(response.searchResults[i].self + "?fields=jobtitle,joblocation,updateddate")
          .then(function(jobData){jobDetails.push(jobData);})
      }
    });
setTimeout(function(){uiBuilder(jobDetails);},1000);
