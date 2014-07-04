requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['jquery', /*'canvas',*/ 'app/sub', 'app/wedge', 'math', 'app/draw'],
function   ($,        /*canvas, */  sub, wedge, math, draw) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
	//alert("loaded");
	//alert(sub.color);
    var indices = [[0], [0,1,2], [0,1,2,3]];

    $.each(indices, function(index, value) {
      $.each(value, function(index2, value2) {
        draw.drawWedgeTile(index, value2);
      });
    });

});