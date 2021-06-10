import { clientService } from '../../services/client-service.js'

let random =  clientService.getRandomIntInclusive(1, 99999)

const productID = document.querySelector('#productID')

const inputDescription = document.querySelector('#inputDescription')
const labelDescripition = document.querySelector('#labelDescripition')
inputDescription.addEventListener('keyup', () => clientService.removeInvalidClass(inputDescription, labelDescripition))

const inputQuantity = document.querySelector('#inputQuantity')
const labelQuantity = document.querySelector('#labelQuantity')
inputQuantity.addEventListener('click', () => clientService.removeInvalidClass(inputQuantity, labelQuantity))
inputQuantity.addEventListener('keyup', () => clientService.removeInvalidClass(inputQuantity, labelQuantity))

const inputGender = document.querySelector('#inputGender')
const labelGender = document.querySelector('#labelGender')
inputGender.addEventListener('click', () => clientService.removeInvalidClass(inputGender, labelGender))

const inputBuyPrice = document.querySelector('#inputBuyPrice')
const labelBuyPrice = document.querySelector('#labelBuyPrice')
inputBuyPrice.addEventListener('keyup', () => clientService.removeInvalidClass(inputBuyPrice, labelBuyPrice))

const inputSellPrice = document.querySelector('#inputSellPrice')
const labelSellPrice = document.querySelector('#labelSellPrice')
inputSellPrice.addEventListener('keyup', () => clientService.removeInvalidClass(inputSellPrice, labelSellPrice))

const inputSize = document.querySelector('#inputSize')
const labelSize = document.querySelector('#labelSize')
inputSize.addEventListener('click', () => clientService.removeInvalidClass(inputSize, labelSize))

const inputColor = document.querySelector('#inputColor')
const labelColor = document.querySelector('#labelColor')
inputColor.addEventListener('keyup', () => clientService.removeInvalidClass(inputColor, labelColor))

productID.value = random
inputBuyPrice.value = 'R$ '
inputSellPrice.value = 'R$ '

//botão para gravar dados
let addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', () => {

     const { formatedDescription, formatedQuantity, formatedBuyPrice, formatedSellPrice, formatedColor } = clientService.formatFields(inputDescription.value, inputQuantity.value, inputBuyPrice.value, inputSellPrice.value, inputColor.value)

    const { descriptionValid, quantityValid, genderValid, buyPriceValid, sellPriceValid, sizeValid, colorValid } = clientService.validateFields( formatedDescription, formatedQuantity, inputGender.value, formatedBuyPrice, formatedSellPrice, inputSize.value, formatedColor)

    if (descriptionValid && quantityValid && genderValid && buyPriceValid && sellPriceValid && sizeValid && colorValid){
        axios.post(`${server}/estoque`,{
            "id": productID.value,
            "description": formatedDescription,
            "stock": {
                "quantity": formatedQuantity,
                "entry": formatedQuantity,
                "out": 0
            },
            "gender": inputGender.value,
            "buyPrice": formatedBuyPrice,
            "sellPrice": formatedSellPrice,
            "size": inputSize.value,
            "color": formatedColor
        })
        .then((response) => {
            window.alert(`Cadastro do produto ${productID.value} - ${formatedDescription} realizado com sucesso!`)
            console.log(response)
        })
        .catch(error => console.log(error)) 
    } else {
        let errorFields = []
        if(!descriptionValid){
            clientService.addInvalidClass(inputDescription, labelDescripition)
            errorFields.push('descrição') 
        }

        if(!quantityValid){
            clientService.addInvalidClass(inputQuantity, labelQuantity)
            errorFields.push('quantidade')
        }

        if(!genderValid){
            clientService.addInvalidClass(inputGender, labelGender)
            errorFields.push('gênero')
        }

        if(!buyPriceValid){
            clientService.addInvalidClass(inputBuyPrice, labelBuyPrice)
            errorFields.push('preço de compra')
        }

        if(!sellPriceValid){
            clientService.addInvalidClass(inputSellPrice, labelSellPrice)
            errorFields.push('preço de venda')
        }

        if(!sizeValid){
            clientService.addInvalidClass(inputSize, labelSize)
            errorFields.push('tamanho')
        }

        if(!colorValid){
            clientService.addInvalidClass(inputColor, labelColor)
            errorFields.push('cor')
        }

        let errorMessage = 'Corrija os seguintes campos: ' + (errorFields.join(', '))
        window.alert(errorMessage)
    }
})


//botão limpar tela
let clearBtn = document.querySelector('#clearBtn')
clearBtn.addEventListener('click', () => {
    //limpar valores da tela e formatação inválida de campos
    inputDescription.value = ''
    clientService.removeInvalidClass(inputDescription, labelDescripition)

    inputQuantity.value = 0
    clientService.removeInvalidClass(inputQuantity, labelQuantity)

    inputGender.value = ''
    clientService.removeInvalidClass(inputGender, labelGender)

    inputBuyPrice.value = 'R$ '
    clientService.removeInvalidClass(inputBuyPrice, labelBuyPrice)

    inputSellPrice.value = 'R$ '
    clientService.removeInvalidClass(inputSellPrice, labelSellPrice)

    inputSize.value = ''
    clientService.removeInvalidClass(inputSize, labelSize)

    inputColor.value = ''
    clientService.removeInvalidClass(inputColor, labelColor)

})


