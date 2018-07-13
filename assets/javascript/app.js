$("#find-comic").on("click", function (event) {

	event.preventDefault();
	var comic = $("#comic-input").val().trim();
	var queryURL = "http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=XML&appid=BrandenH-MarvelSi-PRD-6668815a4-427e2463&siteid=0&version=967&QueryKeywords=" + comic + "%20comic&AvailableItemsOnly=true&MaxEntries=10";

	$.ajax({
		url: queryURL,
		method: "GET",
		dataType: "jsonp",
		crossDomain: true,
		jsonp: "false",
		jsonpCallback: "callback"
	})
		.then(function (callback) {

		});
	console.log(queryURL);
});