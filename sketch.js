//global variables for different elements in the sketch
let song1;
let song2;
let song3;
let song4;

let fft;
let stars = [];

//scene 1
let SMALLBOX = [];
let conSmallBox;
let mappedBass;

let red;
let green;
let blue;

let neg = -80;
let pos = 80;
let boxsize = 35;
let angle = 0;

// for arces 
let gap = 15;
let cirNum = 15;
let cirSize = 300;
let circAngle = 0;

//scene 2
let galaxy = [];
let galaxy2 = [];

let num = 600;
let distance = .5;
let maxPos = 500;
widthHeightRatio = .6;
let rotationGradient;

let delta = 0.3;


function preload() { // loads items before running the sketch
  song1 = loadSound('the-introvert-michael-kobrin-10959.mp3'); //prelaods the audio in the browser
  song2 = loadSound('melodic-techno-03-extended-version-moogify-9867.mp3'); // ...
  song3 = loadSound('everything-feels-new-15241.mp3');
  song4 = loadSound('black-box-android-9401.mp3');

  medium = loadFont('Rajdhani-Medium.ttf'); //preloads the font used
}



function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL); //creates a 3D canvas that fills the entire window
  angleMode(DEGREES); // changes angle mode from radians to degrees
  smooth(10); // enebles anti-aliasing to improve edges quality in 3D
  fft = new p5.FFT(); //creates a new Fast Fourier Transform which analyse audio frequencies
  background(0); //black background :)

  setupButtons();

  //small boxes array
  for (let i = 0; i < 9; i++) { // for loop to create 8 new elements of the constructor
    SMALLBOX[i] = new SmallBox(random(neg, pos), random(neg, pos), random(neg, pos)); //creates a new element in the array 
  }


  amplitude = new p5.Amplitude(); //measures volume of sound


  for (i = 0; i < num; i++) { // for loop to create new elements of the constructor
    let maxPosition = maxPos + i * distance; //defining a global variable to set position
    galaxy.push(new Galaxy(maxPosition)); //creates a new element in the array 
    galaxy2.push(new Galaxy2(maxPosition)); //creates a new element in the array 
  }
}



function setupButtons() { // THIS CODE WAS TAKEN FROM https://michaelallam.panel.uwe.ac.uk/Audio%20Visual%20Submission/AUDIO%20VISUAL%20SUBMISSION/ 
  //setting a style for the buttons

  // First button, song 1
  song = loadSound("the-introvert-michael-kobrin-10959.mp3"); // loads sound 
  button = createButton("SONG I"); //create a button with the text on it
  button.parent("buttons"); // a way to attach elements to one that is the main element, like a container
  button.style("background-color", 'pink'); //style for setting background behind buttons
  button.style('color', 'black'); //text colour
  button.style("margin-right", "10px"); // sets margin for buttons
  button.size(100, 45); // button size
  button.mousePressed(() => togglePlaying("SONG I", button, song)); // calls the song when mouse is pressed

  // the code below has the same function but to creatw different buttons

  // Second button, song 2
  song2 = loadSound("melodic-techno-03-extended-version-moogify-9867.mp3");
  button2 = createButton("SONG II");
  button2.parent("buttons");
  button2.style("background-color", 'lightblue');
  button2.style('color', 'black');
  button2.style("margin-right", "10px");
  button2.size(100, 45);
  button2.mousePressed(() => togglePlaying("SONG II", button2, song2)); 

  // Third button, song 3
  song3 = loadSound("everything-feels-new-15241.mp3"); 
  button3 = createButton("SONG II");
  button3.parent("buttons");
  button3.style("background-color", 'lightgreen');
  button3.style('color', 'black');
  button3.style("margin-right", "10px");
  button3.size(100, 45);
  button3.mousePressed(() => togglePlaying("SONG III", button3, song3)); 

  // Fourth button, song 4
  song4 = loadSound("black-box-android-9401.mp3"); 
  button4 = createButton("SONG IIII");
  button4.parent("buttons");
  button4.style("background-color", 'yellow');
  button4.style('color', 'black');
  button4.style("margin-right", "10px");
  button4.size(100, 45);
  button4.mousePressed(() => togglePlaying("SONG IIII", button4, song4)); 

  // Volume Slider
  volSlider = createSlider(0, 1, 0.5, 0.01); // creates a volume slider that starts by defult at 50% and increases/decreases 0.01 unit
  volSlider.parent("Volume"); //linking volume to slider

}


function togglePlaying(name, button, song) { // THIS CODE WAS TAKEN FROM https://michaelallam.panel.uwe.ac.uk/Audio%20Visual%20Submission/AUDIO%20VISUAL%20SUBMISSION/ and with help for various coding train videos to understand it
  if (!song.isPlaying()) { //sets a condition: if song is not playing
    song.play(); // then mouse press will play song
    button.html("Pause"); //text changes to 'pause' on button
  } else if (song.isPlaying()) { // if song is playing
    song.pause(); //song pause
    button.html(name); // changes the text in the button to the name defined in setupButtons function
  }
}



function draw() {
  background(0); //black background :)
  noFill(); // no fill for objects :)
  stroke(255); //stroke is white
  ambientLight(255, 255, 255); //creates a light that comes from all sources and has a colour

  // THIS CODE WAS TAKEN FROM https://michaelallam.panel.uwe.ac.uk/Audio%20Visual%20Submission/AUDIO%20VISUAL%20SUBMISSION/ 
  song.setVolume(volSlider.value()); //linking song to slider to control volume
  song2.setVolume(volSlider.value()); //repeated for each of the 4 songs
  song3.setVolume(volSlider.value());
  song4.setVolume(volSlider.value());


  // frequency analysis
  let spectrum = fft.analyze(); // to allow using the getEnergy functions
  let treble = fft.getEnergy("treble"); // to get treble frequency range values
  let mid = fft.getEnergy("mid"); // to get mid frequency range values
  let bass = fft.getEnergy("bass"); // to get bass frequency range values


  push(); // push pop seperates the function of the code within from affecting other elements
  fill(255); //fill is white
  textSize(50); //sets text size to 50px
  textAlign(CENTER); // align text to the center
  textFont(medium); // slects the font we loaded previously
  text('switch between artworks with keys 1 & 2', 0, 0); //the text and its position
  textSize(30);  //sets text size to 30px
  text('Hope you enjoy the visuals of this humble, minimal visualiser :)', 0, 50); //the text and its position
  pop();  // push pop seperates the function of the code within from affecting other elements


  switch (key) { //switch key method calls what's inside each case when it's used, here we use keyboard keys 
    case "1": // when key 1 is clicked
      clear(); //clears canvas to prevent overlaping
      //arces inside
      push(); // push pop seperates the function of the code within from affecting other elements
      rotate(circAngle); //sets rotation to be defined by circAngle
      circAngle = map(treble, 0, 255, -100, 100); //circAngle get it's value from mapping treble, so the value changes accordingly
      background(0);
      noFill();
      stroke(255);
      strokeWeight(1); // stroke weight :)
      for (let i = 0; i < cirNum; i++) { // for loop for the arces inside
        arc(0, 0, cirSize + gap * i, cirSize + gap * i, circAngle * i, 100 + circAngle / 2); //draws an arc
      }
      pop(); // push pop seperates the function of the code within from affecting other elements


      //rotating boxes on edges 

      //treble
      push();
      boxsize = map(treble, 0, 50, 30, 40); //box size changes according to treble analysis
      for (i = 0; i < 360; i += 90) {
        background(0); //black background :)
        noFill();
        stroke(255);
        push();
        rotate(i);
        translate(0, 300, 0); // translates 300 in y-axis
        rotateZ(angle); //rotation in z-axis
        if (treble > 10) { //sets a condition
          let red = map(treble, 0, 50, 0, 255); // mapping treble to change color value randomly
          let green = map(mid, 0, 255, 0, 255);
          let blue = map(bass, 0, 255, 0, 255);
          ambientMaterial(red, green, blue); //if the condition true then ambientMaterial works on boxes, to make it change color at certain treble analysis
        }
        box(boxsize); //draws 3D box
        pop();
      }
      angle += 1; //angle value keeps increasing allowing loop rotation
      pop();

      //mid
      push();
      boxsize = map(mid, 0, 255, 30, 10); //box size changes according to mid analysis
      for (i = 0; i < 360; i += 90) {
        noFill();
        stroke(255);
        push();
        rotate(i + 30);
        let translateMid = map(mid, 0, 255, 300, 0); //maps mid values 
        translate(0, translateMid, 0); //translation changes according to mid values
        if (mid > 100) {
          let red = map(bass, 0, 50, 0, 255);
          let green = map(bass, 0, 255, 0, 255);
          let blue = map(treble, 0, 255, 0, 255);
          ambientMaterial(red, green, blue);
        }
        rotateZ(angle / 2);
        box(boxsize);
        pop();
      }
      angle += 1;
      pop();

      //bass
      push();
      boxsize = map(bass, 0, 255, 30, 70);
      for (i = 0; i < 360; i += 90) {
        noFill();
        stroke(255);
        push();
        rotate(i + 60);
        translate(0, 300, 0);
        rotateZ(angle / 3);
        if (bass > 240) { //sets a condition 
          normalMaterial(); //if condition is true, material changes to normal, one quite specular
          noStroke(); //if condition is true, no stoke
        }
        box(boxsize);
        pop();
      }
      angle += 1;
      pop();



      //big box in center
      push();
      rotateY(frameCount * .5); //rotates the shape around y-axis
      rotateX(frameCount * .5); //rotates the shape around x-axis
      middleBox(); //calls the functioan to draw a box
      pop();

      for (let i = 0; i < SMALLBOX.length; i++) {
        push();
        SMALLBOX[i].update();
        if (mid > 90) { //sets a condition to only show when mid is bigger that 90
          conSmallBox = 1; //if true it shows
        } else {
          conSmallBox = 0; //if false it dosen't
        }
        SMALLBOX[i].display(); //calls function from constructor
        SMALLBOX[i].checkEdges(); //calls function from constructor
        pop();
      }


      // sphere in center
      push();
      noFill();
      strokeWeight(.3);
      if (bass > 240) {
        normalMaterial();
      }
      rotateY(frameCount * -2); //rotates the shape around y-axis, reverted
      rotateZ(frameCount * -2); //rotates the shape around x-axis, reverted
      let bassSphere = map(bass, 0, 255, 10, 70);
      sphere(bassSphere); //sphere's size changes according to bass analysis
      pop();


      //outter visualiser 
      dancingCircle(); // to call the function for the outter circle

      let s = new Stars();
      stars.push(s); // to push a new element to the array infinitely

      for (i = stars.length - 1; i >= 0; i--) { // iterate backwards in the array because when it was forward stars flicker when a star is removed from the array using splice (idk why, but this solution from the vid helps) 
        if (!stars[i].checkEdge()) { //if it returns true " ! for true "
          stars[i].update(bass > 240); // to update stars location | 'bass > 240' adds a condition, the rest of the consition is on outside.js
          stars[i].display(); // to show stars
        } else { // if it returns false
          stars.splice(i, 1); //removes one star (element from the array), by removing stars out of canvas it keeps performance fast and light
        }
      }

      break; // the end of the function when key 1 is pressed/scene 1

    case "2": //scene switch when pressed
      clear();

      //I commented out the camera because it affected scene 1, need to learn how to fix it

      // cam.pan(delta);
      // // every 160 frames, switch direction
      // if (frameCount % 160 === 0) {
      //   delta *= -1;
      // }

      let level = amplitude.getLevel(); //anaylises level of volume


      let mappedTreble = map(treble, 0, 50, 180 / num, 360 / num); //mapping the treble for the rotation values of the galaxy
      let mappedMid = map(mid, 0, 255, 1, 80); //mapping the mid 

      // let levelRange = map(level, 0, 1, 1, 300);
      //let rotationVol = map(levelRange, 1, 300, 1 / num, 180 / num);


      rotationGradient = 90 / num;
      rotationMouse = map(mouseX, 0, width, 180 / num, 720 / num); //maps mouse on x-axis, to change rotation angle of galaxy

      push();
      translate(0, 0);
      rotateX(frameCount * .5); //rotates in x-axis
      rotateY(frameCount * 0.5);//rotates in y-axis
      rotateZ(frameCount * 0.5);//rotates in z-axis
      normalMaterial();
      torus(20 + mappedMid, 10, 8, 8); //draws torus in the center that changes size when mid changes
      noStroke();
      torus(5, 10, 8, 8); //the little torus in the middle of the big one, to look like speakers
      pop();


      // treple red stars
      push();
      fill(255, 200, 200);
      scale(.5); //scaling down to half
      for (i = 0; i < num / 2; i++) {
        rotate(mappedTreble);
        galaxy[i].display();
        galaxy[i].update();
      }
      pop();

      // mouse blue stars
      push();
      fill(200, 200, 255);
      for (i = 0; i < num; i++) {
        rotate(rotationMouse); //rotates with th mouse mapped previously
        if (bass > 200 && i % 11 == 2) { //if bass is bigger than 200 and i value has a reminder of 2 when divided by 11 (to pick less elemnts randomly)
          cond = 1;
          galaxy2[i].condition(cond);//I was exploring how I could add a certain condition to achive a certain result. More in report
          galaxy2[i].display();
          galaxy2[i].update();
        } else {
          cond = 0;
          galaxy2[i].display();
          galaxy2[i].update();
        }

      }
      pop();

      // mouse white stars
      push();
      scale(1.5);
      fill(255);
      for (i = 0; i < num; i++) {
        rotate(-.5 * rotationMouse); //rotates with th mouse mapped previously but reversed and slowd
        galaxy[i].display();
        galaxy[i].update();
      }
      pop();

      break; // the end of the function when key 2 is pressed/ scene 2
  }
}








//outter visualiser and stars

function dancingCircle() {
  let wave = fft.waveform(); //to draw the waveform of a sound

  for (t = -1; t <= 1; t += 2) { // to make a full circle we run for loop twice, one positive for the right side, and one neg to mirror it on the other side
    beginShape(); // starts drawing the shape out of vertices
    for (let i = 0; i <= 180; i += .5) { // increment by 0.5 insteasd of 1 to make the wave more complex
      let index = floor(map(i, 0, 180, 0, wave.length - 1)); //to make sure the all values in the wave are covered even if the screen is smaller than the array length

      let r = map(wave[index], -1, 1, 200, 600); //mapping the index for the waveform (waveforms are only -1 to 1) radius to be min 200 and max 600

      let x = r * sin(i) * t; // using polar coordinates to draw half a circle with the waveform, multiplied by t to get the other half mirrored 
      let y = r * cos(i); //I need to use https://math.libretexts.org/Bookshelves/Precalculus/Book%3A_Precalculus__An_Investigation_of_Functions_(Lippman_and_Rasmussen)/05%3A_Trigonometric_Functions_of_Angles/5.03%3A_Points_on_Circles_Using_Sine_and_Cosine to explain
      vertex(x, y); // to draw the wave :)
    }
    endShape();
  }
}

class Stars {
  constructor() {
    this.loc = p5.Vector.random2D().mult(400); //https://www.youtube.com/watch?v=jupjuq9Jl-M&ab_channel=TheCodingTrain 
    this.vel = createVector(0, 0); // to create velocity that starts at 0, then acceleration is added to it
    this.acc = this.loc.copy().mult(random(0.0001, 0.00001)); // to get the same diraction as the location for stars, then multiplied to reduce its values since acceleration shouldn't be as big as that heh, random to make it look more natural
    this.r = random(1.5, 4); // random radius from the values
    this.color = (random(0, 255), random(0, 255), random(0, 255));
  }

  display() {
    push();
    noStroke();
    fill(255); // fill white
    ellipse(this.loc.x, this.loc.y, this.r); // draw an ellipse to make stars like shapes
    pop();
  }

  update(cond) {
    this.vel.add(this.acc); // add acceleration to velocity
    this.loc.add(this.vel); // add velocity to position 
    if (cond) { // if the condition returns true, then velocity increses making stars move faster to the beat
      this.loc.add(this.vel); // adding vel to location to increase/update movement
      this.loc.add(this.vel); // increase velocity
      this.loc.add(this.vel); // increase velocity
    }
  }

  checkEdge() { // to write a condition for stars staying withing canvas
    if (this.loc.x < -width / 2 || this.loc.x > width / 2 || this.loc.y < -height / 2 || this.loc.y > height / 2) { // to stay within borders of the canvas (window)
      return true // returns true if the 4 conditons are met
    } else {
      return false // false if 4 conditions aren't met
    }
  }
}

//scene 1

function middleBox() { //draws the big box using lines
  //top and bottom
  push()
  stroke(255); //white stroke for the shapes
  strokeWeight(1);
  noFill();
  line(neg, pos, pos, pos, pos, pos);
  line(neg, pos, neg, pos, pos, neg);
  line(neg, neg, pos, pos, neg, pos);
  line(neg, neg, neg, pos, neg, neg);
  //sides
  line(neg, pos, pos, neg, neg, pos);
  line(neg, pos, neg, neg, neg, neg);
  line(pos, pos, pos, pos, neg, pos);
  line(pos, pos, neg, pos, neg, neg);
  //diagonale
  line(neg, pos, pos, neg, pos, neg);
  line(neg, neg, pos, neg, neg, neg);
  line(pos, pos, pos, pos, pos, neg);
  line(pos, neg, pos, pos, neg, neg);
  pop();
}

class SmallBox { //constructor for small boxes in the big box in the center of scene 1

  constructor(startX, startY, startZ) { //template of elements
    this.x = startX; 
    this.y = startY;
    this.z = startZ;
    this.r = 8;


    this.xVel = random(0.1, 1); //to create velocity
    this.yVel = random(0.1, 1);
    this.zVel = random(0.1, 1);

  }

  update() {
    this.x = this.x + this.xVel; //updating speed of elements
    this.y = this.y + this.yVel;
    this.z = this.z + this.zVel;
  }

  display() {
    push();
    translate(this.x, this.y, this.z); //translate differently
    noStroke();
    if (conSmallBox === 1) { //if condition is true it shows colors
      let red = map(this.x, -100, 100, 0, 255);
      let green = map(this.y, -100, 100, 0, 255);
      let blue = map(this.z, -100, 100, 0, 255);
      ambientMaterial(red, green, blue);
    } else if (conSmallBox === 0) { //if condition is false, no colors or stroke to hide them
      noFill();
      noStroke();
    }
    box(this.r);
    pop();


  }

  checkEdges() { //setting conditions for boxes to reverse direction when reaching the lines of the bigger box
    if (this.x > pos - (this.r / 2)) {
      this.xVel *= -1;
      this.x = pos - (this.r / 2);
    } else if (this.x < neg + (this.r / 2)) {
      this.xVel *= -1;
      this.x = neg + (this.r / 2);
    }

    if (this.y > pos - (this.r / 2)) {
      this.yVel *= -1;
      this.y = pos - (this.r / 2);
    } else if (this.y < neg + (this.r / 2)) {
      this.yVel *= -1;
      this.y = neg + (this.r / 2);
    }

    if (this.z > pos - (this.r / 2)) {
      this.zVel *= -1;
      this.z = pos - (this.r / 2);
    } else if (this.z < neg + (this.r / 2)) {
      this.zVel *= -1;
      this.z = neg + (this.r / 2);
    }

  }

}


// function rotateBoxes() {
//   for (i = 0; i < 360; i += 90) {
//     noFill();
//     stroke(255);
//     push();
//     rotate(i);
//     translate(0, 300, 0);
//     rotateZ(angle);
//     box(boxsize, boxsize, boxsize);
//     pop();
//   }
//   angle += 1;
// }





//scene 2
class Galaxy { //constructor for the galaxy shape, from https://www.youtube.com/watch?v=UgG64d4VQSc&ab_channel=UnderstandingtheUniverseThroughCode 

  constructor(maxPos) {
    this.size = random(1, 2);
    this.size2;
    this.maxPosition = maxPos;
    this.minPosition = maxPos * widthHeightRatio;
    this.theta = random(360);
    this.deltaTheta = .1;
  }


  display() {

    let x = (this.maxPosition / 2) * cos(this.theta);
    let y = (this.minPosition / 2) * sin(this.theta);
    noStroke();
    push();
    translate(x, y);
    sphere(this.size);
    pop();
    //circle(x, y, this.size);

  }



  update() {
    this.theta = this.theta + this.deltaTheta;
  }


}

class Galaxy2 extends Galaxy { // parenting from the original galaxy constructor to add a new function

  constructor(maxPos) {
    super(maxPos);

  }


  display() {

    super.display();

  }



  update() {
    super.update();
  }

  condition(cond) { //adds condition to change particle sizes when bass > 200 && i % 11 == 2 in the draw function
    if (cond === 1) {
      this.size = random(1, 10);
    } else if (cond === 0) {
      this.size = random(1, 2);
    }

  }
}
