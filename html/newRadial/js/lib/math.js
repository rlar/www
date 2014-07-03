
define(function() {
        // do setup work
        return {
        	lerp : function(x, y, t)
            {
                return x + t * (y-x);
            }
        }
    }
);