# WPK-Snake
This is a simple snake game variant I made one afternoon after a test. I based the game off of a homework assignment I had in my SE 319 class. The homework assignment was much more basic than this, and I wanted to expand on it and try to get more familiar with HTML, CSS, and JavaScript.

Both the HTML and CSS are very basic as I was just trying to play around and get a nice looking page to play the game on.

The JavaScript file is partially based off of a YouTube video: Snake Game Using JavaScript https://www.youtube.com/watch?v=9TcU2C1AACw
but I have changed and added many different parts. I was mostly using the video as a guideline to make sure I stayed on the right track when I was setting up the basics of the game.
_____________________________________
To run the game you simply have to download the zip, unzip it, and then open wpksnake.html.

The goal of the game is to eat as much food as you can and get the highest score possible.

As of right now, the snake can collide with itself. I kind of like the idea of having a snake that can run over itself, so I think I am going to keep that feature. To counteract this, there will be obstacles on the screen that the snake will have to avoid.
__________________________
### Known issues
Because the snake can collide with itself, you can effectively make the snake do an instant 180 if you are fast enough at pressing the arrow keys. For example, if you are going left and quickly press the down arrow followed by the right arrow, the snake will appear to turn around. This is because the eventListener listens for new key presses faster than the snake is drawn to the canvas. I could speed up the draw rate, but then the snake would move extremely fast and I think that would detract from the game.

The biggest problem with the game currently is that the obstacles and food are using magic numbers to be placed, and they can be outside the canvas if the screen the user is playing on is not a 1920x1080 screen. The canvas now adjusts accordingly, but not the game itself if that makes sense.
