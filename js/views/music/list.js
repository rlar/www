// Filename: views/music/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above
  'collections/music',
  'text!templates/music/list.html'

], function($, _, Backbone, musicCollection, musicListTemplate){
  var projectListView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
      this.collection = musicCollection;
      this.collection.bind("add", this.exampleBind);
      
      // load this stuff from xml!!
      this.collection = musicCollection.add({ name: "Song1"});
      this.collection = musicCollection.add({ name: "Song2"});
      this.collection = musicCollection.add({ name: "Song3"});
    },
    exampleBind: function( model ){
      //console.log(model);
    },
    render: function(){
      var data = {
        songs: this.collection.models,
        _: _
      };
      var compiledTemplate = _.template( musicListTemplate, data );
      $("#page").html( compiledTemplate );
    }
  });
  return new projectListView;
});
