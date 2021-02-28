interface exercisesResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArgumentsForExercises1 = (args: Array<string>,target : number): Array<number> => {
if (args.length < 2) throw new Error('Not enough arguments');
if(isNaN(Number(target))) throw new Error("Provided values were not numbers");
const arr = [];
for(let i = 0; i < args.length; i++){
    if(!isNaN(Number(args[i]))) {
        arr.push(Number(args[i]));
    }
    else {
        throw new Error("Provided values were not numbers");
    }
}
return arr;
};
const result1 = (exercises : Array <number>,targetVal : number) : exercisesResult =>{
const average = exercises.reduce((total,num)=> total + num,0)/exercises.length;
const determineRating = targetVal-average > 0 ? (targetVal-average >= 1 ? 1 : 2) : 3;
const ratingDescription = determineRating === 3 ? "Excellent (don't overkill your organism though)" : (determineRating === 2 ? 'not too bad but could be better': "you are being lazy");  
return {
    periodLength: exercises.length,
    trainingDays: exercises.reduce((total,num)=>{return num === 0 ? total : total +1; },0),
    success: determineRating === 3,
    rating: determineRating,
    ratingDescription: ratingDescription,
    target: targetVal,
    average: average
};
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calcEx = (daily_exercises : any,target : any) : exercisesResult=>{ 
    const exercises = parseArgumentsForExercises1(daily_exercises,target);
    return result1(exercises,target);
};
