let game;
const endpoint = '/getAllHouses';
class Game{
	constructor(canvas){
		this.scene = new Scene(canvas);
	}
}
class Scene{
	static width = 4000;
	static height = 3000;
	constructor(canvas){
		this.canvas = canvas;
		this.keys = [];
		this.roads = [];
		this.enemies = [];
		this.menu;
		this.houses = [new House(20,20,40,40,420,'Cool road',123), new House(600,600,40,40,4200,'Extra cool road',124515)];
		this.time = 0;
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
		},1000/60);
	}
	render(){
		let {ctx,canvas,player} = this;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(canvas.width/2,canvas.height/2,player.width,player.height);
		ctx.fillStyle = 'orange';
		this.houses.forEach(house=>{
			let adjusted = this.cameraOffset(house);
			if(adjusted) ctx.fillRect(adjusted.x,adjusted.y,house.width,house.height);
		});
		ctx.fillStyle = '#654321';
		this.roads.forEach(road=>{
			let adjusted = this.cameraOffset(road);
			if(adjusted) ctx.fillRect(adjusted.x,adjusted.y,road.width,road.height);
		});
		ctx.font = '20px Arial';
		ctx.fillText(`Money: $${player.money}`,1120,30);
		ctx.fillStyle = 'green';
		this.enemies.forEach(enemy=>{
			let adjusted = this.cameraOffset(enemy);
			if(adjusted) ctx.fillRect(adjusted.x,adjusted.y,enemy.width,enemy.height);
		});
		if(this.menu){
			ctx.globalAlpha = 0.5;
			ctx.fillStyle = 'black';
			ctx.fillRect(0,0,canvas.width,canvas.height);
			ctx.globalAlpha = 1;
			ctx.fillStyle = this.menu.color;
			ctx.fillRect(Menu.xOffset,Menu.yOffset,canvas.width-2*Menu.xOffset,canvas.height-2*Menu.yOffset);
			ctx.font = '40px Arial';
			ctx.fillStyle = 'white';
			this.drawCenteredText(this.menu.text,ctx,50);
			ctx.font = '20px Arial';
			if(this.menu.house.owned){
				this.drawCenteredText(`[S] Sell house for $${this.menu.house.getCost()}?`,ctx,100);
			}
			else{
				this.drawCenteredText(`[B] Buy house for $${this.menu.house.getCost()}?`,ctx,100);
			}
			this.drawCenteredText(`[Q] Exit Menu`,ctx,130);
		}
	}
	getYear = this.time % 60;
	drawCenteredText(text,ctx,y){
		let x = Menu.xOffset + (this.canvas.width - Menu.xOffset*2)/2 - ctx.measureText(text).width/2
		ctx.fillText(text,x,Menu.yOffset+y);
		//console.log(text,x,respect.y+100);

		
		
		
	}
	update(){
		if(!this.menu){
			this.player.move(this.keys,this.time);
			this.doInteract();
			this.time++;
			this.enemies.forEach(enemy=>{
				enemy.move();
			});
		} else {
			this.menu.doInteract(this.keys,this);
		}
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
		this.menu = new Menu(house.address + ' ' + house.street,`Cool test house data oh yeah I love houses`,'#654321',house);
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
		}
	}
	generateMap(){
		//let data = this.queryHouses();
		for(let i = 0; i < 15;i++){
			this.enemies.push(new Enemy());
		}
	}
	async queryHouses(){
		/*This will fetch() from our endpoint. For now, we return mock data :S*/
		let data = await fetch(endpoint).catch(e=>console.error(e));
		let json = await data.json();
		//console.log(json[1]);
		let streetNames = ['Meat Street', 'Feet Street', 'Abode Road','Pain Lane','Bike Turnpike','Hurt Court'];
		streetNames.forEach(streetName=>{
			let street;
			do{
				let horizontal = Math.random() > 0.5;
				console.log(horizontal);
				if(horizontal){
					console.log('horizontal' + horizontal);
					street = new Road(0,Math.floor(Math.random()*Scene.height),Scene.width,40);
				} else {
					console.log('vertical ' + horizontal);
					street = new Road(Math.floor(Math.random()*Scene.width),0,40,Scene.height);
				}
			} while(this.roads.find(road=>this.collide(road,street)));
			this.roads.push(street);
		});
		return [

		]
	}
	generatePrice(area,height,stories,year){

	}

}

const Keys = {
	UP:[87,38],
	DOWN:[83,40],
	LEFT:[65,37],
	RIGHT:[68,39],
	INTERACT:[69,32],
	QUIT:[81,27],
	BUY:[66],
	SELL:[83],
	FIX:[70]
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





window.addEventListener('load',()=>{
	game = new Game(document.getElementById('canvas'));


});
