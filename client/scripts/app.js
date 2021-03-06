// YOUR CODE HERE:

var currentRoom, currentUser;
var app = {};
var friends = {};
var currentClicking;

app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function(){

};

app.send = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};


// whether take arguments
app.fetch = function(){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: {order: '-createdAt'},
    contentType: 'application/json',
    //timeout: 1000,
    success: function (data) {
      if (currentRoom) {
        app.clearMessages();
        console.log('Fetch from server successfully');
        var dataResult = data.results;

        for (var i = 0; i < data.results.length; i++) {
          if(data.results[i].roomname === currentRoom){
            app.addMessage(data.results[i]);
          }
        }
      }
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message');
    }
  });
};

app.clearMessages = function() {
  $("#chats").empty();
};

//maybe need use send somewhere
app.addMessage = function(message) {
  //this.send(message);
  if (friends[currentUser][message.username]) {
     $('#chats').append("<div><h4 class='username'>" + message.username + "</h4><p><b>" + escape(message.text) + "</b></p></div>");
  } else {
    $('#chats').append("<div><h4 class='username'>" + message.username + "</h4><p>" + escape(message.text) + "</p></div>");
  }
}

app.addRoom = function(roomName) {
  $("#roomSelect").append("<option>" + roomName + "</option>");
}

$(document).ready(function(){
  //location.search
  currentUser = window.location.search.slice(10);
  $("#userSelect").append("<option>" + currentUser + "</option>");
  friends[currentUser] = {};

  $('#chats').delegate('.username', 'click', function(){
    currentClicking = $(this).text();
    app.addFriend();
  });


  // $('#send .submit').submit(function(e) {
  //   e.preventDefault();
  //   console.log("submit");
  //   app.handleSubmit();
  // });

  // $('form').delegate('#send .submit', 'submit', function(){
  //   alert("Submitted");
  //   app.handleSubmit();
  // });

  // submit refresh why?
  $("#roomSubmit").click(function() {
    var str = escape($('#roomName').val());
    app.addRoom(str);
    currentRoom = str;
    $('#roomName').val('');
  });

  $('#roomSelect').change(function() {
    currentRoom = $('#roomSelect').val();
  });

  $('#enter').click(function() {
    app.handleSubmit();
    app.fetch();
  });

  $('#userSubmit').click(function(){
    var str = escape($('#userName').val());
    $("#userSelect").append("<option>" + str + "</option>");
    currentUser = str;
    friends[str] = {};
    $('#userName').val('');
  })

  setInterval(app.fetch, 500);
});

app.addFriend = function() {
  friends[currentUser][currentClicking] = true;
  app.fetch();
}

app.handleSubmit = function() {
  var content, username, room;
  content = escape($('#message').val());
  room = currentRoom;
  //user = currentUser;

  var message = {
    'username': currentUser,
    'text': content,
    'roomname': room
  };

  $('#message').val("");

  app.send(message);
}






