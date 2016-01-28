export function getBackgrounds() {

  const svg_part1 = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">\n'
                + '<linearGradient id="#gradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">\n';

  const svg_part2 = '</linearGradient>\n</svg>';

  let backgrounds = [];
  let colors = ['#030815','#041b36','#052d57','#073b72','#0c4d90','#01464af','#2b7ec5','#4f9cd6','#7bb9e5','#a0d5f3'];

  for (var i = 0; i < 9; ++i) {
    let svg = svg_part1;
    svg += '<stop stop-color="' + colors[i] + '" offset="0"/><stop stop-color="' + colors[i+1] + '" offset="1"/>\n';
    svg += '<rect x="0" y="0" width="1" height="1" fill="url(#gradient)" />';
    svg += svg_part2;
    svg = 'url(data:image/svg+xml;base64,' + window.btoa(svg) + ')';
    backgrounds.push(svg);
  }

  return backgrounds;
}
