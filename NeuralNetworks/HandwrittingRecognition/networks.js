class Network {
  constructor(sizes) {
    this.numLayers = sizes.length;
    this.sizes = sizes;
    this.biases = [];
    this.weights = [];
    for(var i=0; i<sizes.length-1; i++) {
      this.biases[i] = [];
      this.weights[i] =[];
      for(var j=0; j<sizes[i+1]; j++) {
        this.biases[i].push(Math.random()*2-1);
        this.weights[i][j] =[];
        for(var k=0; k<sizes[i]; k++)
          this.weights[i][j].push(Math.random()*2-1);
      }
    }
  }

  feedForward(input) {
    // loop in each layer
    let t = this;
    t.biases.forEach(function(biases, i) {
      // clone old input
      var old = JSON.parse(JSON.stringify(input));;
      // loop in each neural
      input.length = biases.length;
      biases.forEach(function(bias, j) {
        input[j] = bias;
        t.weights[i][j].forEach(function(weight, k) {
          input[j] += old[k] * weight;
        });
        input[j] = sigmoid(input[j]);
      });
    });
    return input;
  }

}

function sigmoid(z) {
  return 1/(1+Math.exp(-z));
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// var dir = function(x) {
//   return "NeuralNetworks/HandwrittingRecognition/hwrt/"+x+".png";
// }
//
// var img = new Image();
// img.src = dir(1);
// $(img).on('load', function() {
//   var canvas = document.createElement('canvas');
//   canvas.width = img.width;
//   canvas.height = img.height;
//   canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
//   var a = [];
//   for(var i=0; i<img.width; i++)
//     for(var j=0; j<img.height; j++) {
//       a.push(canvas.getContext('2d').getImageData(i, j, 1, 1).data[0]);
//     }
// });
