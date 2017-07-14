$(document).ready(function() {
  $.getJSON("Data/numbers.js", function(result) {

        for(var i=0; i<result.array.length; i++) {
          var row=$("<tr>").append($("<td>", {text : result.array[i] }));
          $("#dataTable").append(row);
        }
        insertionSort(result.array, function(obj1, obj2){
          return obj1>obj2;
        }, true);
        for(var i=0; i<result.array.length; i++) {
          var cell=$("<td>", {text : result.array[i] });
          $("tr:eq("+i+")").append(cell);
        }
        bubbleSort(result.array, function(obj1, obj2) {
          return obj1>obj2;
        });
        for(var i=0; i<result.array.length; i++) {
          var cell=$("<td>", {text : result.array[i] });
          $("tr:eq("+i+")").append(cell);
        }
    });
});
