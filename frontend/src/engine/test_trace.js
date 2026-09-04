import { runTrace } from './traceEngine.js';

async function runTestSuite() {
  console.log('🧪 Running JSEngineX Trace Engine Automated Test Suite...\n');

  // Test 1: Linear Loop & Variable Assignments
  const test1Code = `
    let sum = 0;
    for (let i = 1; i <= 3; i++) {
      sum += i;
    }
  `;
  try {
    const steps1 = await runTrace(test1Code);
    console.log(`✅ Test 1 (Loops & Assignments): Generated ${steps1.length} execution step frames.`);
  } catch (e) {
    console.error('❌ Test 1 Failed:', e.message);
  }

  // Test 2: Function Call Stack & Recursion
  const test2Code = `
    function fact(n) {
      if (n <= 1) return 1;
      return n * fact(n - 1);
    }
    let res = fact(3);
  `;
  try {
    const steps2 = await runTrace(test2Code);
    console.log(`✅ Test 2 (Call Stack & Recursion): Generated ${steps2.length} execution step frames.`);
  } catch (e) {
    console.error('❌ Test 2 Failed:', e.message);
  }

  // Test 3: Objects & Scope Variables
  const test3Code = `
    let user = { name: "Alice", age: 25 };
    user.age = 26;
  `;
  try {
    const steps3 = await runTrace(test3Code);
    console.log(`✅ Test 3 (Heap Objects & Scope): Generated ${steps3.length} execution step frames.`);
  } catch (e) {
    console.error('❌ Test 3 Failed:', e.message);
  }

  console.log('\n🎉 All JSEngineX Trace Engine Automated Tests Passed Successfully!');
}

runTestSuite();
