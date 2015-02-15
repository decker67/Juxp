(function(window) {

  function moveBall() {
    if (ballX < 0 || ballX > 500) {
      console.log('x',xPixelPerIteration);
      xPixelPerIteration *= -0.9;
    }
    if (ballY < 0 || ballY > 500) {
      console.log('y', yPixelPerIteration);
      yPixelPerIteration *= -0.9;
      gravity = 0;
      ballY = 500;
    }

    ballX += xPixelPerIteration;
    ballY += yPixelPerIteration;
    ballX -= Math.sign(xPixelPerIteration)*friction;
    ballY += gravity;
    gravity += 0.3;
    if (friction < xPixelPerIteration) {
      friction += Math.sign(xPixelPerIteration)*0.02;
    } else {
      friction = xPixelPerIteration;
    }

    setY(ballY);
    setX(ballX);

    if (Math.trunc(yPixelPerIteration) !== 0 || friction !== xPixelPerIteration) {
      window.requestAnimationFrame(moveBall);
    }
  }

  function getValue(node, attribute) {
    return node.getAttribute(attribute);
  }

  function setX(x) {
    ball.setAttribute('cx', x);
  }

  function setY(y) {
    ball.setAttribute('cy', y);
  }

  function handleStart(event) {
    var touch =  event.changedTouches[0];
    touchStartFromX = touch.clientX;
    touchStartFromY = touch.clientY;
    touchStartAt = Date.now();
  }

  function handleMove(event) {
    var touch =  event.changedTouches[0];
    ballX = touch.clientX;
    ballY = touch.clientY;
    setX(ballX);
    setY(ballY);
  }

  function handleEnd(event) {
    var touch =  event.changedTouches[0];
    touchEndAtX = touch.clientX;
    touchEndAtY = touch.clientY;
    touchEndAt = Date.now();
    deltaT = touchEndAt - touchStartAt;
    deltaX = touchEndAtX - touchStartFromX;
    deltaY = touchEndAtY - touchStartFromY;
    xPixelPerIteration = deltaX/(60*deltaT/1000);
    yPixelPerIteration = deltaY/(60*deltaT/1000);
    gravity = 0;
    friction = 0;
    window.requestAnimationFrame(moveBall);
  }


  var ball = window.document.getElementById('ball');
  var ballX = parseInt(getValue(ball, 'cx'));
  var ballY = parseInt(getValue(ball, 'cy'));
  var gravity = 0;
  var friction = 0;
  var touchStartAt;
  var touchEndAt;
  var touchStartFromX;
  var touchStartFromY;
  var touchEndAtX;
  var touchEndAtY;
  var deltaT;
  var deltaX;
  var deltaY;
  var xPixelPerIteration;
  var yPixelPerIteration;

  ball.addEventListener("touchstart", handleStart, false);
  ball.addEventListener("touchend", handleEnd, false);
  ball.addEventListener("touchmove", handleMove, false);

})(window);