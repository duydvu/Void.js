var data = [];
// $.getJSON("Data/numbers.js", function(result) {
//
//   for(var i=0; i<result.array.length; i++) {
//     data.push(result.array[i]);
//     var row=$("<tr>").append($("<td>", {text : result.array[i] }));
//     $("#dataTable").append(row);
//   }
//   var t1, t2;
//   var m=[];
//   for(var k=0; k<100; k++) {
//     data=[];
//     for(var i=0; i<result.array.length; i++) {
//       data.push(result.array[i]);
//     }
//     t1 = performance.now();
//     bubbleSort(data, function(obj1, obj2){
//       return obj1>obj2;
//     });
//     t1 = performance.now() - t1;
//
//     // for(var i=0; i<data.length; i++) {
//     //   var cell=$("<td>", {text : data[i] });
//     //   $("tr:eq("+i+")").append(cell);
//     // }
//
//     var data2=[];
//     for(var i=0; i<result.array.length; i++) {
//       data2.push(result.array[i]);
//     }
//
//     t2 = performance.now();
//     heapSort(data2, function(obj1, obj2) {
//       return obj1>obj2;
//     });
//     t2 = performance.now() - t2;
//     m.push(t2/t1);
//   }
//   var s=0;
//   for(var i=0;i<m.length;i++)
//     s+=m[i];
//     s/=m.length;
//     console.log(s);
//     var b=true;
//     for(var i=0; i<data.length; i++) {
//       if(data[i]!=data2[i]) b=false;
//       var cell=$("<td>", {text : data2[i] });
//       $("tr:eq("+i+")").append(cell);
//     }
//     console.log(b);
// });

$.getJSON("Data/numbers.js", function(result) {
  var array=[];
  for(var i=0; i<20; i++) {
    array.push(result.array[i]);
  }
  var bst=toBinarySearchTree(array);
  console.log(bst.add(1));
  function displayBST(BST) {
    if(BST==null)
      return;
    // append root
    $("#binarySearchTree").append($("<div>", {class : "node node"+BST.level, text : BST.value}));
    // append the rest
    function addChild(BST, location, left) {
      if(BST==null)
        return;
      if(left) {
        $(location).before($("<div>", {class : "node node"+BST.level, text : BST.value}));
        location=$(location).prev();
      }
      else {
        $(location).after($("<div>", {class : "node node"+BST.level, text : BST.value}));
        location=$(location).next();
      }
      addChild(BST.leftChild, location, true);
      addChild(BST.rightChild, location, false);
    }
    addChild(BST.leftChild, $("#binarySearchTree .node")[0], true);
    addChild(BST.rightChild, $("#binarySearchTree .node:last"), false);
  }
  displayBST(bst);
  for(var i=0; i<=Math.floor(Math.log(array.length)/Math.log(2)); i++) {
    $(".node"+i).css("margin-top", 60*i+"px");
  }
  $("#binarySearchTree").css("width", array.length*50+"px");

  console.log(bst.find(491));
});
