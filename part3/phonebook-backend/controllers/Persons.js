const personsRouter = require('express').Router()
const Persons = require('../modules/Persons')

personsRouter.get('/',async (request,response) => {
  const persons =await Persons.find({})
  response.status(200).json(persons)
})
personsRouter.get('/:id',(request,response,next) => {
  Persons.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })

})
personsRouter.delete('/:id',(req,res,next) => {
  Persons.findByIdAndRemove(req.params.id).then(rese => {
    res.status(204).end()
  })
    .catch(error => next(error))
})
personsRouter.post('/',(req,res,next) => {
  const b = req.body
  const newP = new Persons({
    name : b.name,
    number : b.number
  })
  let x = newP.number.replace(/[^0-9]/g,'').length
  if(x>=8){
    newP.save().then(racxa => {
      res.json(racxa)
    }).catch(error => next(error))
  }
  else res.status(400).send({ message : 'Please insert a correct number (At least 8 digits)' })

})
personsRouter.put('/:id',(req,res,next) => {
  Persons.findById(req.params.id).then(person => {
    if(person){
      const b = req.body
      const newP = {
        name : b.name,
        number : b.number
      }
      let x = newP.number.replace(/[^0-9]/g,'').length
      if(x>=8){
        Persons.findByIdAndUpdate(req.params.id,newP,{ new:true }).then(resp => {
          res.json(resp)
        }).catch(error => res.status(500).send(error))
      }
      else res.status(400).send('Please insert a correct number (At least 8 digits)')
    }
    else{
      return res.status(500).send('Number was already removed from server')
    }
  }).catch(error =>
  {
    next(error)
  })

})

module.exports = personsRouter