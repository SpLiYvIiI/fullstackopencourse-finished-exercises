interface BmiResults {
    weight : number,
    height : number ,
    bmi : string
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calBmi = (heightProvided: any, weightProvided: any) : BmiResults => {
    const height  = Number(heightProvided);
    const weight  = Number(weightProvided);
    if(isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers!');
    if(height ===0 || weight === 0) throw new Error('height and mass values shouldnt be zeros');
    const x : number = (weight/Math.pow(height/100,2));
    const res = {
        weight: weight,
        height: height,
        bmi: "Normal (healthy weight)"
    };
    if(x < 15) return {...res , bmi : 'Very severely underweight'};
    else if (x >= 15 && x < 16) return {...res , bmi : 'Severely underweight'};
    else if(x >= 16 && x < 18.5) return {...res , bmi : 'Underweight'};
    else if(x >= 18.5 && x < 25) return {...res , bmi : 'Normal (healthy weight)'};
    else if(x >= 25 && x<30) return {...res , bmi : 'Overweight	'};
    else if(x >= 30 && x< 35) return {...res , bmi : 'Obese Class I (Moderately obese)'};
    else if(x >= 35 && x < 40) return {...res , bmi : 'Obese Class II (Severely obese)'};
    else return {...res , bmi : 'Obese Class III (Very severely obese)'};
};

