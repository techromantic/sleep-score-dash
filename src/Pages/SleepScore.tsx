import React, { useState } from 'react';
import { Dropdown } from '../Components/Dropdown';
import logo from './logo.svg';
import { generateDailyHHIncrements } from '../utils/helpers';
import { connect } from 'react-redux';
import { selectField, SleepState, Field, setScore } from '../store/SleepSlice';
import Sleepio from '../assets/sleepio-logo-medium-blue@2x.png';
import { calculateSleepScore, SleepScoreOutput, Result } from '../api/calculateSleepScore';

type SleepScoreProps = {
    sleep: any; 
    dispatch: any; 
}

const classes = {
    calc_ready: "mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    calc_not_ready: "mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-500 bg-blue-200 focus:outline-none",
    heading: "md:mr-2 mt-2 mb-2 text-center md:text-left md:text-lg lg:text-2xl font-large font-extrabold text-gray-50",
    errorMessage: "md:mr-2 mt-2 mb-2 text-center md:text-left md:text-lg text-xl font-large font-extrabold text-red-400",
    message: "md:mr-2 mt-2 mb-2 text-center md:text-left md:text-lg lg:text-2xl font-large font-extrabold text-blue-700"
}
function SleepScore({sleep, dispatch}:SleepScoreProps) {

  const  [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const   [message, setMessage] = useState("");
  let { readyToCalculate, fields, sleepScore } = sleep; 

  async function calculateResults() {
      if (!readyToCalculate || loading) return; 
      setLoading(true);
      let scoreResult: Result<SleepScoreOutput | null> = await calculateSleepScore(fields);
      if (scoreResult.success) { 
         dispatch(setScore(scoreResult.data!.score));
      }
      setError(!scoreResult.success);
      setMessage(scoreResult.message);
      setLoading(false);
  }

  return (
    <div className="h-full w-full grid grid-cols-3 grid-rows-3">
        <div className="bg-blue-900 col-span-3 md:col-span-1 md:row-span-3">
      
            <div className="h-full w-full flex justify-center items-end md:justify-end md:items-center">
                <div className="flex flex-col mr-0 mb-2">
                    <img src={Sleepio} className="md:mr-10 object-none md:object-fit lg:object-none"/>
                    <h1 className={classes.heading}>Sleep Score Calculator</h1>
                    {  fields.map((field: Field) => (
                        <Dropdown 
                            key={field.label}
                            options={generateDailyHHIncrements()} 
                            label={field.label}
                            unit={field.units}
                            setDropdown={(label: string, selection: string) => dispatch(selectField({label, selection}))}
                        ></Dropdown>
                    ))}
                </div>
            </div>
        </div>
        <div className="bg-blue-300 col-span-3 row-span-2 md:col-span-2 md:row-span-3">
            <div className="h-full w-full flex flex-col pt-16 md:pt-0 justify-start items-center md:justify-center">

                { (loading) 
                    && (
                        <div className="animate-orbit w-80 h-80 rounded-full bg-none flex items-start justify-center">
                            <div className="w-1/3 h-1/3 rounded-full bg-yellow-200">&nbsp;</div>
                        </div>
                    )                    
                }
                
                { (!loading && sleepScore) && (
                    <div className="w-80 h-80 bg-none flex items-end justify-center">
                        <h1 className="text-4xl text-blue-900 w-1/3 h-1/3 rounded-full bg-yellow-200 flex items-center justify-center">{sleepScore}</h1>
                    </div>
                )}

                {  (message) && (
                    <p className={(error ? classes.errorMessage : classes.message)}> {message}</p>
                )}


                <button onClick={() => calculateResults()} type="button" className={readyToCalculate ? classes.calc_ready : classes.calc_not_ready}>
                   { (loading) ? `Loading...` : `Calculate ${sleepScore ? ` Again` : ''}`}
                </button>
                    
                { !readyToCalculate && (
                    <p className="mt-4 text-center text-base font-medium text-blue-800">Fill out the form to calculate your sleep score!</p>
                )}
            </div>
        </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({ sleep: state.sleep });

export default connect(mapStateToProps)(SleepScore); 