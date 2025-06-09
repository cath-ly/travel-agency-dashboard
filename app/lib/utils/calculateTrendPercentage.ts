export const calculateTrendPercentage = (currentMonthTotal: number, lastMonthTotal: number): TrendResult => {
    if (lastMonthTotal === 0){
        return currentMonthTotal === 0 
            ? { trend: "no change", percentage: 0} 
            : { trend: "increment", percentage: 100};
    }

    const change = currentMonthTotal - lastMonthTotal;
    const percentage = change/lastMonthTotal * 100;

    if (change > 0){
        return { trend: "increment", percentage};
    }
    else if (change < 0){
        return { trend: "decrement", percentage: Math.abs(percentage)};
    }

    return { trend: "no change", percentage: 0};
}

export default calculateTrendPercentage;