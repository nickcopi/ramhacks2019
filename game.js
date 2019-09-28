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
		this.roads = [];
		this.houses = [new House(20,20,40,40), new House(600,600,40,40)];
		this.tick = 0;
		this.player = new Player(250,250,40,40);
		this.ctx = canvas.getContext('2d');
		window.addEventListener('keydown',e=>{
			this.keys[e.keyCode] = true;
		});
		window.addEventListener('keyup',e=>{
			this.keys[e.keyCode] = false;
		});
		this.generateMap();
		this.interval = setInterval(()=>{
			this.update();
			this.render();
		});
	}
	render(){
		let {ctx,canvas,player} = this;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(canvas.width/2-player.width/2,canvas.height/2-player.height/2,player.width,player.height);
		ctx.fillStyle = 'orange';
		this.houses.forEach(house=>{
			let adjusted = this.cameraOffset(house);
			if(adjusted) ctx.fillRect(adjusted.x,adjusted.y,house.width,house.height);
		});
		this.roads.forEach(road=>{
			let adjusted = this.cameraOffset(road);
			if(adjusted) ctx.fillRect(adjusted.x,adjusted.y,road.width,road.height);
		});
		ctx.font = '20px Arial';
		ctx.fillText(`Money: $${player.money}`,1120,30);
	}
	update(){
		this.player.move(this.keys);
		this.doInteract();
		this.tick++;
	}
	collide(o1,o2){
		return (o1.x < o2.x + o2.width && o1.x + o1.width > o2.x && o1.y < o2.y + o2.height && o1.y + o1.height > o2.y) && o1 !== o2;
	}
	doInteract(){
		let interact = false;
		Keys.INTERACT.forEach(k=>{
			if(this.keys[k]){
				interact = true;
			}
		});
		if(!interact) return;
		const house = this.houses.find(house=>this.collide(this.player,house));
		if(!house) return;
		console.log(house);
		
		
	}
	cameraOffset(obj){
		let canvas = this.canvas;
		let adjustedX = (obj.x - (this.player.x)) + canvas.width/2;
		let adjustedY = (obj.y - (this.player.y)) + canvas.height/2;
		let oWidth = obj.width === undefined ? 0 : obj.width;
		let oHeight = obj.height === undefined ? 0 : obj.height;
		if(adjustedX + oWidth < 0 || adjustedX > canvas.width || adjustedY > canvas.height || adjustedY + oHeight < 0)
			return;
		return{
			x:adjustedX,
			y:adjustedY
		};
	}
	generateMap(){
		let data = this.queryHouses();
	}
	queryHouses(){
		/*This will fetch() from our endpoint. For now, we return mock data :S*/
		return [

		]
	}

}

const Keys = {
	UP:[87,38],
	DOWN:[83,40],
	LEFT:[65,37],
	RIGHT:[68,39],
	INTERACT:[69,32]
}

const Directions = {
	DOWN:1,
	UP:2,
	LEFT:3,
	RIGHT:4
}


class Road{
	constructor(x,y,width,height,name){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.name = name;
	}

}

class House{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.cost;
		this.img;
	}
}




window.addEventListener('load',()=>{
	game = new Game(document.getElementById('canvas'));


});
