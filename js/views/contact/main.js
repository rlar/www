// Filename: views/contact/main
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/contact/main.html'
], function($, _, Backbone, contactTemplate){
  var userListView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
    },
    render: function(){
      var data = {};
      var compiledTemplate = _.template( contactTemplate, data );
      this.el.html( compiledTemplate );
    }
  });
  return new userListView;
});
