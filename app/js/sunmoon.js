import { retinaCanvas } from './retinaCanvas';

function getSun(size, r) {
  let factor = (size/r);
  var rc = retinaCanvas(r*factor, r*factor);
  var ctx = rc.ctx;

  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';

  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = r;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  let center = r * factor/2;

  ctx.beginPath();
  ctx.arc(center, center, 0.83*r, 0, 2 * Math.PI);
  ctx.fill();

  var a0 = 1.29;
  var d = (2 * Math.PI * r) / (29 * 2);
  ctx.setLineDash([d]);
  ctx.beginPath();
  ctx.arc(center, center, 0.89*r, Math.PI * a0, Math.PI * (a0 + 2));
  ctx.stroke();

  ctx.setLineDash([]);
  var da = (2 * Math.PI / 16);
  for (var i = 0; i < 16; ++i) {
  	var a = i * da;
  	ctx.beginPath();
    var l = i % 2 == 0 ? 0.99 : 1.2;
    ctx.moveTo(center + 0.92*r*Math.cos(a), center + 0.92*r*Math.sin(a));
    ctx.lineTo(center + l*r*Math.cos(a), center + l*r*Math.sin(a));
  	ctx.stroke();
  }

  var sunDiv = $('<div id="sun" class="noMouse"/>');
  sunDiv.append(rc.canvas);

  return sunDiv;
}

function getMoon(size, radius) {

  let factor = (size/radius)
  let center = radius * factor/2

  function lunarPhase() {
    var lp = 2551443;
    var now = new Date();
    var new_moon = new Date(1970, 0, 7, 20, 35, 0);
    var phase = ((now.getTime() - new_moon.getTime()) / 1000) % lp;
    var day = Math.floor(phase / (24 * 3600)) + 1;
    return (4 * day / 30) % 4 - 2;
  }

  //var p = lunarPhase();
  var p = 0
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
      ctx.shadowColor = '#ffffff';

      ctx.shadowBlur = 0.8*r;
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

    drawBody(ctx, center, center, r, p, col1, col2);

    drawCraterFlat(ctx, center - .3 * r, center - .5 * r, 0.3 * r, col3);
    drawCraterFlat(ctx, center - .6 * r, center, 0.27 * r, col3);
    drawCraterFlat(ctx, center + .2 * r, center - 0.4 * r, 0.2 * r, col3);
    drawCraterFlat(ctx, center + .5 * r, center - 0.1 * r, 0.18 * r, col3);
    drawCraterFlat(ctx, center + .75 * r, center + .1 * r, 0.12 * r, col3);
    drawCraterFlat(ctx, center + .5 * r, center + .2 * r, 0.07 * r, col3);
    drawCraterFlat(ctx, center + .7 * r, center - 0.35 * r, 0.09 * r, col3);

    ctx.restore();
  }

  var rcMoon = retinaCanvas(factor * moonSettings.radius, factor * moonSettings.radius);
  drawMoon(rcMoon.ctx, moonSettings);

  var moonDiv = $('<div id="moon" class="noMouse"/>');
  moonDiv.append(rcMoon.canvas);

  return moonDiv;
}

export function initiateSunMoon(centerpage) {
   //Initiate sun & moon
   let moonsunboxsize = 200
   var moon = getMoon(moonsunboxsize,50);
   var sun = getSun(moonsunboxsize,55);
   $('body').append(moon);
   $('body').append(sun);
  //$('#ninthPage').append(sun);

   function sunPosition(slide) {
     let x = (slide-centerpage)
     return {
       // Start at -5%, end at 30%
       "left": ((30+5)/4) * x -5,
       // Start at -6%, end at 95%
       "top": ((90+6)/4) * x - 6
     }
   }
   function moonPosition(slide) {
     let x = (centerpage-slide)
     return {
       // Start at 0%, end at 40%
       "right": (40/4) * x + 0,
       // Start at 5%, end at 85%
       "bottom": ((85-5)/4) * x + 5
     }
   }

   function setSunMoonCss(obj, pos) {
     $.each(pos, function(cssattr, v) {
       obj.css(cssattr, "calc(" + v + "% - " + (moonsunboxsize/2) + "px)")
     })
   }

   // Sun and moon control
   let fadeSpeed = 350;
   return {'fpOnLeave': function(index, nextIndex, direction) {
     var sun = $('#sun')
     let sunShow = (nextIndex > centerpage)
     let sunPos = sunPosition(Math.max(nextIndex,centerpage))
     setSunMoonCss(sun, sunPos)
     sun.css("opacity", sunShow?"1.0":"0")

     var moon = $('#moon')
     let moonShow = (nextIndex < centerpage)
     let moonPos = moonPosition(Math.min(nextIndex,centerpage))
     setSunMoonCss(moon, moonPos)
     moon.css("opacity", moonShow?"1.0":"0")
   }}
}