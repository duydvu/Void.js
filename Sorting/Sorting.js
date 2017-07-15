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

/**
 * Implementation of HEAPSORT ALGORITHM
 * This algorithm uses the binary heap structure
 * The binary tree structure is implemented in the array as the following rule:
 * - iParent(i) = floor(i - 1) / 2 ;
 * - iLeftChild(i) = 2 * i + 1 ;
 * - iRightChild(i) = 2 * i + 2 ;
 * @param {Object[]} list - list of data to sort;
 * @param {function(Object1, Object2)} operator - this function is used to determine which data is "greater" or "less",
 * Returns true if Object1 is "greater" than Object2, otherwise returns false;
 * @param {bool} [reverse=false] - this controls the order of the list,
 * Set to false means the order is from "low" to "high", and vice versa;
 */
function heapSort(list, operator, reverse=false) {
  // First we build the heap in the array so that the largest value is at the root
  // <heapify>
  var count=list.length; // store length of the list
  // start is the last parent node of the list, so one of its children is in the last index (count-1)
  var start=Math.floor((count-2)/2);  // iParent(count-1)
  for(; start>=0; start--) {

    // <siftDown>
    var root=start;
    while(2*root+1 < count) { // left child of root: iLeftChild(root)
      var child=2*root+1; // left child of root
      var swap=root;  // keeps track of child to swap with
      // Now we find the largest element between the root, its left and right child
      // Then swap the largest element with the root
      if(operator(list[child], list[swap])!=reverse)  // Compare swap with the left child
        swap=child; // swap may now be the index of the left child
      if(child+1<count && (operator(list[child+1], list[swap]) != reverse)) // Compare swap with the right child if it exists
        swap=child+1; // swap may now be the index of the right child
      // Assume that the heaps rooted at its children are valid
      if(swap==root)
        break;  // No change happens
      else {
        //  swapping
        var temp=list[root];
        list[root]=list[swap];
        list[swap]=temp;
        root=swap;
      }
    }
    // </siftDown>

  }
  // </heapify>

  // Back to main
  // The array consists of two parts: the heap and the sorted array
  // The process above had created the heap with the size of the array
  // Now we will create the sorted array by removing the root (the largest element of the heap) to the end of the array,
  // where we place the sorted array, and continue the process until the array is fully sorted
  var end=count-1;
  while(end>0) {
    // swapping the root of the heap to the front of the sorted array
    var temp=list[end];
    list[end]=list[0];
    list[0]=temp;
    // reduce the size of the heap
    end--;
    // restore the heap property
    // <siftDown>
    var root=0;
    while(2*root+1 <= end) { // left child of root: iLeftChild(root)
      var child=2*root+1; // left child of root
      var swap=root;  // keeps track of child to swap with
      // Now we find the largest element between the root, its left and right child
      // Then swap the largest element with the root
      if(operator(list[child], list[swap])!=reverse)  // Compare swap with the left child
        swap=child; // swap may now be the index of the left child
      if(child+1<=end && (operator(list[child+1], list[swap]) != reverse)) // Compare swap with the right child if it exists
        swap=child+1; // swap may now be the index of the right child
      // Assume that the heaps rooted at its children are valid
      if(swap==root)
        break;  // No change happens
      else {
        //  swapping
        var temp=list[root];
        list[root]=list[swap];
        list[swap]=temp;
        root=swap;
      }
    }
    // </siftDown>
  }
}
