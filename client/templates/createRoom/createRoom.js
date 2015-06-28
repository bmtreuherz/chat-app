Template.createRoom.events({
  'submit form' : function(e){
    e.preventDefault();

    console.log(event);
    console.log($(e.target).find('[name=togglePrivate]').checked);

    var room={
      name: $(e.target).find('[name=name]').val(),
      private: e.currentTarget[1].checked,
      password: e.currentTarget[1].checked ? $(e.target).find('[name=password]').val() : ''
    };

    Meteor.call('createRoom', room, function(error, results){
      if(error){
        console.log(error);
      }

      //TODO: implement
      Router.go('chatRoom', {_id: results._id});
    });
  },
  'change #togglePrivate' : function(event){
    console.log(event);
    Session.set('isPrivate', event.target.checked);
  }
});

Template.createRoom.helpers({
  privateChat: function(){
    return Session.get("isPrivate");
  }
})
