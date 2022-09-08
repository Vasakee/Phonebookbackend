import axios from "axios"


const url = 'http://localhost:3001/api/persons'
const getAll = async()=>{
      const request= axios.get(url)
      return request.then(res=>res.data )     
}
const update = async(id, noteObject) =>{
    const request = axios.put(`${url}/${id}`, noteObject)
      return request.then(res=> res.data)
}
const create = async(noteObject) =>{
    const request = axios.post(url,noteObject)
     return request.then(res=>res.data)
}
const remove = async (id) =>{
    const request = axios.delete(`${url}/${id}`)
    const res = await request
    return res.data
}
const everything = {getAll, update, create, remove }
export default everything