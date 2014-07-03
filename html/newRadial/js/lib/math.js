
define(function() {
        // do setup work
        var makeVec = function(x,y)
        {
        	return [x, y];
        };

        return {
        	lerp : function(x, y, t)
            {
                return x + t * (y-x);
            },

            // "Structs" for animation 
            Vector : function(x, y)
            {
            	return makeVec(x,y);
            }
        }
    }
);