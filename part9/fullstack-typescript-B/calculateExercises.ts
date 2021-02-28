interface exercisesResult {
        periodLength: number,
        trainingDays: number,
        success: boolean,
        rating: number,
        ratingDescription: string,
        target: number,
        average: number
}

const parseArgumentsForExercises = (args: Array<string>): Array<number> => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const arr = [];
    for(let i = 2; i < args.length; i++){
        if(!isNaN(Number(args[i]))) {
            arr.push(Number(args[i]));
        }
        else {
            throw new Error("Provided values were not numbers");
        }
    }
    return arr;
  };
const result = (exercisesWithTarget : Array <number>) : exercisesResult =>{
    const targetVal = exercisesWithTarget[0];
    const exercisesOnly =  exercisesWithTarget.slice(1,exercisesWithTarget.length);
    const average = exercisesOnly.reduce((total,num)=> total + num,0)/exercisesOnly.length;
    const determineRating = targetVal-average > 0 ? (targetVal-average >= 1 ? 1 : 2) : 3;
    const ratingDescription = determineRating === 3 ? "Excellent (don't overkill your organism though)" : (determineRating === 2 ? 'not too bad but could be better': "you are being lazy");  
    return {
        periodLength: exercisesOnly.length,
        trainingDays: exercisesOnly.reduce((total,num)=>{return num === 0 ? total : total +1; },0),
        success: determineRating === 3,
        rating: determineRating,
        ratingDescription: ratingDescription,
        target: targetVal,
        average: average
    };
};
try{
    const exercises = parseArgumentsForExercises(process.argv);
    console.log(result(exercises));
}
catch(error){
    console.log(`Something went wrong,error message : ${error.message}`);
}