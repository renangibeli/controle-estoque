import { clientService } from '../../services/client-service.js'

let random =  clientService.getRandomIntInclusive(1, 99999)

let productID = document.querySelector('#productID')

productID.value = random

//botão para gravar dados
let addBtn = document.querySelector('#addBtn')

//botão limpar tela
let clearBtn = document.querySelector('#clearBtn')
clearBtn.addEventListener('click', () => {
    const description = document.querySelector('#description')
    const quantity = document.querySelector('#quantity')
    const category = document.querySelector('#category')
    const price = document.querySelector('#price')
    const size = document.querySelector('#size')
    const color = document.querySelector('#color')

    description.value = ''
    quantity.value = 1
    category.value = 'male'
    price.value = ''
    size.value = 'M'
    color.value = ''
})


