function MeshBuilder(name){
	this.name = name;
	
	// properties for each vertex, beginning with position
    this.numItems = 0;
	this.vertices = [];
	this.colours = [];
	
	this.vertexBuffer;
	this.colourBuffer;
}


MeshBuilder.prototype.AddTri = function(bottomleft,topright) {

	this.vertices = this.vertices.concat(
		[
			0.0, 0.0, 0.0,
			2.0, 0.0, 0.0,
			2.0, 2.0, 0.0
		]
	);
	
	this.numItems += 3;
	
	this.colours = this.colours.concat(
	  [1.0, 0.0, 0.0, 1.0,
	   0.0, 1.0, 0.0, 1.0,
	   0.0, 0.0, 1.0, 1.0]
	);
}

// gl: WebGL context
MeshBuilder.prototype.Buffer = function(gl) {
	// positions
	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		
	// colours
	this.colourBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.colourBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colours), gl.STATIC_DRAW);
}