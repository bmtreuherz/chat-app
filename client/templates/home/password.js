Template.password.rendered = function(){
  Session.set('incorrectPassword', false);
}

Template.password.events({
  'submit form': function(e){
    e.preventDefault();
    var roomId = Session.get('currentRoomId');
    var correctPassword = ChatRooms.findOne({_id: roomId}).password;
    if($(e.target).find('[name=password]').val() === correctPassword){
      Meteor.call('goToRoom', roomId);
      Modal.hide();
    }else{
      Session.set('incorrectPassword', true);
      $(e.target).find('[name=password]').blur();
    }
  },
  'focus input': function(){
    Session.set('incorrectPassword', false);
  }
})

Template.password.helpers({
  incorrectPassword: function(){
    return Session.get('incorrectPassword');
  }
})
