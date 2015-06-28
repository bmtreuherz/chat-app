Messages = new Mongo.Collection('messages');


Messages.allow({
  update: function(){
    return true;
  }
});

Meteor.methods({
  sendMessage: function(attributes){
    // checks
    check(Meteor.userId(), String);
    check(attributes, {
      content: String,
      chatId: String,
    });

    var user = Meteor.user();

    var message = _.extend(attributes, {
      userId: user._id,
      username: user.username,
      time: new Date().toTimeString().split(" ")[0]
    });

    var roomId = Messages.insert(message);
    return {
      _id: roomId
    }
  }
});
