// YOUR CODE HERE:

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
    success: function (data) {
      console.log('Fetch from server successfully');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.clearMessages = function() {
  $("#chats").empty();
};

//maybe need use send somewhere
app.addMessage = function(message) {
  //this.send(message);
  $('#chats').append("<p>" + message.text + "</p>");
}

app.addRoom = function(roomName) {
  $("#roomSelect").append("<p>" + roomName + "</p>");
}
