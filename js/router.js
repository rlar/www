// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/main',
  'views/resume/main',
  'views/music/list',
  'views/graphics/list',
  'views/courses/list',
  'views/contact/main',
], function($, _, Backbone, mainHomeView, mainResumeView, musicListView, 
                            graphicsListView, coursesListView, mainContactView ){
  var AppRouter = Backbone.Router.extend({
    routes: {
      'resume': 'showResume',
      'music':    'showMusic',
      'graphics': 'showGraphics',
      'courses':  'showCourses',
      'contact':  'showContact',

      // Default
      '*actions': 'defaultAction'
    },
    showResume: function(){
      mainResumeView.render();
    },
    showMusic: function(){
      musicListView.render();
    },
    showGraphics: function(){
      graphicsListView.render();
    },
    showCourses: function(){
      coursesListView.render();
    },
    showContact: function(){
      mainContactView.render();
    },
    defaultAction: function(actions){
      mainHomeView.render();
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
