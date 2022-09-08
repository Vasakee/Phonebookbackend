import { useState, useEffect } from 'react';
//import './App.css';
import Display from './Components/Display';
import Filter from './Components/Filter';
import Form from './Components/Form';
import Notification from './Components/Notification';
import PersonService from './Services/Person'

  const App = ()=> {
    const [persons, setPersons] = useState([])
    const [newName , setNewName] = useState('')
    const [search, setSearch] = useState("")
    const [number, setNumber] = useState('')
    const [message, setMessage] = useState(null)
  
  const getAllhook = ()=>{
    PersonService
    .getAll()
    .then(firstTimer =>{
      setPersons(firstTimer)
    })
    .catch(err=> console.log(err))
  }
  useEffect( getAllhook,[])
 const add = (e) =>{
  e.preventDefault()
  const personArray = persons.map((e) => e.name)
   const personObject = {
    name: newName,
    number:number
   };
   if(personArray.includes(`${personObject.name}`)){
    const oldperson = persons.filter((e) => e.name === newName)
    const _id = oldperson.map((e)=>e.id)[0];
    const result = window.confirm(`${newName} already exists, would you like to replace the old one with this ?`)
    if(result){
      PersonService
      .update(_id, personObject)
      .then((returned)=>{
        const newPersons = persons.map((person)=>
        person.id !== returned.id ? person : returned)
        setPersons(newPersons)
      })
      .catch((err)=>
      setMessage(err)
      )
      setMessage({text:`Edited ${personObject.name}.`, type: "success"});
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
    setNewName('')
    setNumber('')
   }else{
     PersonService
     .create(personObject)
     .then(returned => setPersons(persons.concat(returned)))
     .catch((err) => setMessage(err))
     setMessage({text:`Added ${personObject.name}.`, type: "success"})
     setTimeout(()=>{setMessage(null)},2000)
     setNewName('')
     setNumber('')
   }
 }
const handlenumber =(e) =>{
  setNumber(e.target.value)
}
const handlename =(e) =>{
     setNewName(e.target.value)
}
const handleSearch = (e) => {
  setSearch(e.target.value)
}
const searches = persons.filter((person)=> person.name.toLowerCase().includes(search.toLowerCase()))

  
  return (
    <div className="App">
    <h2>Phonebook</h2>
    <Notification message={message}  />
     <Filter  value={search} onchange={handleSearch} />
     <b>Add new</b>
     <Form  newName={newName} handlename={handlename} number={number} handlenumber={handlenumber} onsubmit={add}/>
    <h2>Numbers</h2>
    <ul>
      <Display searches={searches} setPersons={setPersons}  setMessage={setMessage}/>
    </ul>
      </div>
  )
}

export default App;
