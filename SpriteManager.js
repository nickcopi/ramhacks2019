class SpriteManager{
	
	constructor() {
		this.createSprite('road', 'https://google.com')
		this.createSprite('house', 'https://google.com')
	}

	createSprite(name, src) {
		this[name] = new Image()
		this[name].src = src
	}

	house() {
		return this['house']
	}

	road() {
		return this['road']
	}

}

