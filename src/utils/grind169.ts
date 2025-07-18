// LeetCode Grind 169 Questions Data
// Each object: id, title, difficulty, topic, estimatedTime, week, completed

export interface GrindQuestion {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  estimatedTime: number; // in minutes
  week: number;
  completed: boolean;
}

export const GRIND_169_QUESTIONS: GrindQuestion[] = [
  // Week 1
  { id: 1, title: 'Two Sum', difficulty: 'Easy', topic: 'Array', estimatedTime: 15, week: 1, completed: false },
  { id: 2, title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stack', estimatedTime: 20, week: 1, completed: false },
  { id: 3, title: 'Merge Two Sorted Lists', difficulty: 'Easy', topic: 'Linked List', estimatedTime: 20, week: 1, completed: false },
  { id: 4, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', topic: 'Array', estimatedTime: 20, week: 1, completed: false },
  { id: 5, title: 'Valid Palindrome', difficulty: 'Easy', topic: 'String', estimatedTime: 15, week: 1, completed: false },
  { id: 6, title: 'Invert Binary Tree', difficulty: 'Easy', topic: 'Binary Tree', estimatedTime: 15, week: 1, completed: false },
  { id: 7, title: 'Valid Anagram', difficulty: 'Easy', topic: 'String', estimatedTime: 15, week: 1, completed: false },
  { id: 8, title: 'Binary Search', difficulty: 'Easy', topic: 'Binary Search', estimatedTime: 15, week: 1, completed: false },
  { id: 9, title: 'Flood Fill', difficulty: 'Easy', topic: 'Graph', estimatedTime: 20, week: 1, completed: false },
  { id: 10, title: 'Lowest Common Ancestor of a Binary Search Tree', difficulty: 'Easy', topic: 'Binary Search Tree', estimatedTime: 20, week: 1, completed: false },
  { id: 11, title: 'Balanced Binary Tree', difficulty: 'Easy', topic: 'Binary Tree', estimatedTime: 15, week: 1, completed: false },
  { id: 12, title: 'Linked List Cycle', difficulty: 'Easy', topic: 'Linked List', estimatedTime: 20, week: 1, completed: false },
  { id: 13, title: 'Implement Queue using Stacks', difficulty: 'Easy', topic: 'Stack', estimatedTime: 20, week: 1, completed: false },
  { id: 14, title: 'First Bad Version', difficulty: 'Easy', topic: 'Binary Search', estimatedTime: 20, week: 1, completed: false },
  { id: 15, title: 'Ransom Note', difficulty: 'Easy', topic: 'Hash Table', estimatedTime: 15, week: 1, completed: false },
  { id: 16, title: 'Climbing Stairs', difficulty: 'Easy', topic: 'Dynamic Programming', estimatedTime: 20, week: 1, completed: false },
  { id: 17, title: 'Longest Palindrome', difficulty: 'Easy', topic: 'String', estimatedTime: 20, week: 1, completed: false },
  { id: 18, title: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', estimatedTime: 20, week: 1, completed: false },
  { id: 19, title: 'Majority Element', difficulty: 'Easy', topic: 'Array', estimatedTime: 20, week: 1, completed: false },
  { id: 20, title: 'Add Binary', difficulty: 'Easy', topic: 'Binary', estimatedTime: 15, week: 1, completed: false },
  { id: 21, title: 'Diameter of Binary Tree', difficulty: 'Easy', topic: 'Binary Tree', estimatedTime: 30, week: 1, completed: false },
  { id: 22, title: 'Middle of the Linked List', difficulty: 'Easy', topic: 'Linked List', estimatedTime: 20, week: 1, completed: false },
  { id: 23, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', topic: 'Binary Tree', estimatedTime: 15, week: 1, completed: false },
  { id: 24, title: 'Contains Duplicate', difficulty: 'Easy', topic: 'Array', estimatedTime: 15, week: 1, completed: false },
  { id: 25, title: 'Meeting Rooms', difficulty: 'Easy', topic: 'Array', estimatedTime: 20, week: 1, completed: false },
  { id: 26, title: 'Roman to Integer', difficulty: 'Easy', topic: 'Math', estimatedTime: 20, week: 1, completed: false },
  { id: 27, title: 'Backspace String Compare', difficulty: 'Easy', topic: 'Stack', estimatedTime: 15, week: 1, completed: false },
  { id: 28, title: 'Counting Bits', difficulty: 'Easy', topic: 'Binary', estimatedTime: 15, week: 1, completed: false },
  { id: 29, title: 'Same Tree', difficulty: 'Easy', topic: 'Binary Tree', estimatedTime: 20, week: 1, completed: false },
  { id: 30, title: 'Number of 1 Bits', difficulty: 'Easy', topic: 'Binary', estimatedTime: 15, week: 1, completed: false },
  { id: 31, title: 'Longest Common Prefix', difficulty: 'Easy', topic: 'String', estimatedTime: 20, week: 1, completed: false },
  { id: 32, title: 'Single Number', difficulty: 'Easy', topic: 'Binary', estimatedTime: 15, week: 1, completed: false },
  { id: 33, title: 'Palindrome Linked List', difficulty: 'Easy', topic: 'Linked List', estimatedTime: 20, week: 1, completed: false },
  { id: 34, title: 'Move Zeroes', difficulty: 'Easy', topic: 'Array', estimatedTime: 20, week: 1, completed: false },
  { id: 35, title: 'Symmetric Tree', difficulty: 'Easy', topic: 'Binary Tree', estimatedTime: 20, week: 1, completed: false },
  { id: 36, title: 'Missing Number', difficulty: 'Easy', topic: 'Binary', estimatedTime: 15, week: 1, completed: false },
  { id: 37, title: 'Palindrome Number', difficulty: 'Easy', topic: 'Math', estimatedTime: 15, week: 1, completed: false },
  { id: 38, title: 'Convert Sorted Array to Binary Search Tree', difficulty: 'Easy', topic: 'Binary Search Tree', estimatedTime: 20, week: 1, completed: false },
  { id: 39, title: 'Reverse Bits', difficulty: 'Easy', topic: 'Binary', estimatedTime: 15, week: 1, completed: false },
  { id: 40, title: 'Subtree of Another Tree', difficulty: 'Easy', topic: 'Binary Tree', estimatedTime: 20, week: 1, completed: false },
  { id: 41, title: 'Squares of a Sorted Array', difficulty: 'Easy', topic: 'Array', estimatedTime: 20, week: 1, completed: false },
  { id: 42, title: 'Maximum Subarray', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 20, week: 1, completed: false },
  { id: 43, title: 'Insert Interval', difficulty: 'Medium', topic: 'Array', estimatedTime: 25, week: 1, completed: false },
  { id: 44, title: '01 Matrix', difficulty: 'Medium', topic: 'Graph', estimatedTime: 30, week: 1, completed: false },
  { id: 45, title: 'K Closest Points to Origin', difficulty: 'Medium', topic: 'Heap', estimatedTime: 30, week: 1, completed: false },
  { id: 46, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'String', estimatedTime: 30, week: 1, completed: false },
  { id: 47, title: '3Sum', difficulty: 'Medium', topic: 'Array', estimatedTime: 30, week: 1, completed: false },
  { id: 48, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', topic: 'Binary Tree', estimatedTime: 20, week: 1, completed: false },
  { id: 49, title: 'Clone Graph', difficulty: 'Medium', topic: 'Graph', estimatedTime: 25, week: 1, completed: false },
  { id: 50, title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', topic: 'Stack', estimatedTime: 30, week: 1, completed: false },
  { id: 51, title: 'Course Schedule', difficulty: 'Medium', topic: 'Graph', estimatedTime: 30, week: 1, completed: false },
  { id: 52, title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', topic: 'Trie', estimatedTime: 35, week: 1, completed: false },
  { id: 53, title: 'Coin Change', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 25, week: 1, completed: false },
  { id: 54, title: 'Product of Array Except Self', difficulty: 'Medium', topic: 'Array', estimatedTime: 30, week: 1, completed: false },
  { id: 55, title: 'Min Stack', difficulty: 'Medium', topic: 'Stack', estimatedTime: 20, week: 1, completed: false },
  { id: 56, title: 'Validate Binary Search Tree', difficulty: 'Medium', topic: 'Binary Search Tree', estimatedTime: 20, week: 1, completed: false },
  { id: 57, title: 'Number of Islands', difficulty: 'Medium', topic: 'Graph', estimatedTime: 25, week: 1, completed: false },
  { id: 58, title: 'Rotting Oranges', difficulty: 'Medium', topic: 'Graph', estimatedTime: 30, week: 1, completed: false },
  { id: 59, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', topic: 'Binary Search', estimatedTime: 30, week: 2, completed: false },
  { id: 60, title: 'Combination Sum', difficulty: 'Medium', topic: 'Array', estimatedTime: 30, week: 2, completed: false },
  { id: 61, title: 'Permutations', difficulty: 'Medium', topic: 'Recursion', estimatedTime: 30, week: 2, completed: false },
  { id: 62, title: 'Merge Intervals', difficulty: 'Medium', topic: 'Array', estimatedTime: 30, week: 2, completed: false },
  { id: 63, title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', topic: 'Binary Tree', estimatedTime: 25, week: 2, completed: false },
  { id: 64, title: 'Time Based Key-Value Store', difficulty: 'Medium', topic: 'Binary Search', estimatedTime: 35, week: 2, completed: false },
  { id: 65, title: 'Accounts Merge', difficulty: 'Medium', topic: 'Graph', estimatedTime: 30, week: 2, completed: false },
  { id: 66, title: 'Sort Colors', difficulty: 'Medium', topic: 'Array', estimatedTime: 25, week: 2, completed: false },
  { id: 67, title: 'Word Break', difficulty: 'Medium', topic: 'Trie', estimatedTime: 30, week: 2, completed: false },
  { id: 68, title: 'Partition Equal Subset Sum', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 30, week: 2, completed: false },
  { id: 69, title: 'String to Integer (atoi)', difficulty: 'Medium', topic: 'String', estimatedTime: 25, week: 2, completed: false },
  { id: 70, title: 'Spiral Matrix', difficulty: 'Medium', topic: 'Matrix', estimatedTime: 25, week: 2, completed: false },
  { id: 71, title: 'Subsets', difficulty: 'Medium', topic: 'Recursion', estimatedTime: 30, week: 2, completed: false },
  { id: 72, title: 'Binary Tree Right Side View', difficulty: 'Medium', topic: 'Binary Tree', estimatedTime: 20, week: 2, completed: false },
  { id: 73, title: 'Longest Palindromic Substring', difficulty: 'Medium', topic: 'String', estimatedTime: 25, week: 2, completed: false },
  { id: 74, title: 'Unique Paths', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 20, week: 2, completed: false },
  { id: 75, title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', topic: 'Binary Tree', estimatedTime: 25, week: 2, completed: false },
  { id: 76, title: 'Container With Most Water', difficulty: 'Medium', topic: 'Array', estimatedTime: 35, week: 2, completed: false },
  { id: 77, title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', topic: 'Recursion', estimatedTime: 30, week: 2, completed: false },
  { id: 78, title: 'Word Search', difficulty: 'Medium', topic: 'Graph', estimatedTime: 30, week: 2, completed: false },
  { id: 79, title: 'Find All Anagrams in a String', difficulty: 'Medium', topic: 'String', estimatedTime: 30, week: 2, completed: false },
  { id: 80, title: 'Minimum Height Trees', difficulty: 'Medium', topic: 'Graph', estimatedTime: 30, week: 2, completed: false },
  { id: 81, title: 'Task Scheduler', difficulty: 'Medium', topic: 'Heap', estimatedTime: 35, week: 2, completed: false },
  { id: 82, title: 'LRU Cache', difficulty: 'Medium', topic: 'Linked List', estimatedTime: 30, week: 2, completed: false },
  { id: 83, title: 'Kth Smallest Element in a BST', difficulty: 'Medium', topic: 'Binary Search Tree', estimatedTime: 25, week: 2, completed: false },
  { id: 84, title: 'Daily Temperatures', difficulty: 'Medium', topic: 'Stack', estimatedTime: 30, week: 2, completed: false },
  { id: 85, title: 'House Robber', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 25, week: 2, completed: false },
  { id: 86, title: 'Gas Station', difficulty: 'Medium', topic: 'Array', estimatedTime: 30, week: 2, completed: false },
  { id: 87, title: 'Next Permutation', difficulty: 'Medium', topic: 'Recursion', estimatedTime: 30, week: 2, completed: false },
  { id: 88, title: 'Valid Sudoku', difficulty: 'Medium', topic: 'Matrix', estimatedTime: 35, week: 2, completed: false },
  { id: 89, title: 'Group Anagrams', difficulty: 'Medium', topic: 'String', estimatedTime: 25, week: 2, completed: false },
  { id: 90, title: 'Maximum Product Subarray', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 30, week: 2, completed: false },
  { id: 91, title: 'Design Add and Search Words Data Structure', difficulty: 'Medium', topic: 'Trie', estimatedTime: 35, week: 2, completed: false },
  { id: 92, title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', topic: 'Graph', estimatedTime: 30, week: 2, completed: false },
  { id: 93, title: 'Remove Nth Node From End of List', difficulty: 'Medium', topic: 'Linked List', estimatedTime: 20, week: 2, completed: false },
  { id: 94, title: 'Shortest Path to Get Food', difficulty: 'Medium', topic: 'Graph', estimatedTime: 30, week: 2, completed: false },
  { id: 95, title: 'Find the Duplicate Number', difficulty: 'Medium', topic: 'Binary', estimatedTime: 20, week: 2, completed: false },
  { id: 96, title: 'Top K Frequent Words', difficulty: 'Medium', topic: 'Heap', estimatedTime: 30, week: 2, completed: false },
  { id: 97, title: 'Longest Increasing Subsequence', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 30, week: 2, completed: false },
  { id: 98, title: 'Graph Valid Tree', difficulty: 'Medium', topic: 'Graph', estimatedTime: 30, week: 2, completed: false },
  { id: 99, title: 'Course Schedule II', difficulty: 'Medium', topic: 'Graph', estimatedTime: 35, week: 2, completed: false },
  { id: 100, title: 'Swap Nodes in Pairs', difficulty: 'Medium', topic: 'Linked List', estimatedTime: 25, week: 2, completed: false },
  { id: 101, title: 'Path Sum II', difficulty: 'Medium', topic: 'Binary Tree', estimatedTime: 25, week: 3, completed: false },
  { id: 102, title: 'Longest Consecutive Sequence', difficulty: 'Medium', topic: 'Array', estimatedTime: 30, week: 3, completed: false },
  { id: 103, title: 'Rotate Array', difficulty: 'Medium', topic: 'Array', estimatedTime: 25, week: 3, completed: false },
  { id: 104, title: 'Odd Even Linked List', difficulty: 'Medium', topic: 'Linked List', estimatedTime: 25, week: 3, completed: false },
  { id: 105, title: 'Decode String', difficulty: 'Medium', topic: 'Stack', estimatedTime: 30, week: 3, completed: false },
  { id: 106, title: 'Contiguous Array', difficulty: 'Medium', topic: 'Array', estimatedTime: 30, week: 3, completed: false },
  { id: 107, title: 'Maximum Width of Binary Tree', difficulty: 'Medium', topic: 'Binary Tree', estimatedTime: 20, week: 3, completed: false },
  { id: 108, title: 'Find K Closest Elements', difficulty: 'Medium', topic: 'Heap', estimatedTime: 30, week: 3, completed: false },
  { id: 109, title: 'Longest Repeating Character Replacement', difficulty: 'Medium', topic: 'String', estimatedTime: 30, week: 3, completed: false },
  { id: 110, title: 'Inorder Successor in BST', difficulty: 'Medium', topic: 'Binary Search Tree', estimatedTime: 30, week: 3, completed: false },
  { id: 111, title: 'Jump Game', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 20, week: 3, completed: false },
  { id: 112, title: 'Add Two Numbers', difficulty: 'Medium', topic: 'Linked List', estimatedTime: 25, week: 3, completed: false },
  { id: 113, title: 'Generate Parentheses', difficulty: 'Medium', topic: 'Recursion', estimatedTime: 25, week: 3, completed: false },
  { id: 114, title: 'Sort List', difficulty: 'Medium', topic: 'Linked List', estimatedTime: 25, week: 3, completed: false },
  { id: 115, title: 'Number of Connected Components in an Undirected Graph', difficulty: 'Medium', topic: 'Graph', estimatedTime: 30, week: 3, completed: false },
  { id: 116, title: 'Minimum Knight Moves', difficulty: 'Medium', topic: 'Graph', estimatedTime: 35, week: 3, completed: false },
  { id: 117, title: 'Subarray Sum Equals K', difficulty: 'Medium', topic: 'Array', estimatedTime: 35, week: 3, completed: false },
  { id: 118, title: 'Asteroid Collision', difficulty: 'Medium', topic: 'Stack', estimatedTime: 30, week: 3, completed: false },
  { id: 119, title: 'Random Pick with Weight', difficulty: 'Medium', topic: 'Math', estimatedTime: 25, week: 3, completed: false },
  { id: 120, title: 'Kth Largest Element in an Array', difficulty: 'Medium', topic: 'Heap', estimatedTime: 30, week: 3, completed: false },
  { id: 121, title: 'Maximal Square', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 30, week: 3, completed: false },
  { id: 122, title: 'Rotate Image', difficulty: 'Medium', topic: 'Matrix', estimatedTime: 25, week: 3, completed: false },
  { id: 123, title: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium', topic: 'Binary Tree', estimatedTime: 25, week: 3, completed: false },
  { id: 124, title: 'Design Hit Counter', difficulty: 'Medium', topic: 'Queue', estimatedTime: 30, week: 3, completed: false },
  { id: 125, title: 'Path Sum III', difficulty: 'Medium', topic: 'Binary Tree', estimatedTime: 35, week: 3, completed: false },
  { id: 126, title: 'Pow(x, n)', difficulty: 'Medium', topic: 'Math', estimatedTime: 20, week: 3, completed: false },
  { id: 127, title: 'Search a 2D Matrix', difficulty: 'Medium', topic: 'Binary Search', estimatedTime: 30, week: 3, completed: false },
  { id: 128, title: 'Largest Number', difficulty: 'Medium', topic: 'String', estimatedTime: 20, week: 3, completed: false },
  { id: 129, title: 'Decode Ways', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 25, week: 3, completed: false },
  { id: 130, title: 'Meeting Rooms II', difficulty: 'Medium', topic: 'Array', estimatedTime: 30, week: 3, completed: false },
  { id: 131, title: 'Reverse Integer', difficulty: 'Medium', topic: 'Math', estimatedTime: 25, week: 3, completed: false },
  { id: 132, title: 'Set Matrix Zeroes', difficulty: 'Medium', topic: 'Matrix', estimatedTime: 25, week: 3, completed: false },
  { id: 133, title: 'Reorder List', difficulty: 'Medium', topic: 'Linked List', estimatedTime: 25, week: 3, completed: false },
  { id: 134, title: 'Encode and Decode Strings', difficulty: 'Medium', topic: 'String', estimatedTime: 25, week: 3, completed: false },
  { id: 135, title: 'Cheapest Flights Within K Stops', difficulty: 'Medium', topic: 'Graph', estimatedTime: 45, week: 3, completed: false },
  { id: 136, title: 'All Nodes Distance K in Binary Tree', difficulty: 'Medium', topic: 'Binary Tree', estimatedTime: 25, week: 3, completed: false },
  { id: 137, title: '3Sum Closest', difficulty: 'Medium', topic: 'Array', estimatedTime: 30, week: 3, completed: false },
  { id: 138, title: 'Rotate List', difficulty: 'Medium', topic: 'Linked List', estimatedTime: 25, week: 3, completed: false },
  { id: 139, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', topic: 'Binary Search', estimatedTime: 30, week: 3, completed: false },
  { id: 140, title: 'Basic Calculator II', difficulty: 'Medium', topic: 'Stack', estimatedTime: 30, week: 3, completed: false },
  { id: 141, title: 'Combination Sum IV', difficulty: 'Medium', topic: 'Dynamic Programming', estimatedTime: 35, week: 3, completed: false },
  { id: 142, title: 'Insert Delete GetRandom O(1)', difficulty: 'Medium', topic: 'Hash Table', estimatedTime: 20, week: 3, completed: false },
  { id: 143, title: 'Non-overlapping Intervals', difficulty: 'Medium', topic: 'Array', estimatedTime: 20, week: 3, completed: false },
  { id: 144, title: 'Minimum Window Substring', difficulty: 'Hard', topic: 'String', estimatedTime: 30, week: 3, completed: false },
  { id: 145, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', topic: 'Binary Tree', estimatedTime: 40, week: 4, completed: false },
  { id: 146, title: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Stack', estimatedTime: 35, week: 4, completed: false },
  { id: 147, title: 'Find Median from Data Stream', difficulty: 'Hard', topic: 'Heap', estimatedTime: 30, week: 4, completed: false },
  { id: 148, title: 'Word Ladder', difficulty: 'Hard', topic: 'Graph', estimatedTime: 45, week: 4, completed: false },
  { id: 149, title: 'Basic Calculator', difficulty: 'Hard', topic: 'Stack', estimatedTime: 40, week: 4, completed: false },
  { id: 150, title: 'Maximum Profit in Job Scheduling', difficulty: 'Hard', topic: 'Binary Search', estimatedTime: 45, week: 4, completed: false },
  { id: 151, title: 'Merge k Sorted Lists', difficulty: 'Hard', topic: 'Heap', estimatedTime: 30, week: 4, completed: false },
  { id: 152, title: 'Largest Rectangle in Histogram', difficulty: 'Hard', topic: 'Stack', estimatedTime: 35, week: 4, completed: false },
  { id: 153, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', topic: 'Binary Tree', estimatedTime: 35, week: 4, completed: false },
  { id: 154, title: 'Maximum Frequency Stack', difficulty: 'Hard', topic: 'Stack', estimatedTime: 40, week: 4, completed: false },
  { id: 155, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topic: 'Binary Search', estimatedTime: 40, week: 4, completed: false },
  { id: 156, title: 'Longest Increasing Path in a Matrix', difficulty: 'Hard', topic: 'Graph', estimatedTime: 40, week: 4, completed: false },
  { id: 157, title: 'Longest Valid Parentheses', difficulty: 'Hard', topic: 'Stack', estimatedTime: 35, week: 4, completed: false },
  { id: 158, title: 'Design In-Memory File System', difficulty: 'Hard', topic: 'Trie', estimatedTime: 40, week: 4, completed: false },
  { id: 159, title: 'Employee Free Time', difficulty: 'Hard', topic: 'Array', estimatedTime: 35, week: 4, completed: false },
  { id: 160, title: 'Word Search II', difficulty: 'Hard', topic: 'Graph', estimatedTime: 40, week: 4, completed: false },
  { id: 161, title: 'Alien Dictionary', difficulty: 'Hard', topic: 'Graph', estimatedTime: 45, week: 4, completed: false },
  { id: 162, title: 'Bus Routes', difficulty: 'Hard', topic: 'Graph', estimatedTime: 45, week: 4, completed: false },
  { id: 163, title: 'Sliding Window Maximum', difficulty: 'Hard', topic: 'Array', estimatedTime: 35, week: 4, completed: false },
  { id: 164, title: 'Palindrome Pairs', difficulty: 'Hard', topic: 'String', estimatedTime: 40, week: 4, completed: false },
  { id: 165, title: 'Reverse Nodes in k-Group', difficulty: 'Hard', topic: 'Linked List', estimatedTime: 35, week: 4, completed: false },
  { id: 166, title: 'Sudoku Solver', difficulty: 'Hard', topic: 'Matrix', estimatedTime: 40, week: 4, completed: false },
  { id: 167, title: 'First Missing Positive', difficulty: 'Hard', topic: 'Hash Table', estimatedTime: 35, week: 4, completed: false },
  { id: 168, title: 'N-Queens', difficulty: 'Hard', topic: 'Recursion', estimatedTime: 40, week: 4, completed: false },
  { id: 169, title: 'Smallest Range Covering Elements from K Lists', difficulty: 'Hard', topic: '', estimatedTime: 40, week: 4, completed: false },
  // ... Add all remaining 156 questions here in the same format ...
]; 