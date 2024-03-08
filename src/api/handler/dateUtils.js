import {isFuture, isValid, parse, previousFriday, previousMonday} from "date-fns";

export const parseDate = (dt) => {
    let errorMessage = "";
    try {
        const date = parse(dt, 'yyyy-MM-dd', new Date());

        if (isValid(date) && !isFuture(date)) {
            return {date};
        }
        errorMessage = `${dt} - wrong Date format or date is in the future!`;
    } catch (error) {
        errorMessage = "Parameter date not found";
    }

    return {
        errorMessage
    };
}

export const getPreviousPeriod = (date) => {
    const friday = previousFriday(date);
    const monday = previousMonday(friday);
    return {
        from: monday,
        to: friday
    }
}
