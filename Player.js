
class Player{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.speed = 4;
		this.width = width;
		this.height = height;
		this.direction = Directions.DOWN;
		this.money = 200000;
		this.slimeTime = 0;
		this.streetName = "";
		this.slimedCount = 0;
		//this.img = spriteManager.player;
	}
	getSpeed(time){
		let speed =  (this.slimeTime < time)?this.speed:this.speed/2;
		if(this.streetName) speed += 2;
		return speed;
	}
	move(keys,time){
		let found = false;
		Keys.UP.forEach(k=>{
			if(keys[k] && !found){
				found = true;
				this.y -= this.getSpeed(time);
				this.direction = Directions.UP;
			}
		});
		found = false;
		Keys.DOWN.forEach(k=>{
			if(keys[k] && !found){
				found = true;
				this.y += this.getSpeed(time);
				this.direction = Directions.DOWN;
			}
		});
		found = false;
		Keys.LEFT.forEach(k=>{
			if(keys[k] && !found){
				found = true;
				this.x -= this.getSpeed(time);
				this.direction = Directions.LEFT;
			}
		});
		found = false;
		Keys.RIGHT.forEach(k=>{
			if(keys[k] && !found){
				found = true;
				this.x += this.getSpeed(time);
				this.direction = Directions.RIGHT;
			}
		});
		if(this.x < 0) this.x = 0;
		if(this.y < 0) this.y = 0;
		if(this.x > Scene.width-this.width) this.x = Scene.width-this.width;
		if(this.y > Scene.height-this.height) this.y = Scene.height-this.height;
		

	}


}
