import {
    clientService
} from '../services/client-service.js'

axios.get(`${server}/estoque`)
    .then((response) => {
        const result = response.data

        const mainTable = document.querySelector('#mainTable')
        const spinner = document.querySelector('#displayNone')
        const headerFields = ['ID', 'Descrição', 'Entrada', 'Saída', 'Quantidade', 'Categoria', 'Custo', 'Venda', 'Tamanho', 'Cor']
        const rowIcons = document.querySelector('#rowIcons')

        clientService.createTable(headerFields, result, mainTable, spinner, rowIcons, "estoque")

        // -->> SELEÇÃO DE LINHAS DENTRO DA TABELA HTML <<--
        let lines = table.getElementsByTagName("tr")

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            line.addEventListener("click", function () {
                clientService.selLines(this, false)
            })
        }

        const editBtn = document.querySelector("#editBtn")

        editBtn.addEventListener("click", () => {
            const selecteds = table.querySelectorAll(".selected")

            //Verificar se está selecionado
            if (selecteds.length < 1) {
                alert("Selecione pelo menos uma linha")
            } else {
                let selected = selecteds[0]
                selected = selected.querySelectorAll("td")

                const productID = document.querySelector('#productID')
                productID.value = selected[0].innerHTML

                const inputDescription = document.querySelector('#inputDescription')
                const labelDescripition = document.querySelector('#labelDescripition')
                inputDescription.value = selected[1].innerHTML
                inputDescription.addEventListener('keyup', () => clientService.removeInvalidClass(inputDescription, labelDescripition))

                const inputEntry = document.querySelector('#inputEntry')
                inputEntry.value = selected[2].innerHTML

                const inputOut = document.querySelector('#inputOut')
                inputOut.value = selected[3].innerHTML

                const inputQuantity = document.querySelector('#inputQuantity')
                inputQuantity.value = selected[4].innerHTML

                const inputGender = document.querySelector('#inputGender')
                const labelGender = document.querySelector('#labelGender')
                inputGender.value = selected[5].innerHTML
                inputGender.addEventListener('click', () => clientService.removeInvalidClass(inputGender, labelGender))

                const inputBuyPrice = document.querySelector('#inputBuyPrice')
                const labelBuyPrice = document.querySelector('#labelBuyPrice')
                inputBuyPrice.value = selected[6].innerHTML.replace('&nbsp;', ' ')
                inputBuyPrice.addEventListener('keyup', () => clientService.removeInvalidClass(inputBuyPrice, labelBuyPrice))

                const inputSellPrice = document.querySelector('#inputSellPrice')
                const labelSellPrice = document.querySelector('#labelSellPrice')
                inputSellPrice.value = selected[7].innerHTML.replace('&nbsp;', ' ')
                inputSellPrice.addEventListener('keyup', () => clientService.removeInvalidClass(inputSellPrice, labelSellPrice))

                const inputSize = document.querySelector('#inputSize')
                const labelSize = document.querySelector('#labelSize')
                inputSize.value = selected[8].innerHTML
                inputSize.addEventListener('click', () => clientService.removeInvalidClass(inputSize, labelSize))

                const inputColor = document.querySelector('#inputColor')
                const labelColor = document.querySelector('#labelColor')
                inputColor.value = selected[9].innerHTML
                inputColor.addEventListener('keyup', () => clientService.removeInvalidClass(inputColor, labelColor))

                const modal = document.querySelector('#modal-container')
                modal.classList.add('show')

                const clearBtn = document.querySelector("#clearBtn")
                clearBtn.addEventListener('click', () => {
                    modal.classList.remove('show')

                    clientService.removeInvalidClass(inputDescription, labelDescripition)
                    clientService.removeInvalidClass(inputQuantity, labelQuantity)
                    clientService.removeInvalidClass(inputGender, labelGender)
                    clientService.removeInvalidClass(inputBuyPrice, labelBuyPrice)
                    clientService.removeInvalidClass(inputSellPrice, labelSellPrice)
                    clientService.removeInvalidClass(inputSize, labelSize)
                    clientService.removeInvalidClass(inputColor, labelColor)
                })

                const addBtn = document.querySelector('#addBtn')
                addBtn.addEventListener('click', () => {

                    const {
                        formatedDescription,
                        formatedQuantity,
                        formatedBuyPrice,
                        formatedSellPrice,
                        formatedColor
                    } = clientService.formatFields(inputDescription.value, inputQuantity.value, inputBuyPrice.value, inputSellPrice.value, inputColor.value)

                    const {
                        descriptionValid,
                        quantityValid,
                        genderValid,
                        buyPriceValid,
                        sellPriceValid,
                        sizeValid,
                        colorValid
                    } = clientService.validateFields(formatedDescription, formatedQuantity, inputGender.value, formatedBuyPrice, formatedSellPrice, inputSize.value, formatedColor)

                    if (descriptionValid && quantityValid && genderValid && buyPriceValid && sellPriceValid && sizeValid && colorValid) {
                        axios.patch(`${server}/estoque/${productID.value}`, {
                                "description": formatedDescription,
                                "gender": inputGender.value,
                                "buyPrice": formatedBuyPrice,
                                "sellPrice": formatedSellPrice,
                                "size": inputSize.value,
                                "color": formatedColor
                            })
                            .then(response => window.alert(`Modificação do produto ${productID.value} - ${formatedDescription} realizada com sucesso!`))
                            .catch(error => console.error(error))
                    } else {
                        let errorFields = []
                        if (!descriptionValid) {
                            clientService.addInvalidClass(inputDescription, labelDescripition)
                            errorFields.push('descrição')
                        }

                        if (!genderValid) {
                            clientService.addInvalidClass(inputGender, labelGender)
                            errorFields.push('gênero')
                        }

                        if (!buyPriceValid) {
                            clientService.addInvalidClass(inputBuyPrice, labelBuyPrice)
                            errorFields.push('preço de compra')
                        }

                        if (!sellPriceValid) {
                            clientService.addInvalidClass(inputSellPrice, labelSellPrice)
                            errorFields.push('preço de venda')
                        }

                        if (!sizeValid) {
                            clientService.addInvalidClass(inputSize, labelSize)
                            errorFields.push('tamanho')
                        }

                        if (!colorValid) {
                            clientService.addInvalidClass(inputColor, labelColor)
                            errorFields.push('cor')
                        }

                        let errorMessage = 'Corrija os seguintes campos: ' + (errorFields.join(', '))
                        window.alert(errorMessage)
                    }
                })
            }
        })
    })
    .catch(error => {
        const p = document.createElement('p')
        p.innerHTML = error
        p.setAttribute('style', 'padding: 20px')

        spinner.setAttribute('style', 'display: none')

        const rowIcons = document.querySelector('#rowIcons')
        rowIcons.setAttribute('style', 'display: none')

        mainTable.appendChild(p)
    })