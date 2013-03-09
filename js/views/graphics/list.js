// Filename: views/graphics/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above
  'collections/graphics',
  'text!templates/graphics/list.html'

], function($, _, Backbone, graphicsCollection, graphicsListTemplate){
  var projectListView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
      this.collection = graphicsCollection;
      this.collection.bind("add", this.exampleBind);
      
      // load this stuff from xml!!
      this.collection = graphicsCollection.add({ name: "Gfx1"});
      this.collection = graphicsCollection.add({ name: "Gfx2"});
      this.collection = graphicsCollection.add({ name: "Gfx3"});
    },
    exampleBind: function( model ){
      //console.log(model);
    },
    render: function(){
      var data = {
        graphics: this.collection.models,
        _: _
      };
      var compiledTemplate = _.template( graphicsListTemplate, data );
      $("#page").html( compiledTemplate );
    }
  });
  return new projectListView;
});
