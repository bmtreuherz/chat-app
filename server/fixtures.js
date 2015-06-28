/**
 * Created by bradley on 6/23/15.
 */

 if(ChatRooms.find().count() ===0){

   //create 2 users
   var bradleyId = Meteor.users.insert({
     profile: {},
     username: 'Brad'
   });
   var bradley = Meteor.users.findOne(bradleyId);

   var brianId = Meteor.users.insert({
     profile: {},
     username: 'Brian'
   });
   var brian = Meteor.users.findOne(brianId);

   var room1Id = ChatRooms.insert({
     name: 'Room 1',
     private: false,
     password: '',
     userId: bradleyId,
     creator: bradley.profile.username,
     createdOn: new Date(),
     numberOfMembers: 1,
     members: [bradley]
   });

   ChatRooms.insert({
     name: 'Room 2',
     private: true,
     password: 'poop',
     userId: brianId,
     creator: brian.profile.username,
     createdOn: new Date(),
     numberOfMembers: 1,
     members: [brian]
   });

   Messages.insert({
     chatId: room1Id,
     content: "Here is a message from Bradley",
     userId: bradleyId,
     username: bradley.profile.username,
     time: new Date(now - 3 * 3600 * 1000)
   });
   Messages.insert({
     chatId: room1Id,
     content: "Here another message from Bradley",
     userId: bradleyId,
     username: bradley.profile.username,
     time: new Date(now - 3 * 3600 * 1000)
   });
   Messages.insert({
     chatId: room1Id,
     content: "And another from Bradley",
     userId: bradleyId,
     username: bradley.profile.username,
     time: new Date(now - 3 * 3600 * 1000)
   });
 }
