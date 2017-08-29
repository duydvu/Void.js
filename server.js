const express = require('express');
const path = require('path');
const fs = require('fs');
const network = require('./NeuralNetworks/Handwriting/network');
const app = express();math = require('mathjs');

var trainingData = [];
var trainingSize = 1000;
var testData = [];
var testSize = 1000;
var net = network.Network([784, 100, 10]);

app.use(express.static(path.join(__dirname, '/')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');

  // read training input
  fs.open('./NeuralNetworks/Handwriting/data/train-images.idx3-ubyte', 'r', function(status, fd) {
      if (status) {
        console.log(status.message);
        return;
      }
      var buffer = new Buffer(784);

      for(let i = 0; i < trainingSize; i++) {
        trainingData[i] = {x: null, y: null};
        var t = [];
        fs.readSync(fd, buffer, 0, 784, 16+784*i);
        for(let j = 0; j < 784; j++) {
          t.push(buffer.readUInt8(j));
        }
        trainingData[i].x = t;
      }
      for(let i = 0; i < testSize; i++) {
        testData[i] = {x: null, y: null};
        var t = [];
        fs.readSync(fd, buffer, 0, 784, 16+784*i);
        for(let j = 0; j < 784; j++) {
          t.push(buffer.readUInt8(j));
        }
        testData[i].x = t;
      }

      // read training output
      fs.open('./NeuralNetworks/Handwriting/data/train-labels.idx1-ubyte', 'r', function(status, fd) {
          if (status) {
            console.log(status.message);
            return;
          }
          var buffer = new Buffer(1);

          for(let i = 0; i < trainingSize; i++) {
            var t = Array.apply(null, Array(10)).map(Number.prototype.valueOf,0);
            fs.readSync(fd, buffer, 0, 1, i + 8);
            t[buffer.readUInt8(0)] = 1;
            trainingData[i].y = t;
          }
          for(let i = 0; i < testSize; i++) {
            var t = Array.apply(null, Array(10)).map(Number.prototype.valueOf,0);
            fs.readSync(fd, buffer, 0, 1, i + 8);
            t[buffer.readUInt8(0)] = 1;
            testData[i].y = t;
          }

          net.SGD(trainingData, 30, 100, 1, testData);

      });
  });



});

app.get('/network', function(req, res) {
  res.redirect('/NeuralNetworks/Handwriting');
});

app.get('/data', function(req, res) {
  res.send(trainingData);
});
