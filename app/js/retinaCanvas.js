export function retinaCanvas(canvasWidth, canvasHeight) {
  var canvas = $('<canvas/>').get(0);
  var ctx = canvas.getContext('2d');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  if (window.devicePixelRatio) {
    $(canvas).attr('width', canvasWidth * window.devicePixelRatio);
    $(canvas).attr('height', canvasHeight * window.devicePixelRatio);
    $(canvas).css('width', canvasWidth);
    $(canvas).css('height', canvasHeight);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  return {'canvas': canvas, 'ctx': ctx};
}
