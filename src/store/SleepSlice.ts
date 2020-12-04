import { createSlice } from '@reduxjs/toolkit'
import { Moment } from 'moment'
import { generateDailyHHIncrements } from '../utils/helpers'

export interface SleepState { 
    fields: Field[]
    readyToCalculate: boolean; 
    sleepScore: any; 
}

export interface Field {
    label: string;
    code: string;
    selected: string | null;
    units: string;
}

const SleepSlice = createSlice({
  name: 'sleep',
  initialState: {
    readyToCalculate: false,
    sleepScore: false,
    fields: [{
        label: "Duration in bed",
        code: "duration_bed",
        selected: null,
        units: "hours"
        }, {
        label: "Duration asleep",
        code: "duration_asleep",
        selected: null,
        units: "hours"
    }]
  },
  reducers: {
    selectField(state, action) {
      const { label, selection } = action.payload;
      let field = state.fields.find((field: Field) => (field.label == label));
      field!.selected = selection; 
      state.readyToCalculate = allFieldsCompleted(state.fields);
    },
    setScore(state, action) {
      state.sleepScore = action.payload;
    }
  }
})

function allFieldsCompleted(fields: Field[]) {
    // Return false if any field selected is null
    return fields.every((field: Field) => (field.selected != null));
}

export const { selectField, setScore } = SleepSlice.actions

export default SleepSlice.reducer