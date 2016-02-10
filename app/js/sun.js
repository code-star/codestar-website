import { retinaCanvas } from './retinaCanvas';

export function getSun(r) {
  let factor = 3
  var rc = retinaCanvas(r*factor, r*factor);
  var ctx = rc.ctx;

  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';

  ctx.shadowColor = '#ffffff'
  ctx.shadowBlur = r;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  let center = r * factor/2

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

  var sunDiv = $('<div id="sun"/>');
  sunDiv.append(rc.canvas);

  return sunDiv;
}
