/*jshint esversion: 6*/

function run() {
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

  /* Generate a vaild position for the initial snakeFood
   * Basically just make sure it isn't in the same
   * spot as the snake. */
  let fGood = false;
  let fX;
  let fY;
  while (!fGood) {
    /* Need the Math.floor() so the food lines up properly,
     * otherwise the snake might not be able to eat it! */
    fX = Math.floor(Math.random() * 28 + 1) * moveUnit;
    fY = Math.floor(Math.random() * 28 + 1) * moveUnit;
    if (fX != snake[0].x && fY != snake[0].y) {
      fGood = true;
    } else {
      fGood = false;
    }
  }
  var snakeFood = {
    x: fX,
    y: fY
  };

  // Eventlister to pay attention to the keys being pressed
  document.addEventListener("keydown", direction);
  //Initialze the starting direction to be to the right.
  var dir = "RIGHT";
  //Start drawing.
  var game = setInterval(draw, 50);

  // See what the last key was pressed was.
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

  // Simple check to see if the snake ran into a wall
  function endCheck() {
    return (snake[0].x < 0 || snake[0].x >= width) || (snake[0].y < 0 || snake[0].y >= height);
  }

  function draw() {
    //Redraw the background so you don't see the old snake.
    ctx.drawImage(background, 0, 0);
    //Now draw the new snake!
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = "mediumvioletred";
      ctx.fillRect(snake[i].x, snake[i].y, moveUnit, moveUnit);
    }
    // Draw food... little know fact, snake food is both square and green!
    ctx.fillStyle = "green";
    ctx.fillRect(snakeFood.x, snakeFood.y, moveUnit, moveUnit);
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
      let good = false;
      let newX;
      let newY;
      while (!good) {
        /* Need the Math.floor() so the food lines up properly,
         * otherwise the snake might not be able to eat it! */
        newX = Math.floor(Math.random() * 28 + 1) * moveUnit;
        newY = Math.floor(Math.random() * 28 + 1) * moveUnit;
        for (let i = 0; i < snake.length; i++) {
          if (newX != snake[i].x && newY != snake[i].y) {
            good = true;
          } else {
            good = false;
          }
        }
      }
      snakeFood = {
        x: newX,
        y: newY
      };
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
      document.getElementById("start").value = "Game Over! Your score was: " + snake.length;
    }
  }
}

/* If the game is over and you click the button, restart the game */
if(document.getElementById("start").value != "Start"){
  run();
}
