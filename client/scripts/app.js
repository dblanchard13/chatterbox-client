// YOUR CODE HERE:

var currentRoom;
var app = {};

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
app.fetch = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    //timeout: 1000,
    success: function (data) {
      app.clearMessages();
      console.log('Fetch from server successfully');
      console.log(data.results);
      var dataResult = data.results;

      for (var i = 0; i < data.results.length; i++) {
        if(data.results[i].roomname === currentRoom){
          app.addMessage(data.results[i]);
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
  $('#chats').append("<div><h4 class='username'>" + message.username + "</h4><p>" + message.text + "</p></div>");
}

app.addRoom = function(roomName) {
  $("#roomSelect").append("<option>" + roomName + "</option>");
}

$(document).ready(function(){

  $('#chats').delegate('.username', 'click', function(){
    app.addFriend();
  });


  $('#send .submit').submit(function() {
    console.log("submit");
    app.handleSubmit();
  });

  // $('form').delegate('#send .submit', 'submit', function(){
  //   alert("Submitted");
  //   app.handleSubmit();
  // });

  // submit refresh why?
  $("#roomSubmit").click(function() {
    var str = escape($('#roomName').val());
    app.addRoom(str);

    currentRoom = $('#roomName').val();

    $('#roomName').val('');
  });

  $('#roomSelect').change(function() {
    currentRoom = $('#roomSelect').val();
  });

});

app.addFriend = function() {
}

app.handleSubmit = function() {
  var content, username, room;
  content = $('#message').val();

  var message = {
    'username': 'DandE',
    'text': 'bamo',
    'roomname': 'cheese'
  };
  app.send(message);
}






