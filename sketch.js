var garden;

function setup() {
  createCanvas(400, 400);

  var color1 = color(240, 150, 30);
  var color2 = color(175, 100, 220);
  var color3 = color(158, 224, 249);
  var color4 = color(255, 184, 188)

  var flowerOne = new PlainFlower(width / 2 - 40, 3 * height / 4, color1);
  var flowerTwo = new PlainFlower(width / 2 + 40, 3 * height / 4, color2);
  var flowerThree = new FancyFlower(width / 2 + 90, 3 * height / 4, color3);
  var flowerFour = new FancyFlower(width / 2 - 90, 3 * height / 4, color4);

  garden = [flowerOne, flowerTwo, flowerThree, flowerFour];

  print(garden);
  noStroke();
}

function draw() {
  background(color(122, 229, 80));

  growOrChop(garden);
  drawPlants(garden);
}

class FancyFlower {
  constructor(x, y, petalColor) {
    this.x = x,
      this.y = y,
      this.petalColor = petalColor,

      // default properties
      this.size = 0;
    this.bloomSize = 0;

    // random default properties
    this.growSpeed = random(.5, 1.5);
    this.maxSize = random(50, 150);
    this.bloomSpeed = random(1, 3);
    this.maxBloomSize = random(50, 80);
  }

  drawBloom() {
    if (this.bloomSize > 0); {
      fill(this.petalColor);
      rect(this.x - 30, this.y - this.size - 50, this.bloomSize, this.bloomSize);

      fill("yellow");
      triangle(this.x + 30, this.y - this.size - 10, this.x - 30, this.y - this.size, this.x, this.y - this.size + 20)
    }
  }
}

/* Add your new functions above here ^^^

 !!! Do not change the helper functions below */

class PlainFlower {
  constructor(x, y, petalColor) {
    // properties from arguments
    this.x = x,
      this.y = y,
      this.petalColor = petalColor,

      // default properties
      this.size = 0;
    this.bloomSize = 0;

    // random default properties
    this.growSpeed = random(.5, 1.5);
    this.maxSize = random(100, 200);
    this.bloomSpeed = random(1, 3);
    this.maxBloomSize = random(50, 90);
  }

  drawBloom() {
    if (this.bloomSize > 0) {
      // petals
      fill(this.petalColor);
      ellipse(this.x, this.y - this.size, this.bloomSize, this.bloomSize);

      // center
      fill("yellow");
      ellipse(this.x, this.y - this.size, min(this.bloomSize / 4, 20), min(this.bloomSize / 4, 20));
    }
  }
}

function drawPlants(garden) {
  for (var flower in garden) {
    drawPlant(garden[flower]);
  }
}

function drawPlant(flower) {
  if (flower.size === 0) {
    drawDefaultSeed(flower);
  } else {
    drawDefaultSprout(flower);

    if (flower.drawBloom) {
      flower.drawBloom();
    } else {
      drawDefaultBloom(flower);
    }
  }
}

function drawDefaultSeed(flower) {
  fill(color(160, 104, 30));
  ellipse(flower.x, flower.y, 12, 7);
}

function drawDefaultSprout(flower) {
  fill(color(20, 102, 32));
  rect(flower.x, flower.y, 5, -flower.size);
}

function drawDefaultBloom(flower) {
  if (flower.bloomSize > 0) {
    fill(flower.petalColor);
    ellipse(flower.x, flower.y - flower.size, flower.bloomSize, flower.bloomSize);
  }
}

function growOrChop(garden) {
  for (var flower in garden) {
    if (mouseX > width / 2) {
      grow(garden[flower]);
    } else {
      chop(garden[flower]);
    }
  }
}

function grow(flower) {
  if (flower.size == flower.maxSize) {
    var bloom = flower.bloomSize + flower.bloomSpeed;
    flower.bloomSize = min(bloom, flower.maxBloomSize);
  } else {
    var newSize = flower.size + flower.growSpeed;
    flower.size = min(newSize, flower.maxSize);
  }
}

function chop(flower) {
  flower.size = 0;
  flower.bloomSize = 0;
}