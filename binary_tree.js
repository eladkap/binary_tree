class BinaryTree {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.root = null;
    this.nodes = [];
  }

  getRoot() {
    return this.root;
  }

  insert_aux(node, data, level, path) {
    if (node == null) {
      let x = this.pos.x;
      let y = this.pos.y + (level + 1) * SIZE * 5;
      for (var i = 0; i < path.length; i++) {
        if (path[i] == 0) {
          x -= Math.pow(0.5, i + 1) * this.pos.x;
        } else {
          x += Math.pow(0.5, i + 1) * this.pos.x;
        }
      }

      let node = new Node(data, x, y, level, path, TURQUOISELIGHT);
      this.nodes.push(node);
      return node;
    }
    if (data == node.data) {
      return node;
    }
    if (random() < 0.5) {
      path.push(0);
      node.left = this.insert_aux(node.left, data, level + 1, path);
      node.left.setParent(node);
    } else {
      path.push(1);
      node.right = this.insert_aux(node.right, data, level + 1, path);
      node.right.setParent(node);
    }
    return node;
  }

  insert(data) {
    this.root = this.insert_aux(this.root, data, 0, []);
  }

  visit(node) {
    console.log(node.data + " " + node.level);
    output += " " + node.data;
  }

  search_aux(node, data) {
    if (node == null) {
      return false;
    }
    if (node.data == data) {
      return true;
    }
    if (data < node.data) {
      return this.search_aux(node.left, data);
    } else {
      return this.search_aux(node.right, data);
    }
  }

  search(data) {
    return this.search_aux(this.root, data);
  }

  async inorderscan_aux(node) {
    if (node == null) {
      return;
    }
    await this.inorderscan_aux(node.left);
    // Begin visit node
    await sleep(DELAY_IN_MS);
    node.setBackcolor(GREEN);
    this.visit(node);
    // End visit node
    await this.inorderscan_aux(node.right);
  }

  async inorderscan() {
    await this.inorderscan_aux(this.root);
  }

  async preorderscan_aux(node) {
    if (node == null) {
      return;
    }
    // Begin visit node
    await sleep(DELAY_IN_MS);
    node.setBackcolor(GREEN);
    this.visit(node);
    // End visit node
    await this.preorderscan_aux(node.left);
    await this.preorderscan_aux(node.right);
  }

  async preorderscan() {
    await this.preorderscan_aux(this.root);
  }

  async postorderscan_aux(node) {
    if (node == null) {
      return;
    }
    await this.postorderscan_aux(node.left);
    await this.postorderscan_aux(node.right);
    // Begin visit node
    await sleep(DELAY_IN_MS);
    node.setBackcolor(GREEN);
    this.visit(node);
    // End visit node
  }

  async postorderscan() {
    await this.postorderscan_aux(this.root);
  }

  async levelorderscan() {
    var list = [];
    var queue = [];
    queue.push(this.root);
    var level = 0;
    while (queue.length > 0) {
      var node = queue.shift();
      await sleep(DELAY_IN_MS);
      node.setBackcolor(GREEN);

      list.push([node, node.left, node.right]);

      // Begin visit node
      this.visit(node);
      // End visit node

      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }
    }
    return list;
  }

  async getHeightAux(node) {
    if (node == null) {
      return 0;
    }
    let leftHeight = await this.getHeightAux(node.left);
    await sleep(DELAY_IN_MS);
    if (node.left != null) {
      noStroke();
      fill(BLUE);
      textSize(SIZE);
      textAlign(CENTER);
      textStyle(NORMAL);
      text(leftHeight, node.left.pos.x - 2 * SIZE, node.left.pos.y);
    }
    let rightHeight = await this.getHeightAux(node.right);
    await sleep(DELAY_IN_MS);
    if (node.right != null) {
      noStroke();
      fill(PURPLE);
      textSize(SIZE);
      textAlign(CENTER);
      textStyle(NORMAL);
      text(rightHeight, node.right.pos.x + 2 * SIZE, node.right.pos.y);
    }
    await sleep(DELAY_IN_MS);
    node.setBackcolor(GREEN);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  async getHeight() {
    let treeHeight = await this.getHeightAux(this.root);
    noStroke();
    fill(RED);
    textSize(SIZE);
    textAlign(CENTER);
    textStyle(NORMAL);
    text(treeHeight, this.root.pos.x, this.root.pos.y - 2 * SIZE);
    await sleep(2 * DELAY_IN_MS);
    console.log("Tree Height: " + treeHeight);
  }

  draw() {
    for (let node of this.nodes) {
      node.draw();
    }
  }

  setBackcolor(backcolor) {
    for (let node of this.nodes) {
      node.setBackcolor(backcolor);
    }
  }
}
