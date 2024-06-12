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