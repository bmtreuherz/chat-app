ChatRooms = new Mongo.Collection('chatRooms');

ChatRooms.allow({
  update: function(){
    return true;
  }
});

Meteor.methods({
  createRoom: function(attributes){
    // checks
    check(Meteor.userId(), String);
    check(attributes, {
      name: String,
      private: Boolean,
      password: String
    });

    var roomWithSameName = ChatRooms.findOne({name: attributes.name});
    if(roomWithSameName){
      // TODO: inform user of this with errors
      return;
    }

    var user = Meteor.user();

    var room = _.extend(attributes, {
      userId: user._id,
      creator: user.username,
      createdOn: new Date(),
      numberOfMembers: 1,
      members: [user]
    });

    var roomId = ChatRooms.insert(room);
    return {
      _id: roomId
    }
  },
  removeRoom: function(id){
    //TODO: make this more secure
    ChatRooms.remove(id);
  },
  goToRoom: function(roomId){

    members = ChatRooms.findOne({_id: roomId}).members;
    // make sure that the user isn't already a member of the room
    var exists = false;
    members.forEach(function(member){
      if (member._id == Meteor.userId())
        exists = true;
    });
    if(!exists){
      members.push(Meteor.user());
      // TODO: make this cleaner
      ChatRooms.update(roomId,{$set: {members: members}}, function(error){
        if(error){
          console.log(error);
        }
        ChatRooms.update(roomId,{$inc: {numberOfMembers: 1}}, function(error){
          if(error){
            console.log(error);
          }
        });
      });
    }
    Router.go('chatRoom', {_id: roomId});
  }
});
