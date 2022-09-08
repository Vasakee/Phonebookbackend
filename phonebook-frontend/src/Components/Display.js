import React from "react"
import Personservice from '../Services/Person'
const Display =({ searches, setPersons, setMessage}) =>{
    const deleteItem = (person) =>{
        const result = window.confirm(`Delete ${person.name} ?`)
        if(result){
          Personservice
          .remove(person.id)
          .then((_res)=>{
            setPersons(searches.filter((item) => item !== person))
            setMessage({text:`${person.name} has been removed .`, type: "success"})
            setTimeout(()=> {setMessage(null)}, 2000)
          })
          .catch((_err)=> console.log(_err))
          setPersons(searches.filter((item) => item !== person))
          setMessage({text:`${person.name} was already removed from the server .`, type:"error"})
          setTimeout(()=>{setMessage(null)},2000)
        }
      };
      return searches.map((note)=> (
        <p key={note.id}>
          {note.name} {note.number} <button onClick={()=>deleteItem(note)}>Delete</button>
        </p>
      ))
}
export default Display