let body = document.body[0];
let container = document.querySelector(".container");
let allObstacles = [];
let colors = ["green", "green", "red"];
let collector = document.getElementById("collector");

// create single obstacle
class Obstacle {
  constructor(yPos) {
    this.yPos = -50;
  }
  randomnum() {
    let randX = Math.floor(Math.random() * (container.clientWidth - 50));
    return randX;
  }
  createObstacle() {
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    let bgColor = colors[Math.floor(Math.random() * colors.length)];
    obstacle.style.width = "50px";
    obstacle.style.height = "50px";
    obstacle.style.position = "absolute";
    obstacle.style.left = this.randomnum() + "px";
    obstacle.style.top = this.yPos + "px";
    obstacle.style.backgroundColor = bgColor;
    obstacle.dataset.behave = bgColor;
    container.appendChild(obstacle);
    return obstacle;
  }
  element = this.createObstacle();
  updatePosition() {
    this.yPos += 2;
    this.element.style.top = this.yPos + "px";
  }
  kill() {
    this.element.remove();
  }
}

// drop obstacles
let dropObs = setInterval(function() {
  allObstacles.forEach(function(obs) {
    obs.updatePosition();
  });
  allObstacles.forEach(function(obs) {
    if (checkCollision(obs, collector)) {
      console.log("hit");
    }
    if (obs.yPos > container.clientHeight) {
      obs.kill();
    }
  });
}, 10);

// generate obstacle
let generateObs = setInterval(function() {
  let obs = new Obstacle();
  allObstacles.push(obs);
}, 2000);

// check hit
function checkCollision(obj1, obj2) {
  var obj1Y = obj1.offsetTop;
  var obj2Y = obj2.offsetTop;
  var obj1X = obj1.offsetLeft;
  var obj2X = obj2.offsetLeft;
  if (
    obj2Y + 100 >= obj1Y &&
    obj2Y <= obj1Y + 100 &&
    obj2X + 100 >= obj1X &&
    obj2X <= obj1X + 100
  ) {
    return 1;
  }
}

// if (checkCollision(obj1, obj2)) {
//   console.log("hit");
// }
