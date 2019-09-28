class House{
	constructor(x,y,width,height,cost,street,address){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.cost = cost;
		this.img;
		this.street = street;
		this.address = address;
		this.owned = false;
	}
	getCost(time){
		return Math.round(this.cost);
	}
	buy(player,time){
		if(this.owned) return;
		if(player.money >= this.getCost(time)){
			player.money -= this.getCost(time);
			this.owned = true;

		}
	}
	sell(player,time){
		if(!this.owned) return;
		player.money += this.getCost(time);
		this.owned = false;
	}
}

