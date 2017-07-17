/**
 * This is the Implementation of the binary search tree
 * @param {Object} BinarySearchTree - The binary search tree object has 3 datas: value, leftChild and rightChild;
 * @param {Object} BinarySearchTree.value - The value of the binary search tree;
 * @param {number} BinarySearchTree.level - The level of each node, root has level 0, leaf has level log(N);
 * @param {Object} [BinarySearchTree.leftChild=null] - Its left child;
 * @param {Object} [BinarySearchTree.rightChild=null] - Its right child;
 */
function BinarySearchTree(value, level, leftChild=null, rightChild=null) {
  this.value=value;
  this.level=level;
  this.leftChild=leftChild;
  this.rightChild=rightChild;
}
/**
 * The BST builder function
 * @param {Object[]} list - The original unordered array used to build the BST;
 * @param {number} [start] - The start of the array;
 * @param {number} [end] - The end of the array;
 * @param {function(Object1, Object2)} [operator] - Use this function to do the comparison;
 */
function toBinarySearchTree(list, start=0, end=list.length-1, operator=function(obj1, obj2){return obj1>obj2;}) {
  // Heapsort to sort the array
  heapSort(list, operator);

  /**
   * Build the binary search tree
   * @param {number} level - store level of nodes
   */
  function buildBST(start, end, level) {
    // 0 length case
    if(start>end)
      return null;
    // 1 length case
    if(start==end)
      return new BinarySearchTree(list[start], level);
    var middle=Math.floor((start+end)/2);               // index of the root is at the middle
    var root=new BinarySearchTree(list[middle], level);
    root.leftChild=buildBST(start, middle-1, level+1);  // left child from start to middle-1
    root.rightChild=buildBST(middle+1, end, level+1);   // right child from middle+1 to end
    return root;
  }
  return buildBST(start, end, 0);
}
