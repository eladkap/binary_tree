var tree;

var btnScan;
var btnGenerateTree;
var selectorScan;


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(50);
	generateTree();
	setButtons();
	setSelectors();
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
	tree = new BinaryTree();
	for (var i = 0; i < 16; i++) {
		var x = int(random(0, 100));
		tree.insert(x);
	}
}

function setScanType(){
	var scanType = selectorScan.value();
}

function scan(){
	var scanType = selectorScan.value();
	if (scanType == 'PREORDER'){
		tree.preorderscan();
	}
	else if (scanType == 'INORDER'){
		tree.inorderscan();
	}
	else if (scanType == 'POSTORDER'){
		tree.postorderscan();
	}
	else if (scanType == 'LEVELORDER'){
		tree.levelorderscan();
	}
	
}