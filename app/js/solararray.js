export function getArray(k) {
	var table = $('<table class="solar">');
  var tr = table.append('<tr>');
  for (var i = 0; i < k; ++i) {
  	var td = $('<td class="array">');
    for (var j = 0; j < k; ++j) {
    	td.append($('<div class="panel" data-scrollax="properties: { \'rotateY\': \'90deg\'}">'));
    }
    tr.append(td);
  }
  return table;
}
