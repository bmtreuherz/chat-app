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
    return Messages.find({}).fetch();
  }
})
