/**
 * Created by bradley on 6/23/15.
 */
Meteor.publish('chatRooms', function(){
  return ChatRooms.find({});
})
