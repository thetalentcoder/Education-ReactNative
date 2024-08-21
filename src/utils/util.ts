import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function formatNumberWithCommas(number: number): string {
    // Convert number to string
    let numberString: string = number.toString();

    // Insert commas every three digits from the back
    let formattedNumber: string = '';
    let count: number = 0;
    for (let i = numberString.length - 1; i >= 0; i--) {
        if (count === 3) {
            formattedNumber = ',' + formattedNumber;
            count = 0;
        }
        formattedNumber = numberString[i] + formattedNumber;
        count++;
    }

    return formattedNumber;
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const UTCToZoneTIme = (dateString: string) => {
    const date = new Date(dateString);
    const offsetMinutes = date.getTimezoneOffset();
    const localTime = new Date(date.getTime() + offsetMinutes * 60 * 1000);
    return localTime;
}

export const checkIfUserHastakenQuizToday = (user: any) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const todaysDate = toZonedTime(new Date(), userTimeZone);

    const parseAllStreakDates = user?.streakhistory?.map((item: any) =>
        UTCToZoneTIme(item.date)
    );

    const hasTakenQuizToday = parseAllStreakDates?.some((date: Date) =>
        format(date, "yyyy-MM-dd") === format(todaysDate, "yyyy-MM-dd")
    );

    return hasTakenQuizToday;
}

export const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}