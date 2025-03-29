const twoSum = (nums, target) => {
    if (!Array.isArray(nums) || nums.length < 2) {
        throw new Error("Invalid input: nums must be an array with at least two elements.");
    }
    if (typeof target !== "number") {
        throw new Error("Invalid input: target must be a number.");
    }

    const map = new Map(); // Stores seen numbers and their indices

    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i]; // The number needed to reach the target

        if (map.has(complement)) return [map.get(complement), i]; // Found solution

        map.set(nums[i], i); // Store number and its index
    }

    throw new Error("No solution found"); // If no solution exists
};

console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
console.log(twoSum([3, 2, 4], 6));      // Output: [1, 2]
console.log(twoSum([3, 3], 6));         // Output: [0, 1]
