define([
  'jquery',
  'underscore',
  'backbone',
  'models/courses'
], function($, _, Backbone, coursesModel){
  var coursesCollection = Backbone.Collection.extend({
    model: coursesModel,
    initialize: function(){

    }

  });

  return new coursesCollection;
});
