export const formatUserCount = (userCount) => {
    if (userCount >= 100000000) {
        // Display as 100M, 200M, etc.
        return Math.round(userCount / 1000000) + 'M';
    } else if (userCount >= 100000) {
        // Display as 100K, 200K, etc.
        return Math.round(userCount / 1000) + 'K';
    } else if (userCount >= 1000) {
        // Display as 1K, 2K, etc.
        return Math.round(userCount / 1000) + 'K';
    } else {
        // Display as is (less than 1000)
        return userCount?.toString();
    }
}
