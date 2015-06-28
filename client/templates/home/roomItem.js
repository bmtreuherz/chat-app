Template.roomItem.rendered = function(){
  Session.set('enterPassword', false);
};

Template.roomItem.helpers({
  isCreator: function(){
    return this.userId === Meteor.userId();
  },
  enterPassword: function(){
    return Session.get("enterPassword");
  }
});

Template.roomItem.events({
  'click .delete': function(e){
    e.preventDefault();
    Meteor.call('removeRoom', this._id);
  },
  'click .join' : function(e){
    e.preventDefault();

    if(Meteor.user()){
      var roomId = this._id;

      // if the room is private prompt the user to enter a password
      if(ChatRooms.findOne({_id: roomId}).private){
        Session.set('currentRoomId', roomId);
        Modal.show('password', ChatRooms.findOne({_id: roomId}));
      }else{
        Meteor.call('goToRoom', roomId);
      }
    }else{
      Modal.show('notLoggedIn');
    }
  }
});
