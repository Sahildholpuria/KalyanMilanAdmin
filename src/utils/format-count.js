export const formatUserCount = (userCount) => {
    if (userCount >= 1000 && userCount < 1000000) {
        // Display as K (thousands)
        return (userCount / 1000).toFixed(1) + 'K';
    } else if (userCount >= 1000000) {
        // Display as M (millions)
        return (userCount / 1000000).toFixed(1) + 'M';
    } else {
        // Display as is (less than 1000)
        return userCount?.toString();
    }
}