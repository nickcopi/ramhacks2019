class Enemy{
	constructor(){
		this.x = Math.floor(Math.random()*Scene.width);
		this.y = Math.floor(Math.random()*Scene.height);
		this.width = 40;
		this.height = 40;
		this.speed = Math.floor(Math.random()*3) + 4
		this.xSign = (Math.random()>0.5)?-1:1;
		this.ySign = (Math.random()>0.5)?-1:1;
	}
	move(){
		this.x+= this.speed * ( this.xSign)
		this.y+= this.speed * ( this.ySign)
		if(this.x < 0) this.xSign = 1;
		if(this.y < 0) this.ySign = 1;
		if(this.x > Scene.width) this.xSign = -1;
		if(this.y > Scene.height) this.ySign = -1;
	}


}
