const express = require('express');
const { getCharacters, getCharacterById, addOrUpdateCharacter, deleteCharacter } = require('./dynamodb');
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Worlkd');
})


app.get('/characters', async (req, res) => {
    try {
        const characters = await getCharacters()
        res.json(characters)
    }catch(error){
        console.log(error)
        // res.send({status: 500, message: 'Error occoured'})
        res.status(500).json({err: 'something went wrong'})
    }
})

app.get('/characters/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await getCharacterById(id)
        res.json(data)  
    } catch (error) {
        console.log(error)
        res.status(500).json({err: "something went wrong"})
    }
})

app.post('/characters', async (req, res) => {
    const data = req.body 
    try{
        const newChar = await addOrUpdateCharacter(data);
        res.json(newChar)
    }catch(error){
        console.log(error)
        res.status(500).json({err: "Something went wrong"})
    }
})

app.put('/characters/:id', async (req, res) => {
    const character = req.body
    const {id} = req.params
    character.id = id
    try {
        const updateChar = await addOrUpdateCharacter(character)
        res.json(updateChar)
    } catch (error) {
        console.log(error)    
        res.status(500).json({err: 'Something went wrong'})
    }
})

app.delete('/characters/:id', async (req, res)=> {
    const id = req.params.id
    try{
        const deletedData = await deleteCharacter(id)
        res.json(deletedData)
    }catch(error){
        console.log(error)
        res.status(500).json({err: "Something went wrong"})
    }
})
const port = process.env.PORT || 1212

app.listen(port, () => console.log('listening on the port', port))