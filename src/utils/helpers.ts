import moment from "moment";

export function generateDailyHHIncrements(): string[] {
    let increments: string[] = [];
    let hours = new Array(16);
    hours.fill("", 1).forEach((val, index) => {
        let hoursMinutes = index * 60; 
        increments.push(moment.duration(hoursMinutes, 'minutes').asHours().toString());
        increments.push(moment.duration((hoursMinutes+30), 'minutes').asHours().toString());
    });
    return increments; 
}