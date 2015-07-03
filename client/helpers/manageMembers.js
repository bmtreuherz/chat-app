
// ensures that the event is actually from the user leaving and not just the page reloading
var hotcodepush = false;

 Meteor._reload.onMigrate(function(){
   hotecodepush = true;
   return [true];
 })

// Removes the user from all chat rooms if they close the browser/ tab
 window.addEventListener('beforeunload', function(e){
       if(!hotcodepush) {
         Meteor.call('removeUser', Meteor.userId());
      }
})

// Periodically check the url to see what chat the user is in
window.setInterval(function(){
  Meteor.call('checkMembers', Router.current().url);
}, 700)
