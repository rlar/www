function MeshBuilder(name){
	this.name = name;
	
	// properties for each vertex, beginning with position
    this.numItems = 0;
	this.vertices = [];
	this.colours = [];
	
	this.vertexBuffer;
	this.colourBuffer;
}

// Builds a post from the given parameters
// vLocation is bottom left corner
// vScale is width, height, depth
// vTilt is xTilt, yaw, zTilt // todo implement with the new gl lib?
MeshBuilder.prototype.AddFencePost = function(vLocation,vScale) {

	// Declare builder brush vertices
	postVertices = ( 
			[ [0.0, 0.0, 0.0], 
			  [0.0, 1.0, 0.0],
			  [1.0, 1.0, 0.0], 			  
			  [1.0, 0.0, 0.0],
			  [0.0, 0.0, 1.0], 
			  [0.0, 1.0, 1.0],
			  [1.0, 1.0, 1.0], 			  
			  [1.0, 0.0, 1.0]]);
		
	// Apply scale
	for (var i = 0; i < 8; i++){
		postVertices[i][0] *= vScale[0];
		postVertices[i][1] *= vScale[1];
		postVertices[i][2] *= vScale[2];
	}
	
	// Apply location
	for (var i = 0; i < 8; i++){
		postVertices[i][0] += vLocation[0];
		postVertices[i][1] += vLocation[1];
		postVertices[i][2] += vLocation[2];
	}
	
	this.AddRectPrism( postVertices );
}

// builds a rectangular prism from eight corners
// 		the front described clockwise from the front bottom left, 
//		followed by the back from the back bottom left
// vCoords[4]: array of four vector objects 
MeshBuilder.prototype.AddRectPrism = function(vCoords) {

	// +4 means its a back face coord, 0-3 run from bottom left counter clockwise
	this.AddQuad( [vCoords[0],   vCoords[1],   vCoords[2],   vCoords[3]] );   // front
	this.AddQuad( [vCoords[0+4], vCoords[1+4], vCoords[1],   vCoords[0]] );   // left
	this.AddQuad( [vCoords[3+4], vCoords[2+4], vCoords[1+4], vCoords[0+4]] ); // back
	this.AddQuad( [vCoords[3],   vCoords[2],   vCoords[2+4], vCoords[3+4]] ); // right
	this.AddQuad( [vCoords[1],   vCoords[1+4], vCoords[2+4], vCoords[2]] );   // top
	this.AddQuad( [vCoords[0+4], vCoords[1],   vCoords[3],   vCoords[3+4]] ); // bottom
}

// builds a quad from four corners, listen counter clockwise
// vCoords[4]: array of four vector objects (with the properties x, y, z)
MeshBuilder.prototype.AddQuad = function(vCoords) {
	this.AddTri( [vCoords[0], vCoords[1], vCoords[2]] );
	this.AddTri( [vCoords[0], vCoords[2], vCoords[3]] );
}

// builds a tri from three corners, listes counter clockwise
// vCoords[3]: array of three vector objects (with the properties x, y, z)
MeshBuilder.prototype.AddTri = function(vCoords) {

	// Build a quad from two triangles
	for (var i = 0; i < 3; i++)
		this.vertices = this.vertices.concat( [vCoords[i][0], vCoords[i][1], vCoords[i][2]] );
	
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