import { expect } from 'chai';
import Sinon from 'sinon';
import { extractFieldsForSleepScore } from '../src/api/calculateSleepScore'; 
import { Field } from '../src/store/SleepSlice';

describe('Calculate Sleep Score ', () => { // the tests container
    it('should extract the correct fields for the sleep score', () => { 
 
        let testFields : Field[] = [{
            label: "A bed made out of hay",
            code: "duration_bed",
            selected: "2.5",
            units: "hours"
            }, {
            label: "With a needle in it",
            code: "duration_asleep",
            selected: "0",
            units: "hours"
        }];
        
        let extractedFields = extractFieldsForSleepScore(testFields);
        expect(extractedFields)
            .to.deep
            .equal({
                duration_bed: 2.5,
                duration_asleep: 0
            });
    });
});
