Template.roomItem.helpers({
  isCreator: function(){
    return this.userId === Meteor.userId();
  }
});

Template.roomItem.events({
  'click .delete': function(e){
    e.preventDefault();
    Meteor.call('removeRoom', this._id);
  },
  'click .join' : function(e){
    e.preventDefault();

    var roomId = this._id;
    if(Meteor.user()){
      // make sure that the user isn't already a member of the room
      var exists = false;
      this.members.forEach(function(member){
        if (member._id == Meteor.userId())
          exists = true;
      });
      if(!exists){
        this.members.push(Meteor.user());
        // TODO: make this cleaner
        ChatRooms.update(roomId,{$set: {members: this.members}}, function(error){
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
    }else{
      //TODO: better error handling
      console.log("you need to log in");
    }
  }
});
