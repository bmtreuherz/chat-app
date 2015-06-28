Handlebars.registerHelper('getPosition', function(message){
  if(message.userId == Meteor.userId()){
    return 'right';
  }else{
    return 'left';
  }
});
