var $ = function(id){
	return document.getElementById(id);
}

 var getHTTPObject = function() {
	var xhr = false;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
} else if (window.ActiveXObject){
	try{
		xhr=new ActiveXObject ("Msxml2.XMLHTTP");
	}catch(e){
		try{
		    xhr=new ActiveXObject("Microsoft.XMLHTTP");
		}catch(e){
			xhr=false;
		}
	}
}
	return xhr;
}

var getWeatherURL = function(url){
	var request = getHTTPObject();
	if (request){
		request.onreadystatechange = function(){
			parseResponse(request);
		};
		request.open("GET", url, true);
		request.send(null);
	}
}

var parseResponse = function(request){
  if (request.readyState == 4)
	if(request.status == 200 || request.status ==304){
			console.log(request.responseXML);
			//Parse data from XML and add to webpage
			var xmlData = request.responseXML;
			
			if (xmlData != null) {
                    var city = xmlData.getElementsByTagName("name")[0].firstChild.nodeValue;
                    var country = xmlData.getElementsByTagName("country")[0].firstChild.nodeValue;
                    var longitude = xmlData.getElementsByTagName("location")[1].getAttribute("longitude");
                    var latitude = xmlData.getElementsByTagName("location")[1].getAttribute("latitude");
					var sunrise = xmlData.getElementsByTagName("sun")[0].getAttribute("rise");
					var sunset = xmlData.getElementsByTagName("sun")[0].getAttribute("set");
                    var week = xmlData.getElementsByTagName("forecast")[0].childNodes;
                    var table = "";
					
                    for (var i = 0; i < week.length; i++) {
                        var day = week[i].getAttribute("day");
                        var symbol = week[i].getElementsByTagName("symbol")[0].getAttribute("name");
                        var precipitation = week[i].getElementsByTagName("precipitation")[0].getAttribute("value");
                        var windDirection = week[i].getElementsByTagName("windDirection")[0].getAttribute("name");
                        var windSpeed = week[i].getElementsByTagName("windSpeed")[0].getAttribute("name");
                        var temperature = week[i].getElementsByTagName("temperature")[0].getAttribute("day");
                        var pressure = week[i].getElementsByTagName("pressure")[0].getAttribute("value");
                        var humidity = week[i].getElementsByTagName("humidity")[0].getAttribute("value");
                        var clouds = week[i].getElementsByTagName("clouds")[0].getAttribute("value");

                        table += "<tr>"
                        + "<td>" + day + "</td>"
                        + "<td>" + symbol + "</td>"
                        + "<td>" + precipitation + "</td>"
                        + "<td>" + windDirection + "</td>"
                        + "<td>" + windSpeed + "</td>"
                        + "<td>" + temperature + "</td>"
                        + "<td>" + pressure + "</td>"
                        + "<td>" + humidity + "</td>"
                        + "<td>" + clouds + "</td>"
                        + "</tr>";
                    }

                    document.getElementById("SearchResult").innerHTML = city;
                    document.getElementById("CountryData").innerHTML = country;
                    document.getElementById("LongitudeData").innerHTML = longitude;
                    document.getElementById("LatitudeData").innerHTML = latitude;
					document.getElementById("SunriseData").innerHTML = sunrise;
					document.getElementById("SunsetData").innerHTML = sunset;
                    document.getElementById("TableData").innerHTML = table;
			}
			
			// Set variables for chart
			var date0 = week[0].getAttribute("day");
			var date1 = week[1].getAttribute("day");
			var date2 = week[2].getAttribute("day");
			var date3 = week[3].getAttribute("day");
			var date4 = week[4].getAttribute("day");
			var date5 = week[5].getAttribute("day");
			var date6 = week[6].getAttribute("day");
			console.log(date0);
			
			var tempr0 = week[0].getElementsByTagName("temperature")[0].getAttribute("day");
			var tempr1 = week[1].getElementsByTagName("temperature")[0].getAttribute("day");
			var tempr2 = week[2].getElementsByTagName("temperature")[0].getAttribute("day");
			var tempr3 = week[3].getElementsByTagName("temperature")[0].getAttribute("day");
			var tempr4 = week[4].getElementsByTagName("temperature")[0].getAttribute("day");
			var tempr5 = week[5].getElementsByTagName("temperature")[0].getAttribute("day");
			var tempr6 = week[6].getElementsByTagName("temperature")[0].getAttribute("day");
			console.log(tempr0);
			
			var precip0 = week[0].getElementsByTagName("precipitation")[0].getAttribute("value");
			var precip1 = week[1].getElementsByTagName("precipitation")[0].getAttribute("value");
			var precip2 = week[2].getElementsByTagName("precipitation")[0].getAttribute("value");
			var precip3 = week[3].getElementsByTagName("precipitation")[0].getAttribute("value");
			var precip4 = week[4].getElementsByTagName("precipitation")[0].getAttribute("value");
			var precip5 = week[5].getElementsByTagName("precipitation")[0].getAttribute("value");
			var precip6 = week[6].getElementsByTagName("precipitation")[0].getAttribute("value");
			console.log(precip0);
			
			// Set the line chart
				var ctxLine = document.getElementById("lineChart").getContext('2d');
				var lineChart = new Chart(ctxLine, {
					type: 'line',
					data: {				        
						labels: [date0,date1,date2,date3,date4,date5,date6],
						options: {responsive: true},
						datasets: [
							{
								label: "Temperature,°C", 
								fill: false,
								lineTension: 0.3,
								// Legend background
								backgroundColor: "rgba(255,0,0,0.3)",
								// Legend border and graph
								borderColor: "rgba(255,0,0,0.3)",
								borderCapStyle: 'butt',
								borderDash: [],
								borderDashOffset: 0.0,
								borderJoinStyle: 'miter',
								pointBorderColor: "rgba(0,0,255,0.3)",
								pointBackgroundColor: "#fff",
								pointBorderWidth: 6,
								pointHoverRadius: 5,
								pointHoverBackgroundColor: "rgba(75,192,192,1)",
								pointHoverBorderColor: "rgba(220,220,220,1)",
								pointHoverBorderWidth: 2,
								pointRadius: 0,
								pointHitRadius: 10,
								data: [tempr0,tempr1,tempr2,tempr3,tempr4,tempr5,tempr6],
								spanGaps: false,
							}
							]
					}
				});	
				
				// Set the bar chart
				var ctxBar = document.getElementById("barChart").getContext('2d');
				var barChart = new Chart(ctxBar, {
					type: 'bar',
					data: {				        
						labels: [date0,date1,date2,date3,date4,date5,date6],
						options: {responsive: true},
						datasets: [
							{
								label: "Precipitation, mm",
								fill: false,
								lineTension: 0.3,
								backgroundColor: "rgba(0,255,0,0.2)",
								borderColor: "rgba(0,255,0,0.2)",
								borderCapStyle: 'butt',
								borderDash: [],
								borderDashOffset: 0.0,
								borderJoinStyle: 'miter',
								pointBorderColor: "rgba(0,255,0,0.2)",
								pointBackgroundColor: "#fff",
								pointBorderWidth: 6,
								pointHoverRadius: 5,
								pointHoverBackgroundColor: "rgba(75,192,192,1)",
								pointHoverBorderColor: "rgba(220,220,220,1)",
								pointHoverBorderWidth: 2,
								pointRadius: 0,
								pointHitRadius: 10,
								data: [precip0,precip1,precip2,precip3,precip4,precip5,precip6],
								spanGaps: false,
							}
							]
					}
				});	
	}
		
	  
}

window.onload = function(){

	$("searchButton").onclick = function() {
		var city = $("city").value;
		console.log(city);

	// Use the API key (AppID) you get when you register with openweather.org
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +city+ "&mode=xml&units=metric&cnt=7&appid=4eab6018b81a348f759960200ba4269a";
	getWeatherURL(url);
	}
   $("city").focus();
}
	  