import React, { useRef } from 'react';
import Sketch from 'react-p5';

export default function P5Sketch() {
  const angle = useRef(0);
  const rotationSpeed = useRef(0.01);
  const pos = useRef();
  const velocity = useRef();
  const speed = 0.5;
  const changeRotationTimer = useRef(0);
  const changeInterval = useRef(120);
  const floatingGuy = useRef();

  const bgImage = useRef({
    top: null,
    bottom: null,
    left: null,
    right: null,
  });

  const currentBg = useRef("top");

  const preload = (p5) => {
    console.log('chamando preload')
    bgImage.current.top = p5.loadImage("/assets/espaco.jpg");
    bgImage.current.bottom = p5.loadImage("/assets/espaco2.png");
    bgImage.current.left = p5.loadImage("/assets/ceu_estrelas.png");
    bgImage.current.right = p5.loadImage("/assets/ceu_estrelas1.jpg");
    floatingGuy.current = p5.loadImage('/assets/floatingGuy.png');
}

const setup = (p5, canvasParentRef) => {
  console.log("setup chamado"); // Testeeee
  p5.createCanvas(1000, 600).parent(canvasParentRef);
  p5.imageMode(p5.CENTER);
  p5.rectMode(p5.CENTER);

  pos.current = p5.createVector(p5.width / 2, p5.height / 2);
  velocity.current = p5.createVector(p5.random(-1, 1), p5.random(-1, 1)).setMag(speed);

};

const draw = (p5) => {
  console.log("draw chamado") //Testeeee

  if (!bgImage.current || !pos.current || !velocity.current) return;

  let bg = bgImage.current[currentBg.current];
  if (bg) {
    p5.image(bg, p5.width / 2, p5.height / 2, p5.width, p5.height);
  }

  let angleChange = p5.random(-0.05, 0.05);
  velocity.current.rotate(angleChange);
  velocity.current.setMag(speed);
  pos.current.add(velocity.current);

  // logica para as bordas
  if (pos.current.x > p5.width) {
    pos.current.x = 0;
    currentBg.current = "right";
  } else if (pos.current.x < 0) {
    pos.current.x = p5.width;
    currentBg.current = "left";
  } else if (pos.current.y > p5.height) {
    pos.current.y = 0;
    currentBg.current = "bottom";
  } else if (pos.current.y < 0) {
    pos.current.y = p5.height;
    currentBg.current = "top";
  }

  changeRotationTimer.current++;
  if (changeRotationTimer.current > changeInterval.current) {
    if (p5.random(1) < 0.5) {
      rotationSpeed.current *= -1;
    }
    changeRotationTimer.current = 0;
    changeInterval.current = p5.random(60, 180);
  }

  angle.current += rotationSpeed.current;

  p5.push();
  p5.translate(pos.current.x, pos.current.y);
  p5.rotate(angle.current);
  p5.image(floatingGuy.current, 0, 0, 150, 150);
  p5.pop();
};

return <Sketch preload={preload} setup={setup} draw={draw} />;
}
