
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
		};
		this.tick = 0;
		this.ctx = canvas.getContext('2d');
		this.interval = setInterval(()=>{
			this.update();
			this.render();
		});
		canvas.addEventListener('keydown',e=>{
			
		});
	}
	render(){
		let {ctx,canvas} = this;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		
	}
	update(){

		this.tick++;
	}

}



window.addEventListener('onload',()=>{
	game = new Game(document.getElementById('canvas'));


});
