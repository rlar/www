define([
  'jquery',
  'underscore',
  'backbone',
  'models/graphics'
], function($, _, Backbone, graphicsModel){
  var graphicsCollection = Backbone.Collection.extend({
    model: graphicsModel,
    initialize: function(){

    }

  });

  return new graphicsCollection;
});
