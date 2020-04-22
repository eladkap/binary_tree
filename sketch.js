var tree;

var btnScan;
var btnGenerateTree;
var selectorScan;
var selectorDepth;
var selectorSize;
var treeSize;
var output;

function setup() {
  createCanvas(windowWidth, windowHeight);
  treeSize = DEFAULT_SIZE;
  generateTree();
  setButtons();
  setSelectors();
  frameRate(FPS);
  output = "";
}

function draw() {
  background(GRAY3);
  tree.draw();
  DrawOutputLine();
}

function DrawOutputLine() {
  push();
  fill(GRAY1);
  rect(0, height - 100, width, OUTPUT_HEIGHT);
  fill(BLACK);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(OUTPUT_FONTSIZE);
  text(output, width * 0.5, height - 50);
  pop();
}

function setButton(pos, label, action) {
  let btn = createButton(label);
  btn.position(pos.x, pos.y);
  btn.mousePressed(action);
  return btn;
}

function setButtons() {
  btnScan = setButton(
    createVector(width * 0.7, HEADER_HEIGHT / 2),
    "Scan",
    scan
  );
  btnGenerateTree = setButton(
    createVector(width * 0.1, HEADER_HEIGHT / 2),
    "Generate Tree",
    generateTree
  );
}

function setTreeSize() {
  treeSize = int(selectorSize.value());
}

function setSelectors() {
  selectorScan = setSelector(
    createVector(SCREEN_WIDTH * 0.4, HEADER_HEIGHT / 2),
    SCAN_OPTIONS,
    setScanType
  );
  selectorSize = setSelector(
    createVector(SCREEN_WIDTH * 0.6, HEADER_HEIGHT / 2),
    SIZE_OPTIONS,
    setTreeSize
  );
  selectorSize.selected(DEFAULT_SIZE);
  //   selectorDepth = setSelector(
  //     createVector(SCREEN_WIDTH * 0.6, HEADER_HEIGHT / 2),
  //     DEPTH_OPTIONS,
  //     generateTree
  //   );
}

function setSelector(pos, options, changeAction) {
  let sel = createSelect();
  sel.position(pos.x, pos.y);
  for (let option of options) {
    sel.option(option);
  }
  sel.changed(changeAction);
  return sel;
}

function generateTree() {
  loop();
  output = "";
  tree = new BinaryTree(width / 2, ROOT_POS_Y);
  for (var i = 0; i < treeSize; i++) {
    var x = int(random(0, 100));
    tree.insert(x);
  }
}

function setScanType() {
  var scanType = selectorScan.value();
}

async function startScan() {
  output = "";
  var scanType = selectorScan.value();
  if (scanType == "PREORDER") {
    loop();
    await tree.preorderscan();
  } else if (scanType == "INORDER") {
    loop();
    await tree.inorderscan();
  } else if (scanType == "POSTORDER") {
    loop();
    await tree.postorderscan();
  } else if (scanType == "LEVELORDER") {
    loop();
    await tree.levelorderscan();
  } else if (scanType == "TREE_HEIGHT") {
    noLoop();
    await tree.getHeight();
  }
}

async function finishScan() {
  console.log("Scan finished.");
  await sleep(1000);
  tree.setBackcolor(TURQUOISELIGHT);
}

async function scan() {
  await startScan();
  finishScan();
}
