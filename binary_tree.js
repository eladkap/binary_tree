class BinaryTree{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.root = null;
  }

  getRoot(){
    return this.root;
  }

	insert_aux(node, data, level, path){
		if (node == null){
			return new Node(data, width / 2, SIZE * 2, level, path);
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

  inorderscan_aux(node){
    if (node == null){
      return;
    }
    this.inorderscan_aux(node.left);
    console.log(node.data + " " + node.level);
    this.inorderscan_aux(node.right);
  }

  inorderscan(){
    this.inorderscan_aux(this.root);
  }


  preorderscan_aux(node){
    if (node == null){
      return;
    }
    console.log(node.data + " " + node.level);
    this.preorderscan_aux(node.left);
    this.preorderscan_aux(node.right);
  }

  preorderscan(){
    this.preorderscan_aux(this.root);
  }


  postorderscan_aux(node){
    if (node == null){
      return;
    }
    this.postorderscan_aux(node.left);
    this.postorderscan_aux(node.right);
    console.log(node.data + " " + node.level);
  }

  postorderscan(){
    this.postorderscan_aux(this.root);
  }


  preorder_show(node){
    if (node == null){
      return;
    }
    if (!node.isVisited){
      node.draw();
      node.isVisited = true;
    }
    this.preorder_show(node.left);
    this.preorder_show(node.right);
  }

  levelorderscan(){
    var list = [];
    var queue = [];
    queue.push(this.root);
    var level = 0;
    while (queue.length > 0){
      var node = queue.shift();

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
    this.preorder_show(this.root);
  }
}
