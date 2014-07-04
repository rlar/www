// todo rob can we isolate canvas to the draw module for later? nicer than using canvas.canvas
define(['canvas', 'app/wedge'], function(canvas, wedge) 
{
	var prop = wedge.nRings;

	// do setup work
        return {
            color: "prop: " + prop,
            size: "large",

            // Rings like a tree trunk, rungs like a ladder. x and y indices.
    		drawWedgeTile: function(iRingIndex, iRungIndex, sOpacity)
    		{
		        canvas.context.beginPath();

		        // --- Wedge ---
		        // should be defined by: 
		        var sHalfThetaRads = Math.PI/13;
		        var vOrigin = { x : -.175 * canvas.canvas.width , y : canvas.canvas.height / 2 }
		        var sArcRadius = -vOrigin.x + .6 * canvas.canvas.width;

		        // "Consts"
		        var bClockwise = false;
		        var bIsLeftRadius = true;
		        var bIsTopTheta = true;

		        var leftRadius = wedge.sGetRingRadius(iRingIndex, bIsLeftRadius)
		        var rightRadius = wedge.sGetRingRadius(iRingIndex, !bIsLeftRadius) 
		        var topTheta = wedge.sGetRungTheta(iRingIndex, iRungIndex, bIsTopTheta);
		        var bottomTheta = wedge.sGetRungTheta(iRingIndex, iRungIndex, !bIsTopTheta);
				// left wedge
		        canvas.context.arc(wedge.vOrigin.x, wedge.vOrigin.y, leftRadius, bottomTheta, topTheta, !bClockwise)

		        // right wedge, implicitly connects top of two arcs
		        canvas.context.arc(wedge.vOrigin.x, wedge.vOrigin.y, rightRadius, topTheta, bottomTheta, bClockwise);

				// explicitly connects bottom of two arcs
		        canvas.context.closePath();
				
				// fill
		        canvas.context.fillStyle="white";
		        canvas.context.fill();

		         // Set line stroke props
		        canvas.context.strokeStyle = "#00ff00";
		        canvas.context.lineWidth   = 5;
		     //   canvas.context.stroke();
		    }
        }
    }
);