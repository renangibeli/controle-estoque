import { clientService } from '../../services/client-service.js'

let random =  clientService.getRandomIntInclusive(1, 99999)

const productID = document.querySelector('#productID')
const description = document.querySelector('#description')
const quantity = document.querySelector('#quantity')
const category = document.querySelector('#category')
const buyPrice = document.querySelector('#buyPrice')
const sellPrice = document.querySelector('#sellPrice')
const size = document.querySelector('#size')
const color = document.querySelector('#color')

productID.value = random
buyPrice.value = 'R$ '
sellPrice.value = 'R$ '

//botão para gravar dados
let addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', () => {
    const unformatedBuyPrice =  clientService.unFormatCurrency(buyPrice.value) 
    const unformatedSellPrice =  clientService.unFormatCurrency(sellPrice.value) 
    const formatedDescription = description.value.toUpperCase()
    const formatedColor = color.value.toUpperCase()

    axios.post(`${server}/estoque`,{
        "id": productID.value,
        "description": formatedDescription,
        "quantity": Number(quantity.value),
        "category": category.value,
        "buyPrice": unformatedBuyPrice,
        "sellPrice": unformatedSellPrice,
        "size": size.value,
        "color": formatedColor
    })
    .then((response) => {
        window.alert(`Cadastro do produto ${productID.value} - ${formatedDescription} realizado com sucesso!`)
    })
    .catch(error => console.log(error))
})


//botão limpar tela
let clearBtn = document.querySelector('#clearBtn')
clearBtn.addEventListener('click', () => {

    description.value = ''
    quantity.value = 1
    category.value = 'masculino'
    price.value = ''
    size.value = 'M'
    color.value = ''
})


