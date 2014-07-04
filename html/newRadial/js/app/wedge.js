
define(['math'], function(math) 
{
    var _nRings = 3;
    var _nRungsPerRing = [1, 3, 4]; // panels per vert wedge slice, like [rob], [projectSource1, projSrc2, projSrc3], [pName1, pName2, ..]
    var _vOrigin = { x : -.175 * canvas.width , y : canvas.height / 2 };
    var _sSideMargin = .03;
    var _sHalfThetaRads =  Math.PI/14;
    var _sCellMargin = 0;
    var _sCellMarginFixedHorz = 10;
    var _sCellMarginFixedVert = .0086;
    var _sArcRadiusLeft = -_vOrigin.x + canvas.width * _sSideMargin;
    var _sArcRadiusRight = -_vOrigin.x + canvas.width * (1-_sSideMargin);

    var vec = new math.Vector(1,2);

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
            var blend = (iRingIndex/_nRings) + (_sCellMargin * (bIsLeftRadius ? 1 : -1));
            return math.lerp(_sArcRadiusLeft, _sArcRadiusRight, blend) + _sCellMarginFixedHorz * (bIsLeftRadius ? 1 : -1);
        },
        sGetRungTheta: function (iRingIndex, iRungIndex, bIsTopTheta)
        {
            iRungIndex += bIsTopTheta ? 0 : 1;
            var blend = (iRungIndex / _nRungsPerRing[iRingIndex]) + (_sCellMargin * (bIsTopTheta ? 1 : -1));
            return math.lerp(-_sHalfThetaRads, _sHalfThetaRads, blend) + _sCellMarginFixedVert * (bIsTopTheta ? 1 : -1);
        },
        vGetPoint: function(theta, radius)
        {
            var x = (_vOrigin.x + Math.cos(theta) * radius);
            var y = (_vOrigin.y + Math.sin(theta) * radius);

            return math.Vector(x, y);;
        }
    }
/*
    // Tunables - params for the size and shape of the wedge
    var _nRings = 3;
    var _nRungsPerRing = [1, 3, 4]; // panels per vert wedge slice, like [rob], [projectSource1, projSrc2, projSrc3], [pName1, pName2, ..]
    var _vOrigin = { x : -.175 * canvas.width , y : canvas.height / 2 };
    var _sSideMargin = .03;
    var _sHalfThetaRads =  Math.PI/14;
    var _sCellMargin = 0;
    var _sCellMarginFixedHorz = 10;
    var _sCellMarginFixedVert = .0086;
    return
    {
        nRings: _nRings,
        nRungsPerRing: _nRungsPerRing, 

        vOrigin: _vOrigin,
        sSideMargin: _sSideMargin,
        sHalfThetaRads: _sHalfThetaRads,
        sArcRadiusLeft: -_vOrigin.x + canvas.width * _sSideMargin, 
        sArcRadiusRight: -_vOrigin.x + canvas.width * (1-_sSideMargin),
        sGetRingRadius: function (iRingIndex, bIsLeftRadius)
        {
            iRingIndex += bIsLeftRadius ? 0 : 1;
            var blend = (iRingIndex/nRings) + (_sCellMargin * (bIsLeftRadius ? 1 : -1));
            return lerp(Wedge.sArcRadiusLeft, Wedge.sArcRadiusRight, blend) + _sCellMarginFixedHorz * (bIsLeftRadius ? 1 : -1);
        },
        sGetRungTheta: function (iRingIndex, iRungIndex, bIsTopTheta)
        {
            iRungIndex += bIsTopTheta ? 0 : 1;
            var blend = (iRungIndex / nRungsPerRing[iRingIndex]) + (_sCellMargin * (bIsTopTheta ? 1 : -1));
            return lerp(-Wedge.sHalfThetaRads, Wedge.sHalfThetaRads, blend) + _sCellMarginFixedVert * (bIsTopTheta ? 1 : -1);
        },
        vGetPoint: function(theta, radius)
        {
            // TODO ROB i must get a vector class in this project before effing with particle systems. this function i even dont like
            return 
            {
                x : Wedge.vOrigin.x + Math.cos(theta) * radius, 
                y : Wedge.vOrigin.y + Math.sin(theta) * radius
            };
        }
    }*/
});

/*
    // Wedge division props
    // picture this like a spreadsheet, with vertically merged cells, in polar coordinates.
    var nRings = 3;
    var nRungsPerRing = [1, 3, 4]; // [rob], [projectSource1, projSrc2, projSrc3], [pName1, pName2, ..]
    
    function lerp(x, y, t)
    {
        return x + t * (y-x);
    }

    // Wedge tunables
    // todo: figure out how to calculate the usable text area in a wedge
	var Wedge;
    function initWedge()
    {
        

        Wedge = 
        
    }*/