/**
 * Created by bradley on 6/23/15.
 */
Meteor.publish('chatRooms', function(){
  return ChatRooms.find({});
});
Meteor.publish('messages', function(chatId){
  check(chatId, String);
  return Messages.find({chatId: chatId});
});
Meteor.publish('singleRoom', function(id){
  check(id, String);
  return ChatRooms.find(id);
});
