$(document).ready(function(){
    'use strict';
            //console.log("Hello from Web Part");
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "_api/search/query?querytext='ContentTypeId:0x010200C707C00C0A1627419D34C39123CE4EF900E5046E9586504846BDA4F0B35359434D'&enablestemming=false&selectproperties='Path%2cUrl%2cTitle%2cWrite%2cWorkId'&clienttype='ContentSearchRegular'",
      method: "GET",
      headers: { "Accept": "application/json; odata=verbose" },
      success: getEventsSuccess,
      error: getEventsError
    });
    console.log(_spPageContextInfo.webAbsoluteUrl);

    function getEventsSuccess(data, request) {
      var html = [];
      var results = data.d.results;
      console.log(data.d);
      console.log(results);
      console.log(data.d.results);

      var siteCollectionURL = SP.PageContextInfo.get_siteServerRelativeUrl();
      var siteURL = _spPageContextInfo.webServerRelativeUrl;
      $(document).ready(function() {
        function applyThisJquery() {
          $(".results-display").append(data.d.results);

        }

        setTimeout(applyThisJquery, 1000);

    });

// ------------------ Variables used for team members

      //var image =  "https://nam.delve.office.com/mt/v3/people/profileimage?size=L&userId=";
      // var image = "https://insulet.sharepoint.com/sites/IntranetDev/_layouts/userphoto.aspx?size=S&accountname=";
      // var mysite = "https://insulet-my.sharepoint.com/_layouts/15/me.aspx?p=";
      // var membersPage = siteURL + "/Pages/Members.aspx";
      // var icon = siteCollectionURL + "/Style%20Library/Insulet/Images/people.jpg";
      //

      // var eventTitle =
      // var eventRange =
      // var eventDescription =
      // var eventDate =
      // var eventPage = siteURL + "/HR/Lists/Calendar/DispForm.aspx?ID=";




      	for (var i = 0; i < results.length; i++) {
      		html.push("<div class='contact-item'><div class='contact-profile-image'><img src='" + image + results[i].Event.Title + "'></div>");
      		if(results[i].Event.Location){
      			html.push("<ul class='contact-profile-details'><li class='contact-name'><a href=\"#\" onclick=\"javascript:OpenInNewTab('"+mysite+results[i].InsuletTeamMember.EMail+"'); return false;\">" + results[i].InsuletTeamMember.Title + "</a></li>");
      		}
      		if(results[i].InsuletTeamMember.JobTitle){
      			html.push("<li class='contact-description'>" + results[i].InsuletTeamMember.JobTitle + "</li>");
      		}
      		if(results[i].InsuletTeamMember.EMail ){
      			html.push("<li class='contact-email'><a href='" + "mailto:" + results[i].InsuletTeamMember.EMail + "'>" + results[i].InsuletTeamMember.EMail + "</a></li>");
      		}
      		if(results[i].InsuletTeamMember.WorkPhone){
      			html.push("<li class=''>" + "Office Phone: " + results[i].InsuletTeamMember.WorkPhone + "</li>");
      		}
      			html.push("</ul>");
      					}
      				if(i = results.length){
      					html.push("<hr style='border: 0;height: 1px;background: #eee;'><div  class='AllLink'>View All</a></div>");


      }
      $('#OurTeam').append(html.join(''));

    }


    function getEventsError(error) {
//					alert("error");
      html.push("<div>Please refresh the page and try again</div>");
    }
});
