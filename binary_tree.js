class BinaryTree{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.root = null;
    this.nodes = [];
  }

  getRoot(){
    return this.root;
  }

	insert_aux(node, data, level, path){
		if (node == null){
      let node = new Node(data, width / 2, SIZE * 2, level, path, TURQUOISELIGHT);
      this.nodes.push(node);
      return node;
		}
		if (data == node.data){
      return node;
    }
		if (random() < 0.5){
      path.push(0);
			node.left = this.insert_aux(node.left, data, level + 1, path);
		}
		else{
      path.push(1);
			node.right = this.insert_aux(node.right, data, level + 1, path);
		}
		return node;
	}

  insert(data){
    this.root = this.insert_aux(this.root, data, 0, []);
  }

  search_aux(node, data){
    if (node == null){
      return false;
    }
    if (node.data == data){
      return true;
    }
    if (data < node.data){
      return this.search_aux(node.left, data);
    }
    else{
      return this.search_aux(node.right, data);
    }
  }

  search(data){
    return this.search_aux(this.root, data);
  }

  async inorderscan_aux(node){
    if (node == null){
      return;
    }
    await this.inorderscan_aux(node.left);
    await sleep(DELAY_IN_MS);
    node.setBackcolor(GREEN);
    console.log(node.data + " " + node.level);
    await this.inorderscan_aux(node.right);
  }

  async inorderscan(){
    await this.inorderscan_aux(this.root);
  }


  async preorderscan_aux(node){
    if (node == null){
      return;
    }
    await sleep(DELAY_IN_MS);
    node.setBackcolor(GREEN);
    console.log(node.data + " " + node.level);
    await this.preorderscan_aux(node.left);
    await this.preorderscan_aux(node.right);
  }

  async preorderscan(){
    await this.preorderscan_aux(this.root);
  }


  async postorderscan_aux(node){
    if (node == null){
      return;
    }
    await this.postorderscan_aux(node.left);
    await this.postorderscan_aux(node.right);
    await sleep(DELAY_IN_MS);
    node.setBackcolor(GREEN);
    console.log(node.data + " " + node.level);
  }

  async postorderscan(){
    await this.postorderscan_aux(this.root);
  }

  async levelorderscan(){
    var list = [];
    var queue = [];
    queue.push(this.root);
    var level = 0;
    while (queue.length > 0){
      var node = queue.shift();
      await sleep(DELAY_IN_MS);
      node.setBackcolor(GREEN);

      list.push([node, node.left, node.right]);
      console.log(node.data);

      if (node.left != null){
        queue.push(node.left);
      }
      if (node.right != null){
        queue.push(node.right);
      }
    }
    return list;
  }

  draw(){
    for (let node of this.nodes){
      node.draw();
    }
  }

  setBackcolor(backcolor){
    for (let node of this.nodes){
      node.setBackcolor(backcolor);
    }
  }
}
