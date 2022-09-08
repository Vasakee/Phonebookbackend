
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
let persons =[
    {
        id: 1,
        name: "Arto Hellas",
        number: "2022-05-30T17:30:31.098Z",
    },
    {
        id:2,
        name:"Ada Lovelace",
        number: "2022-05-30T18:39:34.091Z",
    },
    {
        id:3,
        name: "Dan Abramov",
        number: "2022-0530T19:20:14.298Z",
    },
    {
       id:4,
       name: "Mary Poppendieck",
       number: "39-23-6423122"
    }
]
     
    morgan.token("post",(request, response) =>{
      if(request.method ==="POST"){
         return JSON.stringify(request.body);
      }else {
        return ""; }
    })
       morgan.format(
        "Structure",
        ":method :url :status :res[content-length] - :response-time ms  :post"
       )
       app.use(morgan("Structure"))
      const generateId = () =>{
        const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id)) 
        : 0
        return maxId + 1
      }
      app.post('/api/persons',(request, response) =>{
        const body = request.body
        const note ={
          name: body.name, 
          number: body.number,
          id:generateId()
        }
        const  Exist = persons.map((n)=>n.name)
        if(Exist.includes(note.name)){
          return response.status(400).json({
            error:'name already exists'
          })
        }
        if(!body.name){
          return response.status(400).json({
            error: 'name is missing'
          })
        }
        if(!body.number){
          return response.status(400).json({
            error:'number is missing'
          })
        }
        persons= persons.concat(note)
        response.json(note)
      })
     // const requestLogger = (request, response, next) =>{
     //   console.log('Method:', request.method)
     //   console.log('Path:', request.path)
     //   console.log('Body:', request.body)
     //   console.log('---')
     //   next()
     // }
     // app.use(requestLogger)

      //const unknownEndpoint = (request, response) =>{
      //  response.status(404).send({error:'unknown endpoint'})
     // }
     // app.use(unknownEndpoint)
      app.get('/', (request, response) => {
        response.send('<h1>Hello World</h1>')
      })
      app.get('/info', (request, response)=>{
        const total = persons.length
          response.send(`
          <p>Phonebook has info for ${total} people </p>
          <p> ${new Date()}</p>
          `)
      })
      app.get( '/api/persons',(request,response)=>{
        response.json(persons)
      })
       app.get('/api/persons/:id',(request, response) => {
        const id = Number(request.params.id)
        const note = persons.find(note => note.id === id)
      if(note){
        response.json(note)
      }else{
        response.status(404).end()
      }
      })

      app.delete('/api/persons/:id', (request, response)=>{
        const id = Number(request.params.id)
        persons = persons.filter(note => note.id !== id)

        response.status(204).end()
      })

const PORT = process.env.PORT || 3002
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})