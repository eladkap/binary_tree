var tree;

var btnScan;
var btnGenerateTree;
var selectorScan;


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(200);
	generateTree();
	setButtons();
	setSelectors();
	frameRate(FPS);
}

function draw() {
	tree.draw();
}

function setButton(pos, label, action){
	let btn = createButton(label);
	btn.position(pos.x, pos.y);
	btn.mousePressed(action);
	return btn;
}

function setButtons(){
	btnScan = setButton(createVector(width * 0.7, HEADER_HEIGHT / 2), 'Scan', scan);
	btnGenerateTree = setButton(createVector(width * 0.1, HEADER_HEIGHT / 2), 'Generate Tree', generateTree);
}

function setSelectors(){
	selectorScan = setSelector(createVector(SCREEN_WIDTH * 0.4, HEADER_HEIGHT / 2), SCAN_OPTIONS, setScanType);
}

function setSelector(pos, options, changeAction){
	let sel = createSelect();
	sel.position(pos.x, pos.y);
	for (let option of options){
		sel.option(option);
	}
	sel.changed(changeAction);
	return sel;
}

function generateTree() {
	tree = new BinaryTree(width / 2, ROOT_POS_Y);
	for (var i = 0; i < 16; i++) {
		var x = int(random(0, 100));
		tree.insert(x);
	}
}

function setScanType(){
	var scanType = selectorScan.value();
}

async function startScan(){
	var scanType = selectorScan.value();
	if (scanType == 'PREORDER'){
		await tree.preorderscan();
	}
	else if (scanType == 'INORDER'){
		await tree.inorderscan();
	}
	else if (scanType == 'POSTORDER'){
		await tree.postorderscan();
	}
	else if (scanType == 'LEVELORDER'){
		await tree.levelorderscan();
	}
	else if (scanType == 'TREE_HEIGHT'){
		await tree.getHeight();
	}
}

async function finishScan(){
	console.log('Scan finished.');
	await sleep(1000);
	tree.setBackcolor(TURQUOISELIGHT);
}

async function scan(){
	await startScan();
	finishScan();
}
