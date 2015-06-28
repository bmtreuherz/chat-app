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
  }
})

window.setInterval(function(){
  if(Messages.find({}).count() > numMessages){
    $('#list').scrollTop( $('#list').prop("scrollHeight") );
    numMessages = Messages.find({}).count();
  }

}, 100)
