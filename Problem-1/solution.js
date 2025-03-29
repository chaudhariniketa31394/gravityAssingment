function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;

    const sub = [];

    nums.forEach(num => {
        let pos = sub.findIndex(val => val >= num);

        // If position found, replace; otherwise, append
        pos !== -1 ? (sub[pos] = num) : sub.push(num);
    });

    return sub.length; // Length of Longest Increasing Subsequence
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // Output: 4
