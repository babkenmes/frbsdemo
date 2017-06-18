(function(){
//   window.configs = {
//     apiKey: "AIzaSyCu153L_WHaKajrQjdlz7qFyIsxw4c2N64",
//     authDomain: "charlotte-eb580.firebaseapp.com",
//     databaseURL: "https://charlotte-eb580.firebaseio.com",
//     storageBucket: "charlotte-eb580.appspot.com",
//     messagingSenderId: "210753226044"
// };
// var http = new XMLHttpRequest();
// var url = "configs.json";

// http.open("GET", url, true);

// //Send the proper header information along with the request
// http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

// http.onreadystatechange = function() {
    // if(http.readyState == 4 && http.status == 200) {
        
        // window.configs = JSON.parse(http.responseText);
    // }
// }
// http.send();
	var data = JSON.parse(localStorage.getItem("ls.authorizationData"));
	window.configs = data.confData;
	console.log("confData", data.confData)
})()



