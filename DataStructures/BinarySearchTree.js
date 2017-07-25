/**
 * This is the Implementation of the binary search tree
 * @param {Object} BinarySearchTree - The binary search tree object;
 * @param {Object} BinarySearchTree.value - The value of the binary search tree;
 * @param {number} BinarySearchTree.level - The level of each node, root has level 0, leaf has level log(N);
 * @param {Object} [BinarySearchTree.parents=null] - Its parents;
 * @param {Object} [BinarySearchTree.leftChild=null] - Its left child;
 * @param {Object} [BinarySearchTree.rightChild=null] - Its right child;
 */
function BinarySearchTree(value, level, parents=null, leftChild=null, rightChild=null) {
  this.value      =value;
  this.level      =level;
  this.parents    =parents;
  this.leftChild  =leftChild;
  this.rightChild =rightChild;
}

/**
 * The BST builder function
 * @param {Object[]} list - The original unordered array used to build the BST;
 * @param {number} [start] - The start of the array;
 * @param {number} [end] - The end of the array;
 * @param {function(Object1, Object2)} [operator] - The function used to compare the objects in the BST,
 * returns true if obj1 ">" obj2, otherwise returns false;
 */
function toBinarySearchTree(list, start=0, end=list.length-1, operator=function(obj1, obj2){return obj1>obj2;}) {
  // Heapsort to sort the array
  heapSort(list, operator);

  /**
   * Build the binary search tree
   * @param {number} level - store level of nodes
   */
  function buildBST(start, end, level, parent) {
    // 0 length case
    if(start>end)
      return null;
    // 1 length case
    if(start==end)
      return new BinarySearchTree(list[start], level, parent);
    // n > 1 length case
    var middle=Math.floor((start+end)/2);               // index of the root is at the middle
    var root=new BinarySearchTree(list[middle], level, parent);
    root.leftChild=buildBST(start, middle-1, level+1, root);  // left child from start to middle-1
    root.rightChild=buildBST(middle+1, end, level+1, root);   // right child from middle+1 to end
    return root;
  }
  // Assign the comparison operator
  this.operator=operator;
  // Returned value
  this.rightChild=buildBST(start, end, 0, this);
}

/**
 * Find the first appearance of item in the BST
 * @param {Object} item - The item to be found in the BST;
 * @return {Object} - The node that has value equals to the item;
 */
toBinarySearchTree.prototype.find = function(item) {
  var compare=this.operator;

  return (function find(bst) {
    // if item > this.value then find item in the rightChild
    if(compare(item,bst.value)) {
      if(bst.rightChild!=null)
        return find(bst.rightChild);
      else return null;   // No items matched
    }
    // else when item <= this.value
    // the next step is if item < this.value then find item in the leftChild
    else if(compare(bst.value,item)) {
      if(bst.leftChild!=null)
        return find(bst.leftChild);
      else return null;   // No items matched
    }
    // When the function reach here means that item == this.value so return the node
    else
      return bst;
  })(this.rightChild);
}

/**
 * Add a node to the BST
 * @param {Object} element - The element will be added the BST;
 * @return {Object} - The node where the element is added;
 */
toBinarySearchTree.prototype.add = function(element) {
  var compare=this.operator;

  return (function add(bst) {
    // if element > this.value then add to the rightChild
    if(compare(element,bst.value)) {
      if(bst.rightChild==null) {
        return bst.rightChild=new BinarySearchTree(element, bst.level+1, bst);
      }
      // if this.rightChild != null
      return add(bst.rightChild);
    }
    // if element <= this.value then add to the leftChild
    else {
      if(bst.leftChild==null) {
        return bst.leftChild=new BinarySearchTree(element, bst.level+1, bst);
      }
      // if this.leftChild != null
      return add(bst.leftChild);
    }
  })(this.rightChild);
}

/**
 * Delete the first appearance of element node in the BST count from the root
 * @param {Object} element - The element will be deleted;
 * @return {boolean} - true if element deleted successfully, false if element not found;
 */
toBinarySearchTree.prototype.delete = function(element) {
  var target=this.find(element);

  if(!target)
    return false;

  (function del(target, parents) {
    if(target.leftChild && target.rightChild) {

      var nextNode=target.rightChild;
      while(nextNode.leftChild)
        nextNode=nextNode.leftChild;

      if(target==parents.leftChild)
        parents.leftChild.value=nextNode.value;
      else
        parents.rightChild.value=nextNode.value;

      del(nextNode, nextNode.parents);

    }
    else if(target.leftChild) {

      target.leftChild.level--;
      if(target==parents.leftChild)
        parents.leftChild=target.leftChild;
      else
        parents.rightChild=target.leftChild;

    }
    else if(target.rightChild) {

      target.rightChild.level--;
      if(target==parents.leftChild)
        parents.leftChild=target.rightChild;
      else
        parents.rightChild=target.rightChild;

    }
    else {

      if(target==parents.leftChild)
        parents.leftChild=null;
      else parents.rightChild=null;

    }
  })(target, target.parents);

  return true;
}
