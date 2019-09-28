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
	getCost(){
		return this.cost;
	}
	buy(player){
		if(this.owned) return;
		if(player.money >= this.getCost()){
			player.money -= this.getCost();
			this.owned = true;

		}
	}
	sell(player){
		if(!this.owned) return;
		player.money += this.getCost();
		this.owned = false;
	}
}

