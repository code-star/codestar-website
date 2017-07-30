import SlidePanel from './SlidePanel';
const cases = require('../data/cases.json');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class CasesTree {
  constructor() {
    this.$caseName =$('#caseName');
    this.$caseDesc = $('#caseDesc');
    this.$caseInfo = $('#caseInfo');

    CasesTree.slidePanel = new SlidePanel($('.cases-page'), ()=>{});
    $('.cases-page').on('click', '.open-panel', function() {
      CasesTree.slidePanel.showPanel($(this).data('panel'));
    });

    const svg = d3.select('body').append('svg').remove();

    const width = 800;
    const height = 300;

    const force = d3.layout.force()
      .charge(-1000)
      .linkDistance(() => getRandomInt(200, 300))
      .size([width, height]);

    svg
      .attr('width', width)
      .attr('height', height);

    const links = this.getLinks();

    force
    .nodes(cases.nodes)
    .links(links)
    .start();

  svg
  .append('defs')
      .selectAll('.node')
      .data(cases.nodes).enter()
      .append('pattern')
      .attr('id', function(c) {return 'icon' + c.icon})
      .attr('x', '0%')
      .attr('y', '0%')
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('viewBox', '0 0 120 120')
          .append('image')
          .attr('xlink:href', function(c) {return require('../img/Cases/' + c.icon)})
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 120)
          .attr('height', 120)
          /* IE 10 Doesn't support SVG filters and breaks the graphic if used. Curiously this doesn't happen in IE9 */
          .style('filter', (navigator.appVersion.indexOf('MSIE 10') === -1)?'url(#desaturate)':'');

    const link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'case-link');

    const node = svg.selectAll('.node')
    .data(cases.nodes)
    .enter().append('circle')
    .attr('class', 'case-node')
    .attr('r', () => getRandomInt(40, 45))
    .attr('id', function(c) {return c.id })
    .style('fill', function(c) {return 'url(#icon' + c.icon + ')'})
    .call(force.drag);

    node.append('title')
    .text(function(d) { return d.company; });

    node.on('mousedown', function(d) {
      var n = d3.select(this);
      // Capture starting position
      n.attr('data-startcx', n.attr('cx'))
      n.attr('data-startcy', n.attr('cy'))
    })

  const self = this;node.on('click', function(d) {
      let n = d3.select(this);

    // Check if the user is clicking or moving the node
    let tolerance = 20;
    if(Math.abs(n.attr('cx')- n.attr('data-startcx')) > tolerance ||
      Math.abs(n.attr('cy')- n.attr('data-startcy')) > tolerance) {
      // User is probably moving, do nothing
      return;
    }

    // Prevent double-clicking from executing this function twice
    if(n.attr('data-clickedon')) return;
    n.attr('data-clickedon', 'true')
    setTimeout(function() {
      n.attr('data-clickedon', null)
    }, 200);

      // Toggle the node
      if (!n.attr('old_r')) {
        self.openCaseInfo(node,

        n,d)
      } else {
        self.closeCaseInfo(n);
      }

    });

    force.on('tick', function() {
      node.attr('cx', function(d) { return d.x = Math.max(60, Math.min(width - 60, d.x)); })
      .attr('cy', function(d) { return d.y = Math.max(60, Math.min(height - 60, d.y)); });

      link.attr('x1', function(d) { return d.source.x; })
      .attr('y1', function(d) { return d.source.y; })
      .attr('x2', function(d) { return d.target.x; })
      .attr('y2', function(d) { return d.target.y; });
    });

    this.svg = svg;
    this.force = force;
  }

  getCasesTree() {
    return {
      svg: this.svg.node(),
      layout: this.force
    }
  }

  getLinks() {
    const size = cases.nodes.length;
    const links = [];
    for (let i = 0; i < size; ++i) {
      const n_links = getRandomInt(1, 2);
      for (let j = 0; j < n_links; ++j) {
        let target = getRandomInt(0, size);
        while (target === i) {
          target = getRandomInt(0, size);
        }
        links.push({'source': i, 'target': target});
      }
    }
    return links;
  }

  openCaseInfo(node, n, clickedNode) {
    node.each(function() {
      let m = d3.select(this);

      let old_r = m.attr('old_r');
      if (old_r) {
        m.attr('r', old_r);
      }
      m.attr('old_r', null);
    });

    n.attr('old_r', n.attr('r'));
    n.attr('r', 61);

    this.$caseName.html(clickedNode.company + '<br><span style="font-weight: normal">' + clickedNode.project + '</span>');
    this.$caseDesc.html(clickedNode.description);

    this.$caseInfo.slideDown(400)
  }

  closeCaseInfo(n) {
    n.attr('r', n.attr('old_r'));
    n.attr('old_r', null);

    this.$caseInfo.slideUp(400);
  }

}

export function getCasesTree(){
  const casesTree = new CasesTree();
  return casesTree.getCasesTree();
}