/**
 * Implementation of INSERTION SORTING ALGORITHM
 * @param {Object[]} list - list of data to sort;
 * @param {function(Object1, Object2)} operator - this function is used to determine which data is "greater" or "less",
 * Returns true if Object1 is "greater" than Object2, otherwise returns false;
 * @param {bool} [reverse=false] - this controls the order of the list,
 * Set to false means the order is from "low" to "high", and vice versa;
 */
function insertionSort(list, operator, reverse=false) {
  for(var i=1; i<list.length; i++) {
    var x=list[i];
    var j=i-1;
    // while j > 0 and Obj1 > Obj2 if reverse = false,
    // while j > 0 and Obj1 <= Obj2 if reverse = true,
    while(j>=0 && (operator(list[j], x)!=reverse)) {
      list[j+1]=list[j];
      j--;
    }
    list[j+1]=x;
  }
}

/**
 * Implementation of BUBBLE SORT ALGORITHM
 * @param {Object[]} list - list of data to sort;
 * @param {function(Object1, Object2)} operator - this function is used to determine which data is "greater" or "less",
 * Returns true if Object1 is "greater" than Object2, otherwise returns false;
 * @param {bool} [reverse=false] - this controls the order of the list,
 * Set to false means the order is from "low" to "high", and vice versa;
 */
function bubbleSort(list, operator, reverse=false) {
  var n=list.length;
  var newn;
  do {
    newn=0;
    for(var i=1; i<n; i++) {
      // if Obj1 > Obj2 when reverse = false,
      // if Obj1 <= Obj2 when reverse = true
      if(operator(list[i-1], list[i])!=reverse) {
        // swap 2 items
        var temp=list[i-1];
        list[i-1]=list[i];
        list[i]=temp;
        newn=i;
      }
    }
    // Set new place for the next loop
    n=newn;
  } while(n>0);
}
