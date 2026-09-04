export const ALGORITHM_PRESETS = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort (Array Swaps)',
    category: 'Data Structures',
    code: `// Bubble Sort Algorithm Trace
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

let numbers = [5, 3, 8, 1, 2];
bubbleSort(numbers);
console.log("Sorted Array:", numbers);`
  },
  {
    id: 'binary-search',
    name: 'Binary Search (Logarithmic O(log n))',
    category: 'Searching',
    code: `// Binary Search Algorithm
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let midVal = arr[mid];

    if (midVal === target) {
      return mid;
    } else if (midVal < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}

let sortedArr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
let result = binarySearch(sortedArr, 23);
console.log("Found target at index:", result);`
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort (Divide & Conquer)',
    category: 'Sorting',
    code: `// Quick Sort Recursive Partition Algorithm
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

let unsorted = [10, 7, 8, 9, 1, 5];
let resultArr = quickSort(unsorted);
console.log("Quick Sorted Result:", resultArr);`
  },
  {
    id: 'linked-list',
    name: 'Linked List Traversal',
    category: 'Data Structures',
    code: `// Singly Linked List Pointer Traversal
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

let node3 = new ListNode(30);
let node2 = new ListNode(20, node3);
let head = new ListNode(10, node2);

let current = head;
let values = [];
while (current !== null) {
  values.push(current.val);
  current = current.next;
}

console.log("Linked List Traversed Nodes:", values);`
  },
  {
    id: 'factorial-recursion',
    name: 'Factorial (Recursion Stack)',
    category: 'Recursion',
    code: `// Recursive Factorial Calculation
function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  let subResult = factorial(n - 1);
  return n * subResult;
}

let num = 4;
let ans = factorial(num);
console.log("Factorial of 4 is:", ans);`
  },
  {
    id: 'event-loop-async',
    name: 'Event Loop & Task Queues',
    category: 'JS Internals',
    code: `// JavaScript Event Loop Queue Demonstration
console.log("1. Synchronous Start");

setTimeout(() => {
  console.log("4. Task Queue (setTimeout callback)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask Queue (Promise callback)");
});

console.log("2. Synchronous End");`
  }
];
