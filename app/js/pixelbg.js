function getRandomDouble(min, max) {
  return Math.random() * (max-min) + min
}

// Keep the middle clear
function getPixelPos() {
  var pos = {"left": -1, "top": -1}
  do {
    pos.left = getRandomDouble(0, 95)
    pos.top = getRandomDouble(5, 95)
  }while(pos.left > 30 && pos.left < 60 && pos.top > 30 && pos.top < 63);
  return pos
}

let colors = ['#030815','#041b36','#052d57','#073b72','#0c4d90','#1464af','#2b7ec5','#4e9bd5','#7bb9e5','#aad6f4'];

let blinkspeedBase = 500 //ms
let minsize = 1.5 //vmin
let maxsize = 2.5 //vmin

export function getPixel() {

  let pos = getPixelPos()
  let size = getRandomDouble(minsize, maxsize)
  let color = colors[Math.floor(Math.random() * colors.length)]

  var pixel = $('<div class="bgPixel">')
    .css("left", pos.left + "%")
    .css("top", pos.top + "%")
    .css("background-color", color)
    .css("color", color)

  let blinkspeed = blinkspeedBase*size
  let csssize = size + "vmin"
  pixel.animate({"width": csssize, "height": csssize, "margin-left": 0, "margin-right": 0}, blinkspeed, function() {
    pixel.animate({"width": 0, "height": 0, "margin-left": size/2 + "vmin", "margin-top": size/2 + "vmin"}, blinkspeed, function() {
      pixel.remove()
    })
  })

  return pixel
}