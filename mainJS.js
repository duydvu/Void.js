var data = [];
$.getJSON("Data/numbers.js", function(result) {

  for(var i=0; i<result.array.length; i++) {
    data.push(result.array[i]);
    var row=$("<tr>").append($("<td>", {text : result.array[i] }));
    $("#dataTable").append(row);
  }
  var t1, t2;
  var m=[];
  for(var k=0; k<100; k++) {
    data=[];
    for(var i=0; i<result.array.length; i++) {
      data.push(result.array[i]);
    }
  t1 = performance.now();
  bubbleSort(data, function(obj1, obj2){
    return obj1>obj2;
  });
  t1 = performance.now() - t1;

  // for(var i=0; i<data.length; i++) {
  //   var cell=$("<td>", {text : data[i] });
  //   $("tr:eq("+i+")").append(cell);
  // }

  var data2=[];
  for(var i=0; i<result.array.length; i++) {
    data2.push(result.array[i]);
  }

  t2 = performance.now();
  heapSort(data2, function(obj1, obj2) {
    return obj1>obj2;
  });
  t2 = performance.now() - t2;
  m.push(t2/t1);
}
var s=0;
for(var i=0;i<m.length;i++)
  s+=m[i];
  s/=m.length;
  console.log(s);
  var b=true;
  for(var i=0; i<data.length; i++) {
    if(data[i]!=data2[i]) b=false;
    var cell=$("<td>", {text : data2[i] });
    $("tr:eq("+i+")").append(cell);
  }
  console.log(b);
});
