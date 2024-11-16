import axios from 'axios'

const baseURL = "http://localhost:3000"

const getAllToDo = (setToDo) => {
    axios
    .get(baseURL)
    .then(({data}) => {
        console.log("Data: ", data);
        setToDo(data);
    })
}

const addToDo= (text, setText, setToDo) => {
    axios 
    .post(`${baseURL}/save`, {text})
    .then((data) => {
        console.log(data);
        setText("")
        getAllToDo(setToDo)
    })
    .catch((err) => console.log(err))
}

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
    axios 
    .post(`${baseURL}/update`, {id : toDoId})
    .then((data) => {
        setText("")
        setIsUpdating(false)
        getAllToDo(setText)
    })
    .catch((err) => console.log(err))
}

export {getAllToDo};
export {addToDo};
export{updateToDo};
