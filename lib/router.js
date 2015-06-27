/**
 * Created by bradley on 6/23/15.
 */
Router.configure({
    layoutTemplate: 'layout'
    /* TODO: add loading and 404 page
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
     */
});


Router.route('/', {
    name: 'home',
    template: 'home',
    waitOn: function(){
      return Meteor.subscribe('chatRooms')
    },
    data: function(){
      return{
        chatRooms: ChatRooms.find({})
      }
    }
});


Router.route('/createRoom', {
  name: 'createRoom',
  template: 'createRoom'
});

Router.route('/chatRoom/:_id'), {
  name: 'chatRoom',
  template: 'chatRoom',
  waitOn: function(){
    return Meteor.subscribe('messages', this.params._id)
  }
};
