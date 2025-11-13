// sketch.js — versión corregida para que redraw() funcione correctamente

let bgColors;
let flowerColors;
let ellipseColors;

function setup() {
  createCanvas(600, 600);
  noLoop();              // no dibuja en loop automático
  generateColors();      // colores iniciales
  redraw();              // fuerza una llamada a draw() para pintar la primera vez
}

function draw() {
  // draw() es lo que redraw() invoca — aquí se llama a la función que dibuja la escena
  drawScene();
}

// Al hacer click generamos nuevos colores y forzamos redraw()
function mousePressed() {
  generateColors();
  redraw(); // llama a draw() una vez
}

// Genera colores aleatorios
function generateColors() {
  bgColors = [
    color(random(200, 255), random(200, 240), random(180, 220)),
    color(random(180, 220), random(160, 200), random(120, 180))
  ];
  
  flowerColors = [
    { fill: color(random(150,255), random(100,180), random(180,255)), stroke: color(random(100,255), random(0,100), random(100,255)) },
    { fill: color(random(100,255), random(100,180), random(255)), stroke: color(random(150,255), random(0,100), random(255)) }
  ];
  
  ellipseColors = [
    { c1: color(random(0,255), random(100,255), 255, 180), c2: color(random(0,255), 255, random(100), 180) },
    { c3: color(255, random(0,200), random(0,200), 180), c4: color(255, 255, random(0,200), 180) }
  ];
}

// Dibuja toda la composición usando los colores actuales
function drawScene() {
  // Fondo degradado
  setGradient(0, 0, width, height, bgColors[0], bgColors[1]);

  // Flor superior derecha
  drawFlower(450, 110, 80, flowerColors[0].fill, flowerColors[0].stroke);

  // Flor inferior izquierda
  drawFlower(150, 500, 85, flowerColors[1].fill, flowerColors[1].stroke);

  // Elipses izquierda (azul y verde)
  noStroke();
  fill(ellipseColors[0].c1);
  ellipse(100, 300, 200, 200);
  fill(ellipseColors[0].c2);
  ellipse(180, 300, 200, 200);

  // Elipses derecha (rojo y amarillo)
  fill(ellipseColors[1].c3);
  ellipse(420, 300, 200, 200);
  fill(ellipseColors[1].c4);
  ellipse(500, 300, 200, 200);

  // Cuadro con punto central (negro y blanco)
  fill(0);
  rectMode(CENTER);
  rect(300, 300, 100, 100);
  fill(255);
  circle(300, 300, 20);
}

// Degradado vertical
function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

// Dibuja flor con contorno punteado y centro relleno
function drawFlower(x, y, size, fillColor, strokeColor) {
  push();
  translate(x, y);
  stroke(strokeColor);
  strokeWeight(2);
  drawingContext.setLineDash([6, 4]); // contorno punteado
  fill(fillColor);
  
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    let px = cos(angle) * size * 0.6;
    let py = sin(angle) * size * 0.6;
    ellipse(px, py, size, size);
  }

  // centro de la flor
  noStroke();
  drawingContext.setLineDash([]);
  fill(strokeColor);
  circle(0, 0, size * 0.25);
  pop();
}
