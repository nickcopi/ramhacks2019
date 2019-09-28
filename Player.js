
class Player{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.speed = 5;
		this.width = width;
		this.height = height;
		this.direction = Directions.DOWN;
		this.money = 200000;
		this.slimeTime = 0;
		//this.img = spriteManager.player;
	}
	getSpeed(time){
		return (this.slimeTime < time)?this.speed:this.speed/2;
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
		

	}


}
