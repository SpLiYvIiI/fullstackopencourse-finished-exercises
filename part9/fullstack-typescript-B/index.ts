/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access , @typescript-eslint/no-unsafe-assignment*/
import express from 'express';
import {calBmi} from './calculateBmi1';
import {calcEx} from './calculateExercises1';
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('pong');
  });
  
app.get('/bmi',(req,res) => {
    const query : any = req.query;
    const height :any  = query.height;
    const weight  : any = query.weight;
    try{
    const result = calBmi(height,weight);
    res.status(200).json(result);
    }
    catch(e){
       res.status(400).json({error : e.message}); 
    }
    
});
app.post('/exercises',(req,res)=>{
    const body : any = req.body;
    try{
        const daily_exercises : any  = body.daily_exercises;
        const target : any = req.body.target;
        const result = calcEx(daily_exercises,target);
        res.status(200).json(result);
    }
    catch(e){
        res.status(400).json({error : e.message});
    }
});
  const PORT = 3001;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

