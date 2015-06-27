Template.roomItem.helpers({
  isCreator: function(){
    return this.userId === Meteor.userId();
  },
});

Template.roomItem.events({
  'click .delete': function(e){
    e.preventDefault();
    Meteor.call('removeRoom', this._id);
  }
});
