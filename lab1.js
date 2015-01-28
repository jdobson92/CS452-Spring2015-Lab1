
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    // 3 sets of Vertices
	var triangle = [
					vec2(-0.5, -0.5), 
					vec2(0, 0.5), 
					vec2(0.5, -0.5)
					];
	var square = [	
					vec2(-0.5, 0.5),
					vec2(0.5, 0.5), 
					vec2(-0.5, -0.5), 
					vec2(0.5, -0.5)
					];
	var trapezoid = [
					vec2(-1, -0.5), 
					vec2(-0.5, 0.5), 
					vec2(0, -0.5), 
					vec2(0.5, 0.5), 
					vec2(1, -0.5), 
					];	
	
    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    

	
	//Show initial shape
	var bufferId = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
			gl.bufferData(gl.ARRAY_BUFFER,flatten(trapezoid), gl.STATIC_DRAW);
			index++
			
	// Associate our shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition");
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray( vPosition);		
			render(5);
	var index = 0;
	
	
	// Create Click Listener to change shape each mouse click.
	canvas.addEventListener("click", function(event){
		if (index == 0) { //Display triangle
			
			var bufferId1 = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, bufferId1);
			gl.bufferData(gl.ARRAY_BUFFER,flatten(triangle), gl.STATIC_DRAW);
			var vPosition = gl.getAttribLocation( program, "vPosition");
			gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray( vPosition);
			index++
			render(3);
		}
		else if (index == 1) { //Display square
			
			var bufferId2 = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
			gl.bufferData(gl.ARRAY_BUFFER,flatten(square), gl.STATIC_DRAW);
			var vPosition = gl.getAttribLocation( program, "vPosition");
			gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray( vPosition);
			index++
			render(4);
		}
		else {
			
			var bufferId3 = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, bufferId3);
			gl.bufferData(gl.ARRAY_BUFFER,flatten(trapezoid), gl.STATIC_DRAW);
			var vPosition = gl.getAttribLocation( program, "vPosition");
			gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray( vPosition);
			index = 0; //reset index to re-cycle through shapes
			render(5);
		
	} 
});



};

function render(vert) {
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays(gl.TRIANGLE_STRIP,0, vert);
	
}
