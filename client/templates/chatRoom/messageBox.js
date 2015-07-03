var numMessages = 0;

Template.messageBox.rendered = function(){
   $('#list').scrollTop( $('#list').prop("scrollHeight") );
}

Template.messageBox.events({
  'submit form': function(e){
    e.preventDefault();

    var message = {
      chatId: this._id,
      content: $(e.target).find('[name=send]').val()
    }

    Meteor.call('sendMessage', message, function(error){
      if(error){
        console.log(error)
      }
    })
    $(e.target).find('[name=send]').val('')
  }
})
Template.messageBox.helpers({
  messages: function(){
    return Messages.find({});
  },
  membersList: function(){
    var members = ChatRooms.findOne(this._id).members;
    var membersList = '';
    for(var i=0; i< members.length; i++){
      membersList += members[i].username;
      if(members[i+1])
        membersList += ', ';
    }
    return membersList;
  }
});


// make sure that the message box scrolls to show the most recent messages
window.setInterval(function(){
  if(Messages.find({}).count() > numMessages){
    $('#list').scrollTop( $('#list').prop("scrollHeight") );
    numMessages = Messages.find({}).count();
  }
}, 100)
