/*jshint esversion: 6*/

var running = false;
/*
* These are magic numbers that will be wrong on different screen sizes
* I will fix this after I get out of school, but for now, they are used
* good for a screen size of 1920x1080
*
* Need to also fix magic numbers for the seWall and placeFood()
*/
const randMultiply = 6;
const vertX = 9;
const vertY = 11;
const vertLength = 6;
const horX = 29;
const horY = 4;
const horLength = 7;
const xX = 32;
const xY = 20;
const xLength = 9;

function run() {
  // Preventing multiple games running at once
  if (running)
    return;
  else
    running = true;
  document.getElementById("start").value = "Start";
  const ctx = document.getElementById("canvas").getContext("2d");
  const moveUnit = 20;
  // Basic background for the game, mine is white.
  const background = new Image();
  background.src = "./bgsnake.jpg";
  const width = document.getElementById("canvas").width;
  const height = document.getElementById("canvas").height;
  var snake = [];
  snake[0] = {
    x: 1 * moveUnit,
    y: 5 * moveUnit
  };
  var snakeFood = {
    x: 0,
    y: 0
  };
  var vertOb = [];
  var horOb = [];
  var xOb = [];
  var seWall = [];
  placeVert();
  placeHor();
  placeX();
  placeSeWall();
  placeFood();

  // Eventlister to pay attention to the keys being pressed
  document.addEventListener("keydown", direction);

  /* Prevent arrow keys from scrolling when playing the game.
   * Found code on stackoverflow and changed it very slightly to not ignore spacebar.
   * <https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser> */
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);

  //Initialze the starting direction to be to the right.
  var dir = "RIGHT";
  //Start drawing.
  var game = setInterval(draw, 50);

  // See what the last key was pressed was, and change the direction accordingly
  function direction(event) {
    if (event.keyCode == 37 && dir != "RIGHT") {
      dir = "LEFT";
    } else if (event.keyCode == 38 && dir != "DOWN") {
      dir = "UP";
    } else if (event.keyCode == 39 && dir != "LEFT") {
      dir = "RIGHT";
    } else if (event.keyCode == 40 && dir != "UP") {
      dir = "DOWN";
    }
  }

  /* Generate a vaild position for the snakeFood
   * Basically just make sure it isn't in the same
   * spot as the snake/obstacle(s). */
  function placeFood() {
    let good = false;
    let newX;
    let newY;
    while (!good) {
      /* Need the Math.floor() so the food lines up properly,
       * otherwise the snake might not be able to eat it! */
      /* Fix magic numbers during summer! */
      newX = Math.floor(Math.random() * 35 + 1) * moveUnit;
      newY = Math.floor(Math.random() * 35 + 1) * moveUnit;
      // Can probably change conditional to  if (good)... then won't need continue
      good = foodObsCheck(snake, newX, newY);
      if (good)
        good = foodObsCheck(vertOb, newX, newY);
      if (good)
        good = foodObsCheck(horOb, newX, newY);
      if (good)
        good = foodObsCheck(xOb, newX, newY);
      if (good)
        good = foodObsCheck(seWall, newX, newY);
    }
    snakeFood = {
      x: newX,
      y: newY
    };
  }

  // Check to see if the food position is where an obstacle/the snake is.
  function foodObsCheck(obstacle, newX, newY) {
    let oGood = false;
    for (let i = 0; i < obstacle.length; i++) {
      if (newX == obstacle[i].x && newY == obstacle[i].y) {
        oGood = false;
        return oGood;
      } else {
        oGood = true;
      }
    }
    return oGood;
  }


  // Place the vertical obstacle
  function placeVert() {
    let ranX = Math.floor(Math.random() * randMultiply) + vertX;
    let ranY = Math.floor(Math.random() * randMultiply) + vertY;
    for (let i = 0; i < vertLength; i++) {
      let newVert = {
        x: (ranX) * moveUnit,
        y: (ranY + i) * moveUnit
      };
      if (i > (vertLength - (vertLength / 2) - 1)) {
        newVert = {
          x: (ranX) * moveUnit,
          y: (ranY + 1 + i) * moveUnit
        };
      }
      vertOb.unshift(newVert);
    }
  }

  // Place the horizontal obstacle
  function placeHor() {
    let ranX = Math.floor(Math.random() * randMultiply) + horX;
    let ranY = Math.floor(Math.random() * randMultiply) + horY;
    for (let i = 0; i < horLength; i++) {
      let newHor = {
        x: (ranX + i) * moveUnit,
        y: ranY * moveUnit
      };
      if (i > horLength % 5) {
        newHor = {
          x: (ranX + i + 1) * moveUnit,
          y: ranY * moveUnit
        };
      }
      horOb.unshift(newHor);
    }
  }

  // Place the X shaped obstacle
  function placeX() {
    let ranX = Math.floor(Math.random() * randMultiply) + xX;
    let ranY = Math.floor(Math.random() * randMultiply) + xY;
    for (let i = 0; i < xLength; i++) {
      let newXOb = {
        x: (ranX + i) * moveUnit,
        y: (ranY + i) * moveUnit
      };
      if (i != xLength % 5)
        xOb.unshift(newXOb);
    }
    for (let i = 0; i < xLength; i++) {
      let newXOb = {
        x: (ranX + 8 - i) * moveUnit,
        y: (ranY + i) * moveUnit
      };
      if (i != xLength % 5)
        xOb.unshift(newXOb);
    }
  }

  // Place "wall" in lower left corner
  // Poorly made with magic numbers that
  // only work with a 1920x1080 screen
  // will fix after classes get out!
  function placeSeWall() {
    let seBlockTop = {
      x: 0,
      y: 27 * moveUnit
    };
    seWall.unshift(seBlockTop);
    let i = 0;
    while (i < 5) {
      let seDiag = {
        x: (3 + i) * moveUnit,
        y: (27 + i) * moveUnit
      };
      seWall.unshift(seDiag);
      i++;
    }
    let seBlockBot1 = {
      x: (2 + i) * moveUnit,
      y: (28 + i) * moveUnit
    };
    let seBlockBot2 = {
      x: (2 + i) * moveUnit,
      y: (29 + i) * moveUnit
    };
    seWall.unshift(seBlockBot1);
    seWall.unshift(seBlockBot2);
  }

  // Simple check to see if the snake ran into a wall/obstacle
  function endCheck() {
    let isOver = false;
    if ((snake[0].x < 0 || snake[0].x >= width) || (snake[0].y < 0 || snake[0].y >= height))
      isOver = true;
    if (!isOver)
      isOver = snakeObCheck(vertOb);
    if (!isOver)
      isOver = snakeObCheck(horOb);
    if (!isOver)
      isOver = snakeObCheck(xOb);
    if (!isOver)
      isOver = snakeObCheck(seWall);
    return isOver;
  }

  // Helper method
  function snakeObCheck(obstacle) {
    for (let i = 0; i < obstacle.length; i++) {
      if (snake[0].x == obstacle[i].x && snake[0].y == obstacle[i].y)
        return true;
    }
    return false;
  }

  // Now draw the new snake!
  function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = "mediumvioletred";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.5;
      ctx.fillRect(snake[i].x, snake[i].y, moveUnit, moveUnit);
      ctx.strokeRect(snake[i].x, snake[i].y, moveUnit, moveUnit);
    }
  }

  // Draw food... little know fact, snake food is both square and green!
  function drawFood() {
    ctx.fillStyle = "green";
    ctx.fillRect(snakeFood.x, snakeFood.y, moveUnit, moveUnit);
  }

  // Draw the obstacles
  function drawObs(obstacle) {
    for (let i = 0; i < obstacle.length; i++) {
      ctx.fillStyle = "black";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.5;
      ctx.fillRect(obstacle[i].x, obstacle[i].y, moveUnit, moveUnit);
      ctx.strokeRect(obstacle[i].x, obstacle[i].y, moveUnit, moveUnit);
    }
  }

  function draw() {
    //Redraw the background so you don't see the old snake.
    ctx.drawImage(background, 0, 0);
    drawSnake();
    drawObs(vertOb);
    drawObs(horOb);
    drawObs(xOb);
    drawObs(seWall);
    drawFood();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move the snake in the correct direction.
    if (dir == "RIGHT") {
      snakeX += moveUnit;
    } else if (dir == "DOWN") {
      snakeY += moveUnit;
    } else if (dir == "LEFT") {
      snakeX -= moveUnit;
    } else if (dir == "UP") {
      snakeY -= moveUnit;
    }

    /* If the snake is over the food, it eats it (surprise!), so make a new food.
     * The new food cannot be spawned in a location that the snake already occupies.
     *  Otherwise, remove the tail */
    if (snakeX == snakeFood.x && snakeY == snakeFood.y) {
      placeFood();
    } else {
      snake.pop();
    }
    let head = {
      x: snakeX,
      y: snakeY
    };
    // Add the new position to the front of the snake array.
    snake.unshift(head);
    if (endCheck()) {
      clearInterval(game);
      running = false;
      document.getElementById("start").value = "Game Over! Your score was: " + snake.length;
    }
  }
}
