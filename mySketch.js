

var rnumber=20
var rain= []


function setup() {
	createCanvas(600, 600);
	

	frameRate(20)
  for (i = 0; i < rnumber; i++) {
    raincharacter(i)
  }
  bgColor = bg()
	background(bgColor)
}

function draw() {
	
	//background(bgColor)
	 colorMode(HSB)
	fill(bgColor )
	rect(0,0,width,height)
	// fill(bgColor,2)
	// rect(0,0,width,height)
	
	

	
	//rain
	droprain()
	drawrain()
  mergerain()
	
	push();
 	//window frame and reflection
  colorMode(RGB)
	noStroke()
	fill(255,20)
	quad(0, height*0.3, 0, height*0.4, width*0.4, 0, width*0.3, 0)
	quad(0, height*0.6, 0, height*0.8,  width*0.8, 0, width*0.6,0)
	fill(0)
	rect(0,height/2,width,10)
	rect(width/2,0,10,height)

	pop();
	
}

function raincharacter(i){
	let sizecon= 2
	let speedcon=1
	
	let obj={
	x: random()*width,
	y: 0-height/10,
	size1: random(2,4)*sizecon,
	size3: random(14,18)*sizecon,
	size4: random(5,10)*sizecon,
	size5: random(11,13)*sizecon,
	clr: color(255,255,255,random(10,20)),
	yspeed:random(3,5)*speedcon,
	//xspeed:random(-2,2)*speedcon,
	name: 'd'+i
		}
	rain.push(obj)
}

function droprain(){
	 
	for(let char of rain){
	char.y+=char.yspeed
  char.x+=random(-2,2)
	}
}

function drawrain(){
	colorMode(RGB)
	noStroke()
	for (let char of rain) {
	fill(char.clr)
	beginShape();
	vertex(char.x, char.y)
	vertex(char.x-char.size1, char.y+char.size4)
	vertex(char.x-char.size1, char.y+char.size5)
	vertex(char.x, char.y+char.size3)
	vertex(char.x+char.size1, char.y+char.size5)
	vertex(char.x+char.size1, char.y+char.size4)
	endShape(CLOSE);
	}
}

function mergerain(){
	for (let char of rain) {
		for (let otherchar of rain) {
			var d=dist(char.x, char.y, otherchar.x, otherchar.y)
			if (d<15 && char.name!==otherchar.name){
			//blendMode(REMOVE)
				otherchar.x=char.x
				otherchar.y=char.y

				if(otherchar.yspeed<char.yspeed)
				otherchar.yspeed=char.yspeed
				otherchar.xspeed=char.xspeed
				char.yspeed+=0.5
			
				break		
		
			}	
		}
}
}



function bg(){
	colorMode(HSB)
	noFill()
  var sec=second()
	var bgclrs=map(sec,0,60,15,100)
	var bgclr=color(214,63,bgclrs,0.3)
  //console.log(sec)
	return bgclr
		
	

}

function mousePressed(){
  for (i = 0; i < rnumber; i++) {
    raincharacter(i)
  }

 }

