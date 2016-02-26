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

function lunarPhase() {
  var lp = 2551443;
  var now = new Date();
  var new_moon = new Date(1970, 0, 7, 20, 35, 0);
  var phase = ((now.getTime() - new_moon.getTime()) / 1000) % lp;
  var day = Math.floor(phase / (24 * 3600)) + 1;
  return (4 * day / 30) % 4 - 2;
}

function getMoon(size, radius) {

  let factor = (size/radius)
  let center = radius * factor/2

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

// Gives a function that computes a line based on 2 points
function line(p1, p2) {
  // computer y = a * x + b
  let dy = p2.y - p1.y
  let dx = p2.x - p1.x
  let a = dy/dx
  let b = p1.y - (p1.x * a)
  return (x) => a * x + b
}

// Returns a function that calculates body position based for any slide
// domslide is the slide the body is in in the DOM, pos
function celestialBodyPosition(domslide, slide1, slide2) {
  let horpos = line({x: slide1.slide, y: slide1.x}, {x: slide2.slide, y: slide2.x})
  let vertpos = line({x: slide1.slide, y: slide1.y}, {x: slide2.slide, y: slide2.y})
  /*let vertoffset = function(slide) {
    return -100 * (domslide - slide)
  }*/

  return (slide) => {return {x: horpos(slide), y: vertpos(slide)/*+vertoffset(slide)*/}}
}

function setCelestialBodyCss(obj, pos, boxsize) {
  obj.css({transform: 'translateY(calc(' + pos.y + 'vh - ' + (boxsize/2) + 'px))'
  + ' translateX(calc(' + pos.x + 'vw - ' + (boxsize/2) + 'px))'})
}

function addBodyToNewSlide(slideId, bodyId, body, pos, moonsunboxize) {
  $(bodyId).remove()
  $(slideId + ' .content').append(body)
  setCelestialBodyCss($(bodyId), pos, moonsunboxize)
}

function moveCelestialBody(nextIndex, index, bodyPosition, slides, newBody, moonsunboxsize, centerpage, bodyId, showBody) {
  // If going down, put the sun on the new slide and then animate it
  // If going up, animate the sun and then put it on the new slide
  // This is because content from "lower" slides is placed over content of "higher" slides
  if (nextIndex > index) {
    // Put sun back at previous position compensating for position difference between slides
    let oldPos = bodyPosition(index)
    oldPos.y -= 100 * (nextIndex - index)

    addBodyToNewSlide(slides[nextIndex], bodyId, newBody, oldPos, moonsunboxsize)
    if(!showBody) {
      $(bodyId).css('opacity', 0)
    }

    // Settimeout to activate the css transform
    setTimeout(() => {
      setCelestialBodyCss($(bodyId), bodyPosition(nextIndex), moonsunboxsize)
    }, 0)
  } else {
    let moveToPos = bodyPosition(nextIndex)
    // Compensate for the number of slides in between by adding 100vh for every slide
    moveToPos.y += 100 * (nextIndex - index)
    setCelestialBodyCss($(bodyId), moveToPos, moonsunboxsize)
    $(bodyId).css('opacity', 1)

    if (showBody) {
      setTimeout(() => {
        addBodyToNewSlide(slides[nextIndex], bodyId, newBody, bodyPosition(nextIndex), moonsunboxsize)
      }, 1100)
    } else {
      $(bodyId).css('opacity', 0)
    }
  }
}

export function initiateSunMoon(centerpage, slides) {
  let moonsunboxsize = 200

  let sunPosition = celestialBodyPosition(9, {slide: 5, x: -5, y: -6}, {slide: 9, x: 30, y: 95})
  let moonPosition = celestialBodyPosition(9, {slide: 6, x: 15, y: 15}, {slide: 1, x: -20, y: -60})

  // return function that changes sun & moon position on slide change
  return {
   'onSlideChange': function (index, nextIndex, direction) {

     let newSun = $(getSun(moonsunboxsize, 55))
     let showSun = (nextIndex > centerpage)
     moveCelestialBody(nextIndex, index, sunPosition, slides, newSun, moonsunboxsize, centerpage, "#sun", showSun);

     let newMoon = $(getMoon(moonsunboxsize, 55))
     let showMoon = (nextIndex < centerpage)
     moveCelestialBody(nextIndex, index, moonPosition, slides, newMoon, moonsunboxsize, centerpage, "#moon", showMoon);
   }
  }
}