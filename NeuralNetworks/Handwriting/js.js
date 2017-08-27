var dir = function(x, y) {
  if(y < 100) y = "0" + y;
  if(y < 10)  y = "0" + y;
  return "/NeuralNetworks/Handwriting/hwrt/img00" + x + "-00" + y + ".png";
}

var pos = [105, 79, 70, 50, 47, 64, 64, 48, 32, 34]; // 0-9

var trainingData = [];
var l = pos.length;
var cnt = 0;
for(let i = 0; i < 1; i++) {
  for(let j = 4; j <= 4; j++) {
    trainingData[cnt] = {x: [], y: []};
    var img = new Image();

    $(img).on('load', function() {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
      var a = [];
      for(var k = 0; k < this.width; k++)
        for(var q = 0; q < this.height; q++) {
          a.push(canvas.getContext('2d').getImageData(k, q, 1, 1).data[0]);console.log(k,q);
        }
      // trainingData[cnt].x = a.slice();
    });
    img.src = dir(i + 1, j);

    trainingData[cnt].y = Array.apply(null, Array(l)).map(Number.prototype.valueOf,0);
    trainingData[cnt].y[i] = 1;

    cnt += 1;
  }
}
console.log(trainingData);
