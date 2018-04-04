var xmlhttp = new XMLHttpRequest();
var url = "../json/tramstops.json";
var tramstops;
var keyword = [];

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
        var myObject = JSON.parse(this.responseText);
      	tramstops = myObject["stops"]
      	// console.log("success");
      	for (var i = 0; i < tramstops.length; i++) {
  			keyword.push({ value: tramstops[i]["stop_name"] });
  			// console.log(keyword);
  	}
  }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

  // Setup autocomplete function pulling from keyword array
$('#autocomplete').autocomplete({
    lookup: keyword,
});
