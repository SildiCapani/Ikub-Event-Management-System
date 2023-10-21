export function   calculateDaysLeft(date: string): number {
    const registrationEndDate  = new Date(date);
    const today  = new Date();

    const differenceInTime = registrationEndDate.getTime() - today.getTime();

    const daysLeft = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24))

    return daysLeft
  }