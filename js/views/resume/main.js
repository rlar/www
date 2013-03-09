// Filename: views/resume/main
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/resume/main.html'
], function($, _, Backbone, resumeTemplate){
  var userListView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
    },
    render: function(){
      var data = {};
      var compiledTemplate = _.template( resumeTemplate, data );
      this.el.html( compiledTemplate );
    }
  });
  return new userListView;
});
