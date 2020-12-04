import { Field } from "../store/SleepSlice";

export interface SleepScoreInput {
    duration_bed: number;
    duration_asleep: number;
}

export interface SleepScoreOutput {
    score: number; 
}

export interface Result<T> {
    data: T;
    success: boolean; 
    message: string; 
}

export enum CalculateSleepScoreFields {
    "duration_bed",
    "duration_asleep"
}

function extractFieldsForSleepScore(fields: Field[]) {
    var requiredFields = Object.values(CalculateSleepScoreFields);
    var submitSleepScoreInputs: any = {};
    fields.forEach((field) => {
        if (requiredFields.includes(field.code)) {   
            submitSleepScoreInputs[field.code] = Number(field.selected);
        }
    });
    return submitSleepScoreInputs as SleepScoreInput;
}

export async function calculateSleepScore(fields: Field[]): Promise<Result<SleepScoreOutput| null>> {
    var sleepScoreInput: SleepScoreInput = extractFieldsForSleepScore(fields);
    try {
        var scoreResponse = await requestSleepScore(sleepScoreInput);
        return scoreResponse;
    } catch (error) {
        return {
            data: null,
            success: false,
            message: "Could not reach Sleep Score Service..."
        }
    }
}

async function requestSleepScore(input:SleepScoreInput): Promise<Result<SleepScoreOutput | null>> {
    return new Promise((resolve, reject) => {
            fetch(
                "http://localhost:4040/sleep-score/calculate",
                {method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                 body: JSON.stringify(input)}
            )
            .then((res) => {
                resolve(res.json());
            })
            .catch((err) => reject(err));
    })
}