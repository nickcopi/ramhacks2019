class Menu{
	static xOffset = 150;
	static yOffset = 100;
	constructor(text,body,color,house){
		this.text = text;
		this.body = body;
		this.color = color;
		this.house = house;
	}
	doInteract(keys,scene){
		let quit = false;
		Keys.QUIT.forEach(k=>{
			if(keys[k]){
				quit = true;
			}
		});
		if(quit) return scene.menu = null;
		let buy = false;
		Keys.BUY.forEach(k=>{
			if(keys[k]){
				buy = true;
			}
		});
		if(buy) return this.house.buy(scene.player);
		let sell = false;
		Keys.SELL.forEach(k=>{
			if(keys[k]){
				sell = true;
			}
		});
		if(sell) return this.house.sell(scene.player);
	}
}
