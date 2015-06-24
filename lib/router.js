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
    template: 'home'
});