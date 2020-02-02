class Node{
  constructor(data, x, y, level, path){
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.level = level;
    this.path = path;
    this.isVisited = false;
  }

  isLeaf(){
    return this.left == null && this.right == null;
  }

  draw(){
    strokeWeight(1);
    stroke(WHITE);
    fill(BLACK);

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

    fill(BLACK);
    ellipse(x, y, 2 * SIZE, 2 * SIZE);

    noStroke();
    fill(WHITE);
    textAlign(CENTER);
    textStyle(NORMAL);
    textSize(SIZE);
    text(this.data, x, y + SIZE / 4);
  }
}
