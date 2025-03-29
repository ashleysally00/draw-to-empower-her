let currentScreen = "start";
let drawingLayer;
let characterImg;
let showMessage = "";
let selectedSymbol = "";

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
  textFont("Arial");
}

function draw() {
  background(220);

  if (currentScreen === "start") {
    drawStartScreen();
  } else if (currentScreen === "draw") {
    drawDrawingScreen();
  } else if (currentScreen === "chooseSymbol") {
    drawSymbolChoiceScreen();
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
  image(characterImg, 175, 80, 250, 300); // narrower and centered

  fill(50);
  textAlign(CENTER);
  textSize(16);
  text(
    "✨ Draw a heart, a star, or a crown to reveal a secret message...",
    width / 2,
    30
  );
  text("Or draw anything else to create your own magic.", width / 2, 50);

  if (mouseIsPressed && mouseY < height - 50) {
    drawingLayer.stroke(0);
    drawingLayer.strokeWeight(4);
    drawingLayer.line(mouseX, mouseY, pmouseX, pmouseY);
  }

  // Done button
  fill(100, 255, 150);
  rect(width - 120, height - 40, 100, 30, 10);
  fill(0);
  textSize(16);
  text("Done", width - 70, height - 20);
}

function drawSymbolChoiceScreen() {
  image(drawingLayer, 0, 0);
  image(characterImg, 175, 80, 250, 300); // match position

  fill(0);
  textAlign(CENTER);
  textSize(20);
  text("What did you draw?", width / 2, 30);

  drawSymbolButton(440, 160, "❤️ Heart", "heart");
  drawSymbolButton(440, 200, "👑 Crown", "crown");
  drawSymbolButton(440, 240, "⭐ Star", "star");
  drawSymbolButton(440, 280, "🎨 Something else", "other");
}

function drawSymbolButton(x, y, label, symbolKey) {
  fill(selectedSymbol === symbolKey ? "#cceeff" : 255);
  stroke(0);
  rect(x, y, 140, 30, 8);
  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, x + 70, y + 15);
}

function drawResponseScreen() {
  image(drawingLayer, 0, 0);
  image(characterImg, 175, 80, 250, 300); // match position

  fill(0);
  textAlign(CENTER);
  textSize(24);
  text(showMessage, width / 2, 50);

  // "Draw Again" button - moved down
  fill(200, 230, 255);
  rect(width / 2 - 60, height - 30, 120, 30, 8);
  fill(0);
  textSize(16);
  text("Draw Again", width / 2, height - 10);
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
      currentScreen = "chooseSymbol";
    }
  } else if (currentScreen === "chooseSymbol") {
    if (mouseX > 440 && mouseX < 580) {
      if (mouseY > 160 && mouseY < 190) selectedSymbol = "heart";
      else if (mouseY > 200 && mouseY < 230) selectedSymbol = "crown";
      else if (mouseY > 240 && mouseY < 270) selectedSymbol = "star";
      else if (mouseY > 280 && mouseY < 310) selectedSymbol = "other";

      if (selectedSymbol !== "") {
        showMessage = getMessageFromSymbol(selectedSymbol);
        currentScreen = "response";
      }
    }
  } else if (currentScreen === "response") {
    if (
      mouseX > width / 2 - 60 &&
      mouseX < width / 2 + 60 &&
      mouseY > height - 30 &&
      mouseY < height
    ) {
      drawingLayer.clear();
      drawingLayer.background(255);
      selectedSymbol = "";
      showMessage = "";
      currentScreen = "draw";
    }
  }
}

function getMessageFromSymbol(symbol) {
  switch (symbol) {
    case "heart":
      return "With love, I lead.";
    case "crown":
      return "With wisdom, I guide.";
    case "star":
      return "With courage, I soar.";
    default:
      return "Thank you for your art!";
  }
}
