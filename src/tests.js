let failMessages = ""
let fails = 0;


function assert(condition, message) {
	let failure;
	failure = document.getElementById("failure");
	try{
	    if (!condition) {
	            throw message || "Assertion";
	    }
	}
    catch(err) {
    	failure.innerHTML += err + " failed</br>";
    	fails += 1;
    }
}

function digletConstructorTest() {

	for(i = 0; i < 100; i++) {
		let testDig = new Diglet(1,1,4,4,10);
		assert(testDig.genes.length == 2,arguments.callee.name);
		assert(testDig.fitness == 0,arguments.callee.name);
		assert(testDig.genes[0] > -1 && testDig.genes[0] < 5,arguments.callee.name);
//		assert(testDig.growthRate == );
		assert(testDig.totalGrowth == 0,arguments.callee.name);
		assert(testDig.health == 20000,arguments.callee.name);
//		assert(testDig.color == );
	}
}

function digritoFindGroupTest() {
	let testDig = new Diglet(1,1,4,4,10);
	let testDigExclude = new Diglet(1,1,4,4,10);
	let testDigritos = new Digritos();
	let testDigrito = new Digrito([testDig])
	testDigritos.listof.push(testDigrito);
	assert(testDigritos.findGroup(testDig) == 0,arguments.callee.name);
	assert(testDigritos.findGroup(testDigExclude) == -1,arguments.callee.name);
}

function createNewDigritoTest() {
	let testDig = new Diglet(1,1,4,4,10);
	let testDigritos = new Digritos();
	let testDigrito = new Digrito([testDig]);
	testDigritos.createNew(testDigrito);
	assert(testDigritos.listof.length == 1, arguments.callee.name);
}

function findGroupTest() {
	
}





digletConstructorTest();
digritoFindGroupTest();
createNewDigritoTest();

//assert(,arguments.callee.name);