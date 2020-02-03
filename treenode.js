class Node{
  constructor(data, x, y, level, path, backcolor){
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.level = level;
    this.path = path;
    this.backcolor = backcolor;
    this.visited = false;
  }

  isLeaf(){
    return this.left == null && this.right == null;
  }

  setBackcolor(backcolor){
    this.backcolor = backcolor;
  }

  isVisited(){
    return this.visited;
  }

  setVisited(value){
    this.visited = value;
  }

  draw(){
    strokeWeight(1);
    stroke(BLACK);
    fill(this.backcolor);

    var x = width / 2;
    var y = (this.level + 1) * SIZE * 5;
    
    for (var i = 0; i < this.path.length; i++) {
      if (this.path[i] == 0){
        x -= Math.pow(0.5, i + 2) * width;
      }
      else{
        x += Math.pow(0.5, i + 2) * width;
      }
    }

    if (this.left != null){
      line(x, y, x - Math.pow(0.5, this.level + 2) * width, (this.level + 2) * SIZE * 5);
    }
    if (this.right != null){
      line(x, y, x + Math.pow(0.5, this.level + 2) * width, (this.level + 2) * SIZE * 5);
    }

    fill(this.backcolor);
    ellipse(x, y, 2 * SIZE, 2 * SIZE);

    noStroke();
    fill(BLACK);
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(SIZE);
    text(this.data, x, y + SIZE / 4);
  }
}
