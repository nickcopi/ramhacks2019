let game;
class Game{
	constructor(canvas){
		this.scene = new Scene(canvas);
	}
}
class Scene{
	constructor(canvas){
		this.canvas = canvas;
		this.keys = [];
		const keys = {
			UP:[87,38],
			DOWN:[83,40],
			LEFT:[65,37],
			RIGHT:[68,39]
		}
		this.tick = 0;
		this.player = new Player(250,250,40,40);
		this.ctx = canvas.getContext('2d');
		canvas.addEventListener('keydown',e=>{
			this.keys[e.keyCode] = true;
		});
		canvas.addEventListener('keyup',e=>{
			this.keys[e.keyCode] = false;
		});
		this.interval = setInterval(()=>{
			this.update();
			this.render();
		});
	}
	render(){
		let {ctx,canvas,player} = this;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillColor = 'black';
		ctx.fillRect(canvas.width/2-player.width/2,canvas.height/2-player.height/2,player.width,player.height);
		
	}
	update(){

		this.tick++;
	}
	collide(o1,o2){
		return (o1.x < o2.x + o2.width && o1.x + o1.width > o2.x && o1.y < o2.y + o2.height && o1.y + o1.height > o2.y) && o1 !== o2;
	}
	cameraOffset(obj){
		let adjustedX = (obj.x - (this.you.x)) + canvas.width/2;
		let adjustedY = (obj.y - (this.you.y)) + canvas.height/2;
		let oWidth = obj.width === undefined ? 0 : obj.width;
		let oHeight = obj.height === undefined ? 0 : obj.height;
		if(adjustedX + oWidth < 0 || adjustedX > canvas.width || adjustedY > canvas.height || adjustedY + oHeight < 0)
			return;
		return{
			x:adjustedX,
			y:adjustedY
		};
	}

}

class Player{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		//this.img = spriteManager.player;
	}
	move(keys){

	}


}




window.addEventListener('load',()=>{
	game = new Game(document.getElementById('canvas'));


});
