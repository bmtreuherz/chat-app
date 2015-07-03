/**
 * Created by bradley on 6/23/15.
 */
Template.home.helpers({
    noChats: function(){
      return ChatRooms.find({}).fetch().length == 0 ? true : false;
    }
});
