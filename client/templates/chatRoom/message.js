// put the message on the right if it the current user's or left if it is somebody else
Handlebars.registerHelper('getPosition', function(message){
  if(message.userId == Meteor.userId()){
    return 'right';
  }else{
    return 'left';
  }
});
