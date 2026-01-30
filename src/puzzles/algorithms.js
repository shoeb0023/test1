/**
 * Common JavaScript Algorithmic Puzzles:
 * 1. Longest Substring Without Repeating Characters (Sliding Window)
 * 2. Two Sum (Hash Map Lookup)
 * 3. Maximum Subarray Sum (Kadane's Algorithm)
 */

// 1. Longest Substring Without Repeating Characters - O(n)
function lengthOfLongestSubstring(s) {
  const charMap = new Map();
  let maxLength = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const rightChar = s[windowEnd];
    if (charMap.has(rightChar)) {
      windowStart = Math.max(windowStart, charMap.get(rightChar) + 1);
    }
    charMap.set(rightChar, windowEnd);
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
}

// 2. Two Sum - O(n)
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}

// 3. Maximum Subarray Sum (Kadane's) - O(n)
function maxSubArray(nums) {
  if (nums.length === 0) return 0;
  let currentMax = nums[0];
  let globalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    globalMax = Math.max(globalMax, currentMax);
  }

  return globalMax;
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Algorithmic Puzzles ---');

  console.assert(lengthOfLongestSubstring('abcabcbb') === 3, 'Longest substring 1 failed');
  console.assert(lengthOfLongestSubstring('bbbbb') === 1, 'Longest substring 2 failed');
  console.assert(lengthOfLongestSubstring('pwwkew') === 3, 'Longest substring 3 failed');

  const sumIndices = twoSum([2, 7, 11, 15], 9);
  console.assert(sumIndices[0] === 0 && sumIndices[1] === 1, 'Two Sum failed');

  const maxSub = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  console.assert(maxSub === 6, 'Max subarray failed'); // [4, -1, 2, 1]

  console.log('✓ All Algorithmic Puzzle tests passed!');
}

module.exports = { lengthOfLongestSubstring, twoSum, maxSubArray };
