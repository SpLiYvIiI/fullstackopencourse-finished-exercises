import express from 'express'
import patientService from '../services/patients'
import {toNewPatientEntry} from '../utils'


const router = express.Router()


router.get('/',(_req,res) => {
    res.send(patientService.getNonSensitiveEntries())
})

router.post('/',(req,res) => {
    try{
        const newPatient = toNewPatientEntry(req.body)
        const addedPatient = patientService.addPatient(newPatient)
        res.json(addedPatient)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})
router.get('/:id', (req, res) => {
    const patient = patientService.findById(Number(req.params.id));
    if (patient) {
      res.send(patient);
    } else {
      res.sendStatus(404);
    }
  })
router.post('/:id/entries', (req,res) =>{
  try{
    const newEn = patientService.addNewEntry(req.body,Number(req.params.id))
    console.log(newEn)
    res.json(newEn)
  }
  catch(error){
    res.status(400).send(error.message)
  }
})
export default router