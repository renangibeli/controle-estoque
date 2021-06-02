const express = require('express')
const server = express()
const router = express.Router()
const fs = require('fs')

server.use(express.join({extended: true}))
    
const readFile = () => {
    const content = fs.readFileSync('./db.json', 'utf-8')
    return JSON.parse(content)
}

const writeFile = (content) => {
    const updateFile =  JSON.stringify(content)
    fs.writeFileSync('./db.json', updateFile, 'utf-8')
}

const routerGet = () => {
    router.get('/', (req, res) => {
        const content = readFile()
        res.send(content)
    })
}

const routerPost = (id, name, quantity, category, priceBuy, priceSell, size, color) => {
    router.post('/', (req, res) => {
        //const { id, name, quantity, category, priceBuy, priceSell, size, color } = req.body
        const currentContent = readFile()
        currentContent.push({ id, name, quantity, category, priceBuy, priceSell, size, color})
        writeFile(currentContent)
    })
}

const routerPut = () => {
    router.put('/:id', (req, res) => {
        const { id } = req.params
    
        const { name, quantity, category, priceBuy, priceSell, size, color } = req.body
        
        const currentContent = readFile()
        const selectedItem = currentContent.findIndex((item) => item.id === id)
    
        const { id: newId, name: newName, quantity: newQuantity, category: newCategory, priceBuy: newPriceBuy, priceSell: newPriceSell, size: newSize, color: newColor } = currentContent[selectedItem]
    
        const newObject = {
            id: newId,
            name: name ? name: newName,
            quantity: quantity ? quantity: newQuantity,
            category: category ? category: newCategory,
            priceBuy: priceBuy ? priceBuy: newPriceBuy,
            priceSell: priceSell ? priceSell: newPriceSell,
            size: size ? size: newSize,
            color: color ? color: newColor,
        }
    
        currentContent[selectedItem] = newObject
        writeFile(currentContent)
        res.send(newObject)
    })
}

const routerDelete = () => {
    router.delete('/:id', (req, res) => {
        const { id } = req.params
        const currentContent = readFile()
        const selectedItem = currentContent.findIndex((item) => item.id === id)
        currentContent.splice(selectedItem, 1)
        writeFile(currentContent)
        res.send(true)
    })
}

server.use(router)

server.listen(3000, () => {
    console.log("Rodando servidor")
})

export const backendService = {
    routerGet,
    routerPost,
    routerPut,
    routerDelete
}