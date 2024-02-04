export const getAnkColor = (ank) => {
    const colors = ['#556ee6', '#34c38f', '#50a5f1', '#f1b44c', '#af3ede', '#f1673e', '#ea31ba', '#5a3cff', '#ff3c84', '#0dcebc'];
    return colors[ank % colors.length];
};