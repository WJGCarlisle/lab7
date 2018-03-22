//Version A
$("#SignIn").click(function(){
	var username = document.getElementById('SIusername').value;
	var password = document.getElementById('SIpassword').value;

	var found = 0;

	var users = document.getElementsByClassName("users");
      for( var i = 0; i < users.length; i++ ) {
        var passWORD = users[i].id;
        var userNAME = users[i].innerHTML;

        if((String(username) === String(userNAME)) && (String(password) == String(passWORD))) {
        	found = 1;
        }
    }

    //console.log(found);
    if(found == 1) {
    	sessionStorage.setItem('user', username);
      sessionStorage.setItem('type', 'A');
  		sessionStorage.setItem('profPic', 'https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg');
  		console.log('about to relocate');
 		window.location.href = "/home";
 	} else {
 		alert('Incorrect password for username or username does not exist!');
 	}
});

//Version B
$("#SignInB").click(function(){
  var username = document.getElementById('SIusername').value;
  var password = document.getElementById('SIpassword').value;

  var found = 0;

  var users = document.getElementsByClassName("users");
      for( var i = 0; i < users.length; i++ ) {
        var passWORD = users[i].id;
        var userNAME = users[i].innerHTML;

        if((String(username) === String(userNAME)) && (String(password) == String(passWORD))) {
          found = 1;
        }
    }

    //console.log(found);
    if(found == 1) {
      sessionStorage.setItem('user', username);
      sessionStorage.setItem('type', 'B');
      sessionStorage.setItem('profPic', 'https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg');
      console.log('about to relocate B');
    window.location.href = "/homeB";
  } else {
    alert('Incorrect password for username or username does not exist!');
  }
});

//version A
$("#GetStarted").click(function(){
	sessionStorage.setItem('user', document.getElementById('SUusername').value);
  	sessionStorage.setItem('profPic', 'https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg');
 	//window.location.href = "/home";
});


//version B
$("#GetStartedB").click(function(){
  sessionStorage.setItem('user', document.getElementById('SUusername').value);
    sessionStorage.setItem('profPic', 'https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg');
  //window.location.href = "/home";
});