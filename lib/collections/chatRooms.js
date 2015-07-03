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
      creator: user,
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
  removeUser: function(userId){
    var rooms = ChatRooms.find({}).fetch();
    for(var i=0; i< rooms.length; i++){
      for(j=0; j< rooms[i].members.length; j++){
        if(rooms[i].members[j]._id === userId){
          var members = rooms[i].members;
          members.splice(j, 1);
          ChatRooms.update(rooms[i]._id, {$set: {members: members}}, function(errors){
            if(errors){
              console.log(errors);
            }
          });
          ChatRooms.update(rooms[i]._id, {$inc: {numberOfMembers: -1}}, function(errors){
            if(errors)
              console.log(errors);
          });
        }
      }
    }
  },
  checkMembers: function(url){
    var rooms = ChatRooms.find({}).fetch();
    for(var i=0; i< rooms.length; i++){
      // user is currently in this room
      if(url.indexOf(rooms[i]._id) != -1){
        var members = rooms[i].members;
        var exists = false;
        members.forEach(function(member){
          if (member._id == Meteor.userId())
            exists = true;
        });
        if(!exists){
          members.push(Meteor.user());
          // TODO: make this cleaner
          ChatRooms.update(rooms[i]._id,{$set: {members: members}}, function(error){
            if(error){
              console.log(error);
            }
          });
          ChatRooms.update(rooms[i]._id,{$inc: {numberOfMembers: 1}}, function(error){
            if(error){
              console.log(error);
            }
          });
        }
      }else{
        // user is not in this room
        for(j=0; j< rooms[i].members.length; j++){
          if(rooms[i].members[j]._id === Meteor.userId()){
            var members = rooms[i].members;
            members.splice(j, 1);
            ChatRooms.update(rooms[i]._id, {$set: {members: members}}, function(errors){
              if(errors){
                console.log(errors);
              }
            });
            ChatRooms.update(rooms[i]._id, {$inc: {numberOfMembers: -1}}, function(errors){
              if(errors)
                console.log(errors);
            });
          }
        }
      }
    }
  }
});
