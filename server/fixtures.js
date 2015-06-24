/**
 * Created by bradley on 6/23/15.
 */

 if(ChatRooms.find().count() ===0){

   //create 2 users
   var bradleyId = Meteor.users.insert({
     profile: {username: 'BradleyT'}
   });
   var bradley = Meteor.users.findOne(bradleyId);

   var brianId = Meteor.users.insert({
     profile: {username: 'Brian'}
   });
   var brian = Meteor.users.findOne(brianId);

   ChatRooms.insert({
     name: 'Room 1',
     private: 0,
     userId: bradleyId,
     creator: bradley.profile.username,
     createdOn: new Date(),
     numberOfMembers: 1,
     members: []
   });

   ChatRooms.insert({
     name: 'Room 2',
     private: 0,
     userId: brianId,
     creator: brian.profile.username,
     createdOn: new Date(),
     numberOfMembers: 1,
     members: []
   });
 }
