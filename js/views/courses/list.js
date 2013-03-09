// Filename: views/courses/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above
  'collections/courses',
  'text!templates/courses/list.html'

], function($, _, Backbone, coursesCollection, coursesListTemplate){
  var projectListView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
      this.collection = coursesCollection;
      this.collection.bind("add", this.exampleBind);
     },
    exampleBind: function( model ){
      //console.log(model);
    },
    fetch: function(){
      $.ajax({
        url: "./json/courses.json",
        dataType: "json",
        async: false,
        context: this,
        success: 
          function(data){
            this.collection = data;
          },
        error: function(jqXHR, textStatus, errorThrown){
          alert("Error loading data!");
          console.log(errorThrown.message);
        }
      });
    },
    render: function(){
      this.fetch();
      var data = {
        terms: this.collection,
        _: _
      };
      console.log(data.terms);
      var compiledTemplate = _.template( coursesListTemplate, data );
      $("#page").html( compiledTemplate );
    }
  });
  return new projectListView;
});
