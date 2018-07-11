$("#find-comic").on("click", function (event) {
    $("#hotmessdisplay").empty();
    event.preventDefault();
    var comic = $("#searchTerm").val().trim();
    var queryURL = "http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=BrandenH-MarvelSi-PRD-6668815a4-427e2463&siteid=0&version=967&QueryKeywords=" + comic + "%20comic&AvailableItemsOnly=true&MaxEntries=10";

    $.ajaxPrefilter( function (options) {
        if (options.crossDomain && jQuery.support.cors) {
          var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
          options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
          //options.url = "http://cors.corsproxy.io/url=" + options.url;
        }
       });

    $.ajax({
        url: queryURL,
        method: "GET",
    
    
        
    })
        .then(function (response) {

            var parseresponse = JSON.parse(response)

           location.href = parseresponse.Product[1].DetailsURL;

           // var hotmess = $("<a href target='_blank'>").text(parseresponse.Product[1].DetailsURL);
            console.log(parseresponse);
            // $("#hotmessdisplay").prepend(hotmess);

          //  function myFunction() {

          //      document.getElementById("display").innerHTML = location.href;
                
           //     }

        });
    });