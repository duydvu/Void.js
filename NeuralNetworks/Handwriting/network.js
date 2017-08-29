/*
 * Neural network class for machine learning
 * Reference: http://neuralnetworksanddeeplearning.com/chap1.html
 */

const math = require('mathjs');
const fs = require('fs');

module.exports = {

  Network: function(sizes) {
    this.numLayers = sizes.length;          // number of layers
    this.sizes = sizes;                     // describe shape of the network
    this.biases = [];                       // matrix of biases
    this.weights = [];                      // matrix of weights
    // random initialization
    for(var i = 0; i < sizes.length - 1; i++) {
      this.biases[i] = [];
      this.weights[i] =[];
      for(var j = 0; j < sizes[i + 1]; j++) {
        this.biases[i].push([randn_bm()]);
        this.weights[i][j] =[];
        for(var k = 0; k < sizes[i]; k++)
          this.weights[i][j].push(randn_bm());
      }
    }

    // var o = JSON.parse(fs.readFileSync('./NeuralNetworks/Handwriting/data/TrainedSet.txt'));
    // this.biases = o.biases;
    // this.weights = o.weights;

    /**
      * The stochastic gradient descent function (SGD) used for training
      */
    this.SGD = function(trainingData, epochs, miniBatchSize, eta, testData) {
      var nTest = testData ? testData.length : null;
      var n = trainingData.length;
      for(var i = 0; i < epochs; i++) {
        shuffle(trainingData);
        var miniBatches = [];
        for(var j = 0; j < n; j += miniBatchSize) {
          var temp = [];
          for(var k = j; k < j + miniBatchSize; k++) {
            temp.push(trainingData[k]);
          }
          miniBatches.push(temp);
        }
        for(var j = 0; j < miniBatches.length; j++) {
          updateMiniBatch(this, miniBatches[j], eta);
        }
        if (testData)
            console.log("Epoch " + i + ": " + this.evaluate(testData) + " / " + nTest);
        else
            console.log("Epoch " + i + " complete");
      }
      var t = this;
      fs.writeFile('./NeuralNetworks/Handwriting/data/TrainedSet.txt', JSON.stringify({biases:t.biases,weights:t.weights}, null, "\t"), function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
      });
    }

    this.evaluate = function(testData) {
      var result = 0;
      for (var i = 0; i < testData.length; i++) {
        if(indexOfMax(feedForward(this, testData[i].x)) == indexOfMax(testData[i].y))
          result++;
      }
      return result;
    }
    return this;
  }

}

/**
  * calculate the output of the network respective to the input
  */
function feedForward(t, input) {
  var input = math.transpose([input]);
  var pre; // previous and current inputs
  // loop in each layer
  t.biases.forEach(function(biases, i) {
    // clone old input
    pre = input.slice();
    // calculate the output in each layer in make it the new input
    input.length = biases.length;
    input = sigmoid(math.add(math.multiply(t.weights[i], pre), biases));
  });
  return input;
}

/**
  * update the mini batch using gradient descent
  */
function updateMiniBatch(t, miniBatch, eta) {
  var l = miniBatch.length; // cache length
  var nabla_b = t.biases.slice();
  nabla_b.forEach(function(v, i, a) {
    a[i] = math.multiply(0, v);
  });
  var nabla_w = t.weights.slice();
  nabla_w.forEach(function(v, i, a) {
    a[i] = math.multiply(0, v);
  });
  for(var i = 0; i < l; i++) {
    var delta = backProp(t, math.transpose([miniBatch[i].x]), math.transpose([miniBatch[i].y]));
    nabla_b.forEach(function(v, j, a) {
      a[j] = math.add(v, delta.nabla_b[j]);
    });
    nabla_w.forEach(function(v, j, a) {
      a[j] = math.add(v, delta.nabla_w[j]);
    });
  }
  var e = eta / l;
  t.weights.forEach(function(v, i, a) {
    a[i] = math.subtract(v, math.multiply(e, nabla_w[i]));
  });
  t.biases.forEach(function(v, i, a) {
    a[i] = math.subtract(v, math.multiply(e, nabla_b[i]));
  });
}

/**
  * backpropagation algorithm to calculate partial derivatives of the cost function
  */
function backProp(t, x, y) {
  var nabla_b = t.biases.slice();
  var nabla_w = t.weights.slice();
  var activation = x.slice();
  var activations = [x];  // list to store all the activations, layer by layer
  var zs = [];            // list to store all the z vectors, layer by layer
  t.biases.forEach(function(biases, i) {
    var z = [];
    z = math.add(math.multiply(t.weights[i], activation), biases);
    activation.length = biases.length;
    activation = sigmoid(z);
    zs.push(z);
    activations.push(activation.slice());
  });
  var delta = math.subtract(activations[activations.length - 1], y);
  delta = math.dotMultiply(delta, sigmoidPrime(zs[zs.length-1]));
  nabla_b[nabla_b.length - 1] = delta;
  nabla_w[nabla_w.length - 1] = math.multiply(delta, math.transpose(activations[activations.length - 2]));
  for(var l = 2; l < t.numLayers; l++) {
    var sp = sigmoidPrime(zs[zs.length - l]);
    delta = math.dotMultiply(math.multiply(math.transpose(t.weights[t.weights.length - l + 1]), delta), sp);
    nabla_b[nabla_b.length - l] = delta;
    nabla_w[nabla_w.length - l] = math.multiply(delta, math.transpose(activations[activations.length - l - 1]));
  }
  return {nabla_b, nabla_w};
}

/**
  * calculate the expression: 1 / (1 + exp(-z))
  */
function sigmoid(z) {
  return math.dotDivide(1, math.add(1, math.exp(math.multiply(z, -1))));
}

/**
  * calculate the derivative of the sigmoid function
  */
function sigmoidPrime(z) {
  return math.dotMultiply(sigmoid(z), math.subtract(1, sigmoid(z)));
}

/**
  * shuffle data
  */
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

/**
  * Get index of the maximum value in array
  */
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

/**
  * Normal distribution
  * Via: Stackoverflow
  * https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
  */
function randn_bm() {
  var u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
