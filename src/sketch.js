export const sketch = (p) => {
  let bgImage, floatingGuy;
  let angle = 0;
  let rotationSpeed = 0.002;
  let pos;
  let velocity;
  let speed = 0.5;


  p.preload = () => {
    bgImage = p.loadImage("./imgs/espaco.jpg")
    floatingGuy = p.loadImage("./imgs/floatingGuy.png")
  }

  p.setup = () => {
    p.createCanvas(500, 500);
    p.imageMode(p.CENTER);
    p.rectMode(p.CENTER);

    pos = p.createVector(p.width / 2, p.height / 2);
    velocity = p.createVector.random2D().mult(speed);
  };

  p.draw = () => {
    p.image(bgImage, 0, 0, p.width, p.height);

    pos.add(velocity);

    if (pos.x > p.width) pos.x = 0;
    if (pos.x < 0) pos.x = p.width;
    if (pos.y > p.height) pos.y = 0;
    if (pos.y < 0) pos.y = p.height;

    let angleChange = p.random(-0.02, 0.02);
    velocity.rotate(angleChange);

    angle += rotationSpeed;

    p.push();
    p.translate(pos.x, pos.y);
    p.rotate(angle);
    p.fill(200, 200, 255);
    p.square(0, 0, 30);
    // image(guy, 0, 0, 150, 150);
    p.pop();
  };
};