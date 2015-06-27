ChatRooms = new Mongo.Collection('chatRooms');

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
  }
});
