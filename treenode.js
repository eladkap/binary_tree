class Node {
  constructor(data, x, y, level, path, backcolor) {
    this.data = data;
    this.pos = createVector(x, y);
    this.left = null;
    this.right = null;
    this.parent = null;
    this.level = level;
    this.path = path;
    this.backcolor = backcolor;
    this.visited = false;
  }

  isLeaf() {
    return this.left == null && this.right == null;
  }

  setBackcolor(backcolor) {
    this.backcolor = backcolor;
  }

  isVisited() {
    return this.visited;
  }

  setVisited(value) {
    this.visited = value;
  }

  setParent(parent) {
    this.parent = parent;
  }

  draw() {
    strokeWeight(1);
    stroke(BLACK);
    fill(this.backcolor);

    if (this.left != null) {
      line(this.pos.x, this.pos.y, this.left.pos.x, this.left.pos.y);
    }
    if (this.right != null) {
      line(this.pos.x, this.pos.y, this.right.pos.x, this.right.pos.y);
    }

    fill(this.backcolor);
    ellipse(this.pos.x, this.pos.y, 2 * SIZE, 2 * SIZE);

    noStroke();
    fill(BLACK);
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(SIZE);
    text(this.data, this.pos.x, this.pos.y + SIZE / 4);
  }
}
