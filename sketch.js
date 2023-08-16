let TIME = 0;
let WAVE = [];

let slider;

/**
 * @remarks - p5.js has a built in function called setup() that runs once
 * @returns {void}
 */
function setup() {
  // createCanvas(800, 800);
  // rectMode(CENTER)

  createCanvas(windowWidth, windowHeight);

  slider = createSlider(1, 100, 1); //*creates a slider with a min, max, and starting value
}

/**
 * @remarks - p5.js has a built in function called draw() that loops over and over again
 * @param {number} TIME - the current time in seconds
 * @returns {void}
 */
function draw() {
  background(0); //black
  translate(width / 4, height / 2); //poistion the canvas

  let x = 0;
  let y = 0;

  /**
   * @param {number} i - the number of circles in fourier series
   */
  for (let i = 0; i < slider.value(); i++) {
    let n = i * 2 + 1; //odd numbers || -1
    let radius = 100 * (4 / (n * PI));
    let prevX = x;
    let prevY = y;

    x += radius * cos(n * TIME);
    y += radius * sin(n * TIME);

    stroke(255, 100); //white
    noFill(); //no fill inside the circle
    ellipse(prevX, prevY, radius * 2);

    // * create a line with a circle head that rotates around the main circle
    // let x = radius * cos(TIME); //! simple cosine wave
    // let y = radius * sin(TIME); //! simple sine wave

    fill(255);
    line(prevX, prevY, x, y); //draw a line from the center to the edge of the circle
    stroke(255);
    ellipse(x, y, 8); //draw a circle at the end of the line

    // rotate(TIME)
    // rect(0, 0, 100, 100)

    // for (const [i, y] of WAVE.entries()) {
    //   console.log(i);
    //   console.log(y);
    //   console.log(WAVE);
    //   point(i, WAVE[i]); //draws a point at the x and y coordinates
    // }
  }

  beginShape();
  WAVE.unshift(y); // creates the effect of a moving wave // unshift adds to the beginning of the array //* i don't wanna add to end of array
  translate(200, 0); //shifts the wave to the right
  line(x - 200, y, 0, WAVE[0]); //draw a line from the center to the edge of the circle

  ellipse(0, WAVE[0], 8); //draw a circle at the end of the wave
  noFill(); //no fill inside the circle
  for (const i in WAVE) {
    // point(i, WAVE[i]); //draws a point at the x and y coordinates
    vertex(i, WAVE[i]); //draws a line between the points
  }
  endShape();

  TIME += 0.02; //controls the speed of the rotation v = d/t, you can reverse direction by TIME -= 0.02

  if (WAVE.length > 500) {
    WAVE.pop(); //removes the last item in the array
  }
}
