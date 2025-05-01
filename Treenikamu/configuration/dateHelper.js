

export const FI_WEEKDAY_NUM = {
    MA: 1, TI: 2, KE: 3, TO: 4, PE: 5, LA: 6, SU: 7,
  };

  export function generateWorkoutDates({ weekdays, startDate = new Date(), weeks = 1 }) {
    const result = [];
    const mondayOfThisWeek = new Date(startDate);

    const dayDiff = (mondayOfThisWeek.getDay() + 6) % 7; 
    mondayOfThisWeek.setDate(mondayOfThisWeek.getDate() - dayDiff);
  
    for (let w = 0; w < weeks; w++) {
      weekdays.forEach((abbr) => {
        const iso = FI_WEEKDAY_NUM[abbr];
        if (!iso) return;
        const d = new Date(mondayOfThisWeek);
        d.setDate(d.getDate() + (w * 7) + (iso - 1));
        result.push(d);
      });
    }
    return result;
  }