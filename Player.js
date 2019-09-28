
class Player{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.speed = 5;
		this.width = width;
		this.height = height;
		this.direction = Directions.DOWN;
		this.money = 200000;
		//this.img = spriteManager.player;
	}
	move(keys){
		let found = false;
		Keys.UP.forEach(k=>{
			if(keys[k] && !found){
				found = true;
				this.y -= this.speed;
				this.direction = Directions.UP;
			}
		});
		found = false;
		Keys.DOWN.forEach(k=>{
			if(keys[k] && !found){
				found = true;
				this.y += this.speed;
				this.direction = Directions.DOWN;
			}
		});
		found = false;
		Keys.LEFT.forEach(k=>{
			if(keys[k] && !found){
				found = true;
				this.x -= this.speed;
				this.direction = Directions.LEFT;
			}
		});
		found = false;
		Keys.RIGHT.forEach(k=>{
			if(keys[k] && !found){
				found = true;
				this.x += this.speed;
				this.direction = Directions.RIGHT;
			}
		});

	}


}
