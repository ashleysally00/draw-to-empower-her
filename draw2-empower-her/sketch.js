let currentScreen = "start";
let drawingLayer;
let showMessage = "";
let characterImg;

function preload() {
  characterImg = loadImage(
    "StarGlassesPenelope1.png",
    () => console.log("✅ Image loaded!"),
    () => console.error("❌ Image failed to load.")
  );
}

function setup() {
  createCanvas(600, 400);
  drawingLayer = createGraphics(600, 400);
  drawingLayer.background(255);
}

function draw() {
  background(220);

  if (currentScreen === "start") {
    drawStartScreen();
  } else if (currentScreen === "draw") {
    drawDrawingScreen();
  } else if (currentScreen === "response") {
    drawResponseScreen();
  }
}

function drawStartScreen() {
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("Draw to Empower", width / 2, height / 2 - 40);

  fill(100, 200, 255);
  rect(width / 2 - 75, height / 2, 150, 50, 10);
  fill(0);
  textSize(20);
  text("Start Drawing", width / 2, height / 2 + 32);
}

function drawDrawingScreen() {
  image(drawingLayer, 0, 0);

  // Draw character image
  image(characterImg, 250, 80, 100, 200); // Adjust if needed

  if (mouseIsPressed && mouseY < height - 50) {
    drawingLayer.stroke(0);
    drawingLayer.strokeWeight(4);
    drawingLayer.line(mouseX, mouseY, pmouseX, pmouseY);
  }

  // "Done" button
  fill(100, 255, 150);
  rect(width - 120, height - 40, 100, 30, 10);
  fill(0);
  textSize(16);
  text("Done", width - 70, height - 20);
}

function drawResponseScreen() {
  image(drawingLayer, 0, 0);
  image(characterImg, 250, 80, 100, 200);

  fill(0);
  textSize(24);
  textAlign(CENTER);
  text(showMessage, width / 2, height - 60);
}

function mousePressed() {
  if (currentScreen === "start") {
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + 50
    ) {
      currentScreen = "draw";
    }
  } else if (currentScreen === "draw") {
    if (
      mouseX > width - 120 &&
      mouseX < width - 20 &&
      mouseY > height - 40 &&
      mouseY < height - 10
    ) {
      analyzeDrawing();
      currentScreen = "response";
    }
  }
}

function analyzeDrawing() {
  // Check average darkness in specific areas
  let headArea = drawingLayer.get(290, 90, 20, 20);
  let chestArea = drawingLayer.get(290, 180, 20, 20);
  let shoulderArea = drawingLayer.get(260, 150, 80, 20);

  let headDark = averageDarkness(headArea);
  let chestDark = averageDarkness(chestArea);
  let shoulderDark = averageDarkness(shoulderArea);

  if (headDark > 50) {
    showMessage = "With wisdom, I guide.";
  } else if (chestDark > 50) {
    showMessage = "With love, I lead.";
  } else if (shoulderDark > 50) {
    showMessage = "With courage, I soar.";
  } else {
    showMessage = "Thank you for your art!";
  }
}

function averageDarkness(region) {
  let total = 0;
  for (let i = 0; i < region.length; i += 4) {
    let r = region[i];
    let g = region[i + 1];
    let b = region[i + 2];
    let brightness = (r + g + b) / 3;
    total += 255 - brightness; // darkness
  }
  return total / (region.length / 4);
}
