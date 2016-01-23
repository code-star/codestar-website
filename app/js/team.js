var team = require('../data/team.json');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getTeamTree() {
  var svg = d3.select('body').append('svg').remove();

  var width = 800,
      height = 400;

  var force = d3.layout.force()
    .charge(-1000)
    .linkDistance(() => getRandomInt(100, 200))
    .size([width, height]);

  svg
    .attr('width', width)
    .attr('height', height);

  var size = team.nodes.length;
  var links = [];
  for (var i = 0; i < size; ++i) {
    var n_links = getRandomInt(1, 3);
    for (var j = 0; j < n_links; ++j) {
      var target = getRandomInt(0, size);
      while (target === i) {
        target = getRandomInt(0, size);
      }
      links.push({'source': i, 'target': target});
    }
  }

  force
      .nodes(team.nodes)
      .links(links)
      .start();

  var link = svg.selectAll('.link')
      .data(links)
      .enter().append('line')
      .attr('class', 'team-link');



  var node = svg.selectAll('.node')
      .data(team.nodes)
      .enter().append('circle')
      .attr('class', 'team-node')
      .attr('r', () => getRandomInt(10, 40))
      .style('fill', 'white')
      .call(force.drag);


  node.append('title')
      .text(function(d) { return d.name; });

  node.on('click', function(d) {
      var n = d3.select(this);

      node.each(function (d, i) {
        var m = d3.select(this);
        if (m != n) {
          var old_r = m.attr('old_r');
          if (old_r) m.attr('r', old_r);
          m.attr('old_r', null);
        }
      });

      if (!n.attr('old_r')) n.attr('old_r', n.attr('r'));
      n.attr('r', 60);

      $('#teamName').html(d.name + '<span style="font-weight: normal"> - ' + d.job + '</span>');
      $('#teamDesc').text(d.bio);
  });

  force.on('tick', function() {
    node.attr('cx', function(d) { return d.x = Math.max(60, Math.min(width - 60, d.x)); })
        .attr('cy', function(d) { return d.y = Math.max(60, Math.min(height - 60, d.y)); });

    link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });
  });

  return svg.node();
}
