$(document).ready(function(){
   console.log("********");
   var getter = $.ajax({
     url: "http://denver.craigslist.org/search/sss?format=rss&query=free",
     method: "GET",
     dataType: "xml"
   });

   getter.done(function(xml){
     $(xml).find("item").each(function(){
       console.log("boooooo");
       //- $(#puttcraigslistshithere).append('<h3>' + $(this).find("link").text() + '</h3>');
       //- $(#puttcraigslistshithere).append('<div class="item"><h3>' + $(this).find("title").text() + '</h3><p><a href="' + $(this).find("link").text() + '">Check out this thing on Craigslist</a></p><p>' + $(this).find("description").text() + '</p></div>');
     });
   });

});
