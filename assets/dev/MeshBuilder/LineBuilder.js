function LineBuilder(name){
	this.name = name;
	
	// properties for each vertex, beginning with position
    this.numItems = 0;
	this.vertices = [];
	this.colours = [];
	this.indices = [];
	
	this.vertexBuffer;
	this.colourBuffer;
	this.indexBuffer;
}

// builds a line segment from two points
// vCoords[2]: array of two vector3 objects
LineBuilder.prototype.AddSegment = function(vCoords) {

	// Build a line from two vertices
	for (var i = 0; i < 2; i++)
		for (var j = 0; j < 3; j++)
			this.vertices = this.vertices.concat( vCoords[i][j] );
	
	this.colours = this.colours.concat(
	  [1.0, 1.0, 1.0, 1.0,
	   1.0, 1.0, 1.0, 1.0]
	);
	
	// numItems contains the index just past the OLD end of the vertex array,
	// i.e. the first of the two vertices we just added
	this.indices = this.indices.concat( this.numItems );
	this.indices = this.indices.concat( this.numItems+1 );
	this.numItems += 2;
}

// gl: WebGL context
LineBuilder.prototype.Buffer = function(gl) {
//var idx = new Uint16Array([0, 1]);
//		var ibuf = gl.initBuffer(gl.ELEMENT_ARRAY_BUFFER, idx);
	this.indexBuffer = gl.initBuffer(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices));
	this.vertexBuffer = gl.initBuffer(gl.ARRAY_BUFFER, new Float32Array(this.vertices));	
	this.colourBuffer = gl.initBuffer(gl.ARRAY_BUFFER, new Float32Array(this.colours));    
}

//	var idx = new Uint16Array([0, 1]);
//		var ibuf = gl.initBuffer(gl.ELEMENT_ARRAY_BUFFER, idx);
		