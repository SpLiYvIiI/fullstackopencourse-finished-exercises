type BmiResult = string;
interface BMIarguments {
  height : number,
  mass : number 
}
const parseArgumentsForBmi = (args: Array<string>): BMIarguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
const calculateBmi = (height: number, mass: number) : BmiResult => {
    if(mass ===0 || height ===0) throw new Error('height and mass values shouldnt be zeros');
    const x : number = (mass/Math.pow(height/100,2));
    if(x < 15) return 'Very severely underweight';
    else if (x >= 15 && x < 16) return 'Severely underweight';
    else if(x >= 16 && x < 18.5) return 'Underweight';
    else if(x >= 18.5 && x < 25) return 'Normal (healthy weight)';
    else if(x >= 25 && x<30) return 'Overweight	';
    else if(x >= 30 && x< 35) return 'Obese Class I (Moderately obese)';
    else if(x >= 35 && x < 40) return 'Obese Class II (Severely obese)';
    else return 'Obese Class III (Very severely obese)';
};

try {
    const {height,mass} = parseArgumentsForBmi(process.argv);
    console.log(calculateBmi(height, mass)); 
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}