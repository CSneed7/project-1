var config = {
	apiKey: "AIzaSyCe86ITNWWEhamRTJkhxa2McUv-_T89Z3M",
	authDomain: "project-1-f14c5.firebaseapp.com",
	databaseURL: "https://project-1-f14c5.firebaseio.com",
	projectId: "project-1-f14c5",
	storageBucket: "project-1-f14c5.appspot.com",
	messagingSenderId: "15054405766"
};
firebase.initializeApp(config);

var comicData = firebase.database();


function checkEbay(comicName, comicIndex) {
	//EBAY API

	var ebayqueryURL = "http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=BrandenH-MarvelSi-PRD-6668815a4-427e2463&siteid=0&version=967&QueryKeywords=" + encodeURIComponent(comicName) + "%20comic&%20books&AvailableItemsOnly=true&MaxEntries=10";
	console.log(ebayqueryURL);
	$.ajaxPrefilter(function (options) {
		if (options.crossDomain && jQuery.support.cors) {
			var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
			options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
			//options.url = "http://cors.corsproxy.io/url=" + options.url;
		}
	});
	$.ajax({
		url: ebayqueryURL,
		method: "GET",
	})
		.then(function (response) {
			var parseresponse = JSON.parse(response)

			var hotmess = (parseresponse.Product[0].DetailsURL);
			console.log(parseresponse);
			console.log(hotmess);
			//	if ($('a[href="' + hotmess + '"]').size == 0) {


			var ebayLink = $("<li>").html($('<a>').attr('target', '_blank').attr("href", hotmess).text(parseresponse.Product[0].Title));
			$("#hotmessdisplay").prepend(ebayLink);
			$(".link_" + comicIndex).prepend($('<a>').attr('target', '_blank').attr("href", hotmess).text(parseresponse.Product[0].Title))

			//	}
			// $("#hotmessdisplay").on("click", function () {
			// 	var href = $(this).find('a').attr('href');
			// });
			//
		});
}

$("#find-comic").on("click", function (event) {
	event.preventDefault();
	$("#comic-view").empty();
	$("#hotmessdisplay").empty();

	var comic = $("#comic-input").val().trim();

	// MARVEL API
	var ts = Date.now();
	var hash = $.md5(ts + "837f7995a45f86cea726f48f1acd876861485a6a" + "b6dc65d2bd49abd244836cf5eb355445")
	var queryURL = "https://gateway.marvel.com/v1/public/characters?name=" + comic + "&ts=" + ts + "&apikey=b6dc65d2bd49abd244836cf5eb355445&hash=" + hash + "&limit=10";
	$.ajax({
		url: queryURL,
		method: "GET"
	})
		.then(function (response) {
			console.log(queryURL);
			console.log(response);

			var output = response.data.results[0].comics.items;
			var extension = '.jpg';

			console.log(response.data.results[0].comics);

			var comicImage = $("<img>");

			comicImage.attr("src", response.data.results[0].thumbnail.path + extension).css({ 'width': '350px', 'height': '350px' });

			for (var i = 0; i < output.length; i++) {
				var comicDiv = $("<div>");
				var p = $("<p>").text("Comics: " + output[i].name);

				comicDiv.append(p);
				comicDiv.prepend(comicImage);

				$("#comic-view").prepend(comicDiv);

				checkEbay(output[i].name, i);

				// Firebase
				var comicCharacter = $("#comic-input").val().trim();
				var comicList = output[i].name.repeat(1);
				// var comicIndex = list;

				var newComic = {
					name: comicCharacter,
					list: comicList,
					comicIndex: i
				}

				comicData.ref().push(newComic);
			}
			comicData.ref().on("child_added", function (childSnapshot, prevChildKey) {
				console.log(childSnapshot.val());

				var comicC = childSnapshot.val().name;
				var comicL = childSnapshot.val().list;
				var comicE = childSnapshot.val().comicIndex;

				$("#comic-table > tbody").append("<tr><td>" + comicC + "</td><td>" + comicL + '</td><td class="link_' + comicE + '">' 
					+ "</td></tr>"); // + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
			})
		});

	//OMDB API
	var queryURL = "https://www.omdbapi.com/?t=" + comic + "&y=&plot=short&apikey=trilogy";
	$.ajax({
		url: queryURL,
		method: "GET"

	})
		.then(function (response) {
			console.log(response)
			var movieDiv = $("<div class='movie'>");
			var year = response.Year;
			var psix = $("<p>").text("Year: " + year);
			movieDiv.append(psix);
			var title = response.Title;
			var pfive = $("<p>").text("Title: " + title);
			movieDiv.append(pfive);
			var imbdrating = response.imdbRating;
			var pfour = $("<p>").text("IMDBRating: " + imbdrating);
			movieDiv.append(pfour);
			var rating = response.Rated;
			var pOne = $("<p>").text("Rating: " + rating);
			movieDiv.append(pOne);
			var released = response.Released;
			var pTwo = $("<p>").text("Released: " + released);
			movieDiv.append(pTwo);
			var plot = response.Plot;
			var pThree = $("<p>").text("Plot: " + plot);
			movieDiv.append(pThree);
			var imgURL = response.Poster;
			var image = $("<img>").attr("src", imgURL);
			movieDiv.append(image);
			$("#comic-view").append(movieDiv);

		});

});



