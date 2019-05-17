class Digritos {
	constructor() {
		this.digritos = [];
		this.test = "hi";
	}

	createNew(digrito) {
		this.digritos.add(digrito);
	}

	isIn(dig1, dig2) {
		for(let i = 0; i < this.digritos.length; i++) {
			if(this.digritos[i].includes(dig1) && this.digritos[i].includes[dig2]) {return true;} else{return false;}
		}
	}
}
