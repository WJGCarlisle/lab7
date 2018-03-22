/* When the user clicks on cancel 
navigate back to homepage */
$("#cancel").click(function(){
  var type = sessionStorage.getItem('type');
  if(type == 'B') {
  	window.location.href = "/homeB";
  } else {
  	window.location.href = "/home";
  }
});


/* set meeting place */
let vicinity = sessionStorage.getItem("vicinity");
let address = sessionStorage.getItem("address");
$("#meetingPlace").html("Meeting will be set at " + vicinity);

document.getElementById("vicinity").value = vicinity;
document.getElementById("address").value = address;

/* When the user clicks on add Meeting 
navigate back to homepage and pass values for new meeting */
$("#submitBtn").click(function(){
	sessionStorage.setItem('activeMeeting', 'true');
	let ten = document.getElementById("ten").checked;
	let five = document.getElementById("five").checked;
	let two = document.getElementById("two").checked;
	let friend = document.getElementById("friendName").value;
	
	sessionStorage.setItem('friendName', friend);
	sessionStorage.setItem('ten', 'false');
	sessionStorage.setItem('five', 'false');
	sessionStorage.setItem('two', 'false');

	console.log(ten);
	console.log(five);
	console.log(two);

	if(ten) {
		sessionStorage.setItem('ten', 'true');
	} else {
		sessionStorage.setItem('ten', 'false');
	}
	if(five) {
		sessionStorage.setItem('five', 'true');
	} else {
		sessionStorage.setItem('five', 'false');
	}
	if(two) {
		sessionStorage.setItem('two', 'true');
	} else {
		sessionStorage.setItem('two', 'false');
	}
});