Template.emptyList.helpers({
  loggedIn: function(){
    return Meteor.user() ? true : false;
  }
});
