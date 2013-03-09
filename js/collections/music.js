define([
  'jquery',
  'underscore',
  'backbone',
  'models/music'
], function($, _, Backbone, musicModel){
  var musicCollection = Backbone.Collection.extend({
    model: musicModel,
    initialize: function(){

    }

  });

  return new musicCollection;
});
