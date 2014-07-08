// wedge.js
// Essentially my layout calculator

define(['math'], function(math) 
{
    // Tunables
    var _nRings = 3;
    var _nRungsPerRing = [1, 3, 4]; // panels per vert wedge slice, like [rob], [projectSource1, projSrc2, projSrc3], [pName1, pName2, ..]
    var _vOrigin = { x : -.2 * canvas.width , y : canvas.height / 2 };
    var _sSideMargin = .03;
    var _sHalfThetaRads =  Math.PI/13;
    var _sArcRadiusLeft = -_vOrigin.x + canvas.width * _sSideMargin;
    var _sArcRadiusRight = -_vOrigin.x + canvas.width * (1-_sSideMargin);
    var _sCellMarginFixedHorz = .005 * canvas.width; // pixels
    var _sCellMarginFixedVert = .01 * canvas.height; // radians of arg length.. yeah sorry

     // todo: figure out how to calculate the usable text area in a wedge
    return {
        nRings: _nRings,
        nRungsPerRing: _nRungsPerRing, 

        vOrigin: _vOrigin,
        sSideMargin: _sSideMargin,
        sHalfThetaRads: _sHalfThetaRads,
        sArcRadiusLeft: _sArcRadiusLeft, 
        sArcRadiusRight: _sArcRadiusRight,
        sGetRingRadius: function (iRingIndex, bIsLeftRadius)
        {
            iRingIndex += bIsLeftRadius ? 0 : 1;
            var blend = (iRingIndex/_nRings);
            return math.lerp(_sArcRadiusLeft, _sArcRadiusRight, blend) + _sCellMarginFixedHorz * (bIsLeftRadius ? 1 : -1);
            // margin between wedge as pixels doesnt really work out, cause the blend is an angle.
            // can we.. offset the origin?? if we take the same angle, 
        },

        // Get TODO ROB DOC
        // radius is passed so we can do fixed margins. questionable if this should be here or in draw.js
        sGetRungTheta: function (iRingIndex, iRungIndex, radius, bIsTopTheta)
        {
            // so to accomplish fixed margins, we need to know the radius at which we want that arclength displacement.
            // this depends on which rung were on, how many rungs there are, etc, so we make the caller give us the radius.
            var fixedMargin = _sCellMarginFixedVert / radius; // fixed margins: theta = arcLength / radius

            // the bottom of the wedge is 1/n -th of theta downwards
            iRungIndex += bIsTopTheta ? 0 : 1;
            var blend = (iRungIndex / _nRungsPerRing[iRingIndex]);

            return math.lerp(-_sHalfThetaRads, _sHalfThetaRads, blend) + fixedMargin * (bIsTopTheta ? 1 : -1);
        },

        // Get a point relative to the origin of the wedge
        vGetPoint: function(theta, radius)
        {
            var x = (_vOrigin.x + Math.cos(theta) * radius);
            var y = (_vOrigin.y + Math.sin(theta) * radius);

            return math.Vector(x, y);;
        }
    }
});

// TODO someday
/* some kinda reflow work which will move the tile layout and resize automatically based on the resolution.*/