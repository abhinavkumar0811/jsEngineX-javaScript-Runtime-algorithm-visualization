// Hardcoded curated default presets for high-performance instant backend API delivery
const PRESETS_LIST = [
  {
    id: 'bubble-sort',
    title: 'Bubble Sort Algorithm',
    category: 'Sorting',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    description: 'Iterative array comparison sorting algorithm swapping adjacent elements.',
    code: `// Bubble Sort Algorithm Step Visualization
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
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

const numbers = [64, 34, 25, 12, 22];
console.log("Input Array:", numbers);
const sorted = bubbleSort(numbers);
console.log("Sorted Result:", sorted);`
  },
  {
    id: 'binary-search',
    title: 'Binary Search Algorithm',
    category: 'Searching',
    complexity: { time: 'O(log n)', space: 'O(1)' },
    description: 'Logarithmic search halving sorted search interval.',
    code: `// Binary Search Algorithm
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}

const sortedList = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const targetVal = 23;
const foundIndex = binarySearch(sortedList, targetVal);
console.log(\`Target \${targetVal} found at index:\`, foundIndex);`
  },
  {
    id: 'factorial-recursion',
    title: 'Factorial Call Stack Recursion',
    category: 'Recursion',
    complexity: { time: 'O(n)', space: 'O(n)' },
    description: 'Recursive stack frame expansion and unwinding.',
    code: `// Factorial Call Stack Recursion
function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  let result = n * factorial(n - 1);
  return result;
}

const n = 5;
const fact = factorial(n);
console.log(\`Factorial of \${n} =\`, fact);`
  },
  {
    id: 'event-loop-async',
    title: 'Event Loop & Promises Async Queues',
    category: 'Async & Event Loop',
    complexity: { time: 'O(1)', space: 'O(1)' },
    description: 'Call Stack vs Microtask Queue (Promise) vs Task Queue (setTimeout).',
    code: `// Event Loop Microtask vs Task Queue Execution
console.log("1. Synchronous Start");

setTimeout(() => {
  console.log("4. Task Queue (setTimeout callback)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask Queue (Promise resolution)");
});

console.log("2. Synchronous End");`
  }
];

// @desc    Get all preset algorithms
// @route   GET /api/v1/presets
export const getAllPresets = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      count: PRESETS_LIST.length,
      data: PRESETS_LIST
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get preset by ID
// @route   GET /api/v1/presets/:id
export const getPresetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const preset = PRESETS_LIST.find(p => p.id === id);

    if (!preset) {
      return res.status(404).json({
        success: false,
        error: `Preset with ID '${id}' was not found.`
      });
    }

    return res.status(200).json({
      success: true,
      data: preset
    });
  } catch (error) {
    next(error);
  }
};
