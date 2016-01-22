import { retinaCanvas } from './retinaCanvas';

export function getMoon(radius) {

  function lunarPhase() {
    var lp = 2551443;
    var now = new Date();
    var new_moon = new Date(1970, 0, 7, 20, 35, 0);
    var phase = ((now.getTime() - new_moon.getTime()) / 1000) % lp;
    var day = Math.floor(phase / (24 * 3600)) + 1;
    return (4 * day / 30) % 4 - 2;
  }

  var p = lunarPhase();
  var moonSettings = {
    'radius': radius,
    'phase': (p < 0 ? p + 1 : p - 1) + 0.001,
    'angle': 0.2,
    'col1': p >= 0 ? '#ebebeb' : '#00224b',
    'col2': p >= 0 ? '#00224b' : '#ebebeb',
    'col3': 'rgba(0, 84, 173, 0.25)'
  }

  function drawMoon(ctx, s) {
    function drawBody(ctx, x, y, r, p, col1, col2) {
      ctx.fillStyle = col1;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = col2;

      ctx.save();
      ctx.beginPath();

      ctx.arc(x, y, r, 1.5 * Math.PI, 0.5 * Math.PI);
      ctx.translate(x - (p * x), y - y);
      ctx.scale(p, 1.0);
      ctx.arc(x, y, r, 0.5 * Math.PI, 1.5 * Math.PI);

      ctx.restore();
      ctx.fill();
    }

    function drawCraterFlat(ctx, x, y, r, col) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
    }
    var r = s.radius;
    var p = s.phase;
    var col1 = s.col1;
    var col2 = s.col2;
    var col3 = s.col3;

    ctx.save();

    ctx.translate(r, r);
    ctx.rotate(s.angle);
    ctx.translate(-r, -r);

    ctx.clearRect(0, 0, 2 * r, 2 * r);

    drawBody(ctx, r, r, r, p, col1, col2);

    drawCraterFlat(ctx, 0.7 * r, 0.5 * r, 0.3 * r, col3);
    drawCraterFlat(ctx, 0.4 * r, 1.0 * r, 0.27 * r, col3);
    drawCraterFlat(ctx, 1.2 * r, 0.6 * r, 0.2 * r, col3);
    drawCraterFlat(ctx, 1.5 * r, 0.9 * r, 0.18 * r, col3);
    drawCraterFlat(ctx, 1.75 * r, 1.1 * r, 0.12 * r, col3);
    drawCraterFlat(ctx, 1.5 * r, 1.2 * r, 0.07 * r, col3);
    drawCraterFlat(ctx, 1.7 * r, 0.65 * r, 0.09 * r, col3);

    ctx.restore();
  }

  var rcMoon = retinaCanvas(2 * moonSettings.radius, 2 * moonSettings.radius);
  drawMoon(rcMoon.ctx, moonSettings);

  var moonDiv = $('<div id="moon"/>');
  moonDiv.append(rcMoon.canvas);

  return moonDiv;
}
