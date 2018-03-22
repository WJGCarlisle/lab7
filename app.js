
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');

//A version
var home = require('./routes/home');
var meetingsCreated = require('./routes/meetingsCreated');
var meetingsJoined = require('./routes/meetingsJoined');
var friends = require('./routes/friends');
var addFriend = require('./routes/addFriend');
var addMeeting = require('./routes/addMeeting')
var signup = require('./routes/signup');
var logout = require('./routes/logout');
var deleteMeeting = require('./routes/deleteMeeting');
var createMeeting = require('./routes/createMeeting');
var createUser = require('./routes/createUser');

//B version
var homeB = require('./routes/homeB');
var friendsB = require('./routes/friendsB');
var addMeetingB = require('./routes/addMeetingB')
var meetingsCreatedB = require('./routes/meetingsCreatedB')
var addFriendB = require('./routes/addFriendB');
var signupB = require('./routes/signupB');
var logoutB = require('./routes/logoutB');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//A version
app.get('/', index.view);
app.get('/home', home.view);
app.get('/meetingsCreated', meetingsCreated.meetingsCreated);
app.get('/meetingsJoined', meetingsJoined.meetingsJoined);
app.get('/friends', friends.view);
app.get('/addFriend', addFriend.addFriend);
app.get('/addMeeting', addMeeting.addMeeting);
app.get('/signedup', signup.addUser);
app.get('/logout', logout.logout);
app.get('/deleteMeeting', deleteMeeting.delete);
app.get('/createMeeting', createMeeting.view);
app.get('/signup-page', createUser.view);

//B version
app.get('/viewAlt', index.viewAlt);
app.get('/homeB', homeB.view);
app.get('/friendsB', friendsB.view);
app.get('/addMeetingB', addMeetingB.addMeeting);
app.get('/meetingsCreatedJoinedB', meetingsCreatedB.meetingsCreated);
app.get('/addFriendB', addFriendB.addFriend);
app.get('/signedupB', signupB.addUser);
app.get('/logoutB', logoutB.logout);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});//.listen(process.env.PORT || app.get('port'));
