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
	buy(player){
		if(this.owned) return;
		if(player.money >= this.cost){
			player.money -= this.cost;
			this.owned = true;

		}
	}
	sell(player){
		if(!this.owned) return;
		player.money += this.cost;
		this.owned = false;
	}
}

