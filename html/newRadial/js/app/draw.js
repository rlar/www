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
		        // Tunables
		        var sHalfThetaRads = Math.PI/13;
		        var vOrigin = { x : -.175 * canvas.canvas.width , y : canvas.canvas.height / 2 }
		        var sArcRadius = -vOrigin.x + .6 * canvas.canvas.width;
		        
		        // "Consts"
		        var bClockwise = false;
		        var bIsLeftRadius = true;
		        var bIsTopTheta = true;

		        var leftRadius = wedge.sGetRingRadius(iRingIndex, bIsLeftRadius);
		        var rightRadius = wedge.sGetRingRadius(iRingIndex, !bIsLeftRadius);
		        var topLeftTheta = wedge.sGetRungTheta(iRingIndex, iRungIndex, leftRadius, bIsTopTheta);
		        var topRightTheta = wedge.sGetRungTheta(iRingIndex, iRungIndex, rightRadius, bIsTopTheta);
		        var bottomLeftTheta = wedge.sGetRungTheta(iRingIndex, iRungIndex, leftRadius, !bIsTopTheta);
		        var bottomRightTheta = wedge.sGetRungTheta(iRingIndex, iRungIndex, rightRadius, !bIsTopTheta);
				
				// left wedge
		        canvas.context.arc(wedge.vOrigin.x, wedge.vOrigin.y, leftRadius, bottomLeftTheta, topLeftTheta, !bClockwise)

		        // right wedge, implicitly connects top of two arcs
		        canvas.context.arc(wedge.vOrigin.x, wedge.vOrigin.y, rightRadius, topRightTheta, bottomRighetTheta, bClockwise);

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

		    // TODO ROB
		    /* when we draw the highlight, and are animating the highlight to another cell: consider moving from the top middle tile to the one below it
		    - orange highlight around the top middle wedge
		    - either: highlight breaks on the top straight segment, at its middle, and the orange lines run down each side to the slot below
		    - or:each arc/rounded line segment slips down to the next tile. the bottom higlight stays there, becomes the new top edge higlight.
				the final highlight either dissappears with the sides, or it runs from left to right out and slides left to right into the one below. could be rad.
		    - */
       }
    }
);

    function drawWedgeTileHighlight(iRingIndex, iRungIndex)
    {
        context.beginPath();

        // todo rob obviously replace this horrible cut and paste code, but its pre-vis!

        // --- Wedge ---
        // should be defined by: 
        var sHalfThetaRads = Math.PI/13;
        var vOrigin = { x : -.175 * canvas.width , y : canvas.height / 2 }
        var sArcRadius = -vOrigin.x + .6 * canvas.width;

        // "Consts"
        var bClockwise = false;
        var bIsLeftRadius = true;
        var bIsTopTheta = true;

        var leftRadius = Wedge.sGetRingRadius(iRingIndex, bIsLeftRadius)
        var rightRadius = Wedge.sGetRingRadius(iRingIndex, !bIsLeftRadius) 
        var topTheta = Wedge.sGetRungTheta(iRingIndex, iRungIndex, bIsTopTheta);
        var bottomTheta = Wedge.sGetRungTheta(iRingIndex, iRungIndex, !bIsTopTheta);
        // left wedge
        context.arc( Wedge.vOrigin.x, Wedge.vOrigin.y, leftRadius, bottomTheta, topTheta, !bClockwise)

        // right wedge, implicitly connects top of two arcs
        context.arc(Wedge.vOrigin.x, Wedge.vOrigin.y, rightRadius, topTheta, bottomTheta, bClockwise);

        // explicitly connects bottom of two arcs
        context.closePath();
        
        // fill
        //context.fillStyle="white";
        //context.fill();

         // Set line stroke props
        context.strokeStyle = "#FF6600";
        context.lineWidth   = 5;
        context.stroke();
    }


    function clearColour(colour)
    {
        context.fillStyle = colour;
        context.fillRect(0,0,canvas.width, canvas.height);
    }
