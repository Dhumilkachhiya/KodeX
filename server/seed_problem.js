import mongoose from "mongoose";
import dotenv from "dotenv";
import Problem from "./src/models/problem.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing from .env");
  process.exit(1);
}

const seedProblems = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.");

    const user = await mongoose.connection.collection("users").findOne();
    if (!user) {
      console.error("No users found in the database. Please register a user first.");
      process.exit(1);
    }
    console.log(`Using user ${user._id} as creator.`);

    const problems = [
      {
        title: "Two Sum",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        difficulty: "easy",
        topics: ["Array", "Hash Table"],
        constraints: [
          "2 <= nums.length <= 10^4",
          "-10^9 <= nums[i] <= 10^9",
          "-10^9 <= target <= 10^9",
          "Only one valid answer exists."
        ],
        examples: [
          { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
          { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "" }
        ],
        hints: ["Can we use additional space somehow? Like maybe a hash map to speed up the search?"],
        editorial: "Use a Hash Map to store the values and their indices as you iterate through the array.",
        visibleTestcases: [
          { input: "4\n2 7 11 15\n9", output: "0 1" },
          { input: "3\n3 2 4\n6", output: "1 2" }
        ],
        hiddenTestcases: [
          { input: "2\n3 3\n6", output: "0 1" },
          { input: "5\n-1 -2 -3 -4 -5\n-8", output: "2 4" }
        ],
        driverCode: [
          {
            language: "cpp",
            judge0LanguageId: 54,
            starterCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};",
            solutionWrapper: "#include <bits/stdc++.h>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int target; cin >> target;\n    Solution obj;\n    vector<int> res = obj.twoSum(nums, target);\n    if(res.size() == 2) cout << res[0] << \" \" << res[1] << endl;\n    return 0;\n}",
            functionName: "twoSum"
          },
          {
            language: "python",
            judge0LanguageId: 71,
            starterCode: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass",
            solutionWrapper: "import sys\nfrom typing import List\n\n{{USER_CODE}}\n\nif __name__ == '__main__':\n    data = sys.stdin.read().split()\n    if not data: exit()\n    n = int(data[0])\n    nums = [int(x) for x in data[1:n+1]]\n    target = int(data[n+1])\n    obj = Solution()\n    res = obj.twoSum(nums, target)\n    if res and len(res) == 2:\n        print(f\"{res[0]} {res[1]}\")",
            functionName: "twoSum"
          },
          {
            language: "java",
            judge0LanguageId: 62,
            starterCode: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}",
            solutionWrapper: "import java.util.*;\n\n{{USER_CODE}}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        Solution obj = new Solution();\n        int[] res = obj.twoSum(nums, target);\n        if(res != null && res.length == 2) {\n            System.out.println(res[0] + \" \" + res[1]);\n        }\n    }\n}",
            functionName: "twoSum"
          },
          {
            language: "javascript",
            judge0LanguageId: 63,
            starterCode: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
            solutionWrapper: "const fs = require('fs');\n\n{{USER_CODE}}\n\nfunction main() {\n    const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === '') return;\n    const n = parseInt(input[0]);\n    const nums = [];\n    for(let i=1; i<=n; i++) nums.push(parseInt(input[i]));\n    const target = parseInt(input[n+1]);\n    const res = twoSum(nums, target);\n    if (res && res.length === 2) {\n        console.log(res[0] + \" \" + res[1]);\n    }\n}\nmain();",
            functionName: "twoSum"
          }
        ],
        createdBy: user._id,
        isPublished: true
      },
      {
        title: "Valid Parentheses",
        description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.",
        difficulty: "easy",
        topics: ["String", "Stack"],
        constraints: [
          "1 <= s.length <= 10^4",
          "s consists of parentheses only '()[]{}'."
        ],
        examples: [
          { input: "s = \"()\"", output: "true", explanation: "" },
          { input: "s = \"()[]{}\"", output: "true", explanation: "" }
        ],
        hints: ["Use a stack to keep track of the open parentheses."],
        editorial: "Iterate through the string. If you see an open bracket, push it to the stack.",
        visibleTestcases: [
          { input: "()", output: "true" },
          { input: "()[]{}", output: "true" }
        ],
        hiddenTestcases: [
          { input: "([{}])", output: "true" },
          { input: "((", output: "false" }
        ],
        driverCode: [
          {
            language: "cpp",
            judge0LanguageId: 54,
            starterCode: "class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};",
            solutionWrapper: "#include <bits/stdc++.h>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string s;\n    if (!(cin >> s)) return 0;\n    Solution obj;\n    bool res = obj.isValid(s);\n    cout << (res ? \"true\" : \"false\") << endl;\n    return 0;\n}",
            functionName: "isValid"
          },
          {
            language: "python",
            judge0LanguageId: 71,
            starterCode: "class Solution:\n    def isValid(self, s: str) -> bool:\n        pass",
            solutionWrapper: "import sys\n\n{{USER_CODE}}\n\nif __name__ == '__main__':\n    s = sys.stdin.read().strip()\n    if not s: exit()\n    obj = Solution()\n    res = obj.isValid(s)\n    print(\"true\" if res else \"false\")",
            functionName: "isValid"
          },
          {
            language: "java",
            judge0LanguageId: 62,
            starterCode: "class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}",
            solutionWrapper: "import java.util.*;\n\n{{USER_CODE}}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        Solution obj = new Solution();\n        boolean res = obj.isValid(s);\n        System.out.println(res ? \"true\" : \"false\");\n    }\n}",
            functionName: "isValid"
          },
          {
            language: "javascript",
            judge0LanguageId: 63,
            starterCode: "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};",
            solutionWrapper: "const fs = require('fs');\n\n{{USER_CODE}}\n\nfunction main() {\n    const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === '') return;\n    const s = input[0];\n    const res = isValid(s);\n    console.log(res ? \"true\" : \"false\");\n}\nmain();",
            functionName: "isValid"
          }
        ],
        createdBy: user._id,
        isPublished: true
      },
      {
        title: "Best Time to Buy and Sell Stock",
        description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.",
        difficulty: "easy",
        topics: ["Array", "Dynamic Programming"],
        constraints: [
          "1 <= prices.length <= 10^5",
          "0 <= prices[i] <= 10^4"
        ],
        examples: [
          { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." }
        ],
        hints: ["Keep track of the minimum price seen so far."],
        editorial: "Keep track of the minimum price seen so far. At each step, calculate the profit if you were to sell today.",
        visibleTestcases: [
          { input: "6\n7 1 5 3 6 4", output: "5" },
          { input: "5\n7 6 4 3 1", output: "0" }
        ],
        hiddenTestcases: [
          { input: "2\n1 2", output: "1" }
        ],
        driverCode: [
          {
            language: "cpp",
            judge0LanguageId: 54,
            starterCode: "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};",
            solutionWrapper: "#include <bits/stdc++.h>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> prices(n);\n    for(int i=0; i<n; i++) cin >> prices[i];\n    Solution obj;\n    cout << obj.maxProfit(prices) << endl;\n    return 0;\n}",
            functionName: "maxProfit"
          },
          {
            language: "python",
            judge0LanguageId: 71,
            starterCode: "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        pass",
            solutionWrapper: "import sys\nfrom typing import List\n\n{{USER_CODE}}\n\nif __name__ == '__main__':\n    data = sys.stdin.read().split()\n    if not data: exit()\n    n = int(data[0])\n    prices = [int(x) for x in data[1:n+1]]\n    obj = Solution()\n    print(obj.maxProfit(prices))",
            functionName: "maxProfit"
          },
          {
            language: "java",
            judge0LanguageId: 62,
            starterCode: "class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}",
            solutionWrapper: "import java.util.*;\n\n{{USER_CODE}}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] prices = new int[n];\n        for(int i=0; i<n; i++) prices[i] = sc.nextInt();\n        Solution obj = new Solution();\n        System.out.println(obj.maxProfit(prices));\n    }\n}",
            functionName: "maxProfit"
          },
          {
            language: "javascript",
            judge0LanguageId: 63,
            starterCode: "/**\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = function(prices) {\n    \n};",
            solutionWrapper: "const fs = require('fs');\n\n{{USER_CODE}}\n\nfunction main() {\n    const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === '') return;\n    const n = parseInt(input[0]);\n    const prices = [];\n    for(let i=1; i<=n; i++) prices.push(parseInt(input[i]));\n    console.log(maxProfit(prices));\n}\nmain();",
            functionName: "maxProfit"
          }
        ],
        createdBy: user._id,
        isPublished: true
      },
      {
        title: "Climbing Stairs",
        description: "You are climbing a staircase. It takes `n` steps to reach the top.\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
        difficulty: "easy",
        topics: ["Math", "Dynamic Programming"],
        constraints: [
          "1 <= n <= 45"
        ],
        examples: [
          { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step\n2. 2 steps" },
          { input: "n = 3", output: "3", explanation: "1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step" }
        ],
        hints: ["To reach nth step, what could have been your previous steps?"],
        editorial: "This is the Fibonacci sequence. The number of ways to reach step n is the sum of the ways to reach step n-1 and the ways to reach step n-2.",
        visibleTestcases: [
          { input: "2", output: "2" },
          { input: "3", output: "3" }
        ],
        hiddenTestcases: [
          { input: "1", output: "1" },
          { input: "45", output: "1836311903" }
        ],
        driverCode: [
          {
            language: "cpp",
            judge0LanguageId: 54,
            starterCode: "class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};",
            solutionWrapper: "#include <bits/stdc++.h>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    Solution obj;\n    cout << obj.climbStairs(n) << endl;\n    return 0;\n}",
            functionName: "climbStairs"
          },
          {
            language: "python",
            judge0LanguageId: 71,
            starterCode: "class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass",
            solutionWrapper: "import sys\n\n{{USER_CODE}}\n\nif __name__ == '__main__':\n    data = sys.stdin.read().split()\n    if not data: exit()\n    n = int(data[0])\n    obj = Solution()\n    print(obj.climbStairs(n))",
            functionName: "climbStairs"
          },
          {
            language: "java",
            judge0LanguageId: 62,
            starterCode: "class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}",
            solutionWrapper: "import java.util.*;\n\n{{USER_CODE}}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Solution obj = new Solution();\n        System.out.println(obj.climbStairs(n));\n    }\n}",
            functionName: "climbStairs"
          },
          {
            language: "javascript",
            judge0LanguageId: 63,
            starterCode: "/**\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = function(n) {\n    \n};",
            solutionWrapper: "const fs = require('fs');\n\n{{USER_CODE}}\n\nfunction main() {\n    const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n    if (input.length === 0 || input[0] === '') return;\n    const n = parseInt(input[0]);\n    console.log(climbStairs(n));\n}\nmain();",
            functionName: "climbStairs"
          }
        ],
        createdBy: user._id,
        isPublished: true
      }
    ];

    for (const prob of problems) {
      const existing = await Problem.findOne({ title: prob.title });
      if (existing) {
        console.log(`Problem '${prob.title}' already exists. Updating...`);
        await Problem.updateOne({ _id: existing._id }, prob);
        console.log(`Problem '${prob.title}' updated!`);
      } else {
        const newProblem = new Problem(prob);
        await newProblem.save();
        console.log(`Problem '${prob.title}' added successfully!`);
      }
    }

  } catch (error) {
    console.error("Error seeding problems:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
};

seedProblems();
