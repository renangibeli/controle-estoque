import { clientService } from '../services/client-service.js'

axios.get(`${server}/estoque`)
.then((response) => {
    const result = response.data

    const mainTable = document.querySelector('#mainTable')
    const spinner = document.querySelector('#displayNone')

    if(result.length === 0){
        const p = document.createElement('p')
        p.innerHTML = 'Não existem produtos cadastrados'
        p.setAttribute('style', 'padding: 20px')

        const rowIcons = document.querySelector('#rowIcons')
        rowIcons.setAttribute('style', 'display: none')

        spinner.setAttribute('style', 'display: none')
        mainTable.appendChild(p)
    } else {

        const table = document.createElement('table')
        table.setAttribute('data-cols-width', '40')
        table.setAttribute('id', 'table')

        const thead = document.createElement('thead')
        table.appendChild(thead)
        
        const trHead = document.createElement('tr')
        thead.appendChild(trHead)

        const tableFields = ['ID', 'Descrição', 'Quantidade', 'Categoria', 'Custo', 'Venda', 'Tamanho', 'Cor']

        for (let i in tableFields){
            let thHead = document.createElement('th')
            thHead.innerHTML = tableFields[i]
            thHead.setAttribute('data-fill-color', '808080')
            thHead.setAttribute('data-f-color', 'f5f5f5')
            thHead.setAttribute('data-f-bold', true)
            thHead.setAttribute('data-b-a-s', 'thin')
            trHead.appendChild(thHead)
        }

        const tbody = document.createElement('tbody')
        
        result.map(product => {
            const tr = document.createElement('tr')
            
            //id
            const tdId = document.createElement('td')
            tdId.innerHTML = product.id
            tdId.setAttribute('data-b-a-s', 'thin')
            /* tdId.setAttribute('style', 'text-align: right') */
            tr.appendChild(tdId)

            //descrição
            const tdDescription = document.createElement('td')
            tdDescription.innerHTML = product.description
            tdDescription.setAttribute('data-b-a-s', 'thin')
            /* tdDescription.setAttribute('style', 'text-align: left') */
            tr.appendChild(tdDescription)

            //quantidade
            const tdQuantity = document.createElement('td')
            tdQuantity.innerHTML = product.quantity
            tdQuantity.setAttribute('data-b-a-s', 'thin')
            tr.appendChild(tdQuantity)

            //categoria
            const tdCategory = document.createElement('td')
            tdCategory.innerHTML = product.category
            tdCategory.setAttribute('data-b-a-s', 'thin')
            tr.appendChild(tdCategory)

            //Preço de compra
            const tdBuyPrice = document.createElement('td')
            const formatedBuyPrice = clientService.formatCurrency(product.buyPrice) 
            tdBuyPrice.innerHTML = formatedBuyPrice
            tdBuyPrice.setAttribute('data-b-a-s', 'thin')
            tr.appendChild(tdBuyPrice)

            //preço de venda
            const tdSellPrice = document.createElement('td')
            const formatedSellPrice = clientService.formatCurrency(product.sellPrice)
            tdSellPrice.innerHTML = formatedSellPrice
            tdSellPrice.setAttribute('data-b-a-s', 'thin')
            tr.appendChild(tdSellPrice)

            //tamanho
            const tdSize = document.createElement('td')
            tdSize.innerHTML = product.size
            tdSize.setAttribute('data-b-a-s', 'thin')
            tr.appendChild(tdSize)

            //cor
            const tdColor = document.createElement('td')
            tdColor.innerHTML = product.color
            tdColor.setAttribute('data-b-a-s', 'thin')
            /* tdColor.setAttribute('style', 'text-align: left') */
            tr.appendChild(tdColor)

            tbody.appendChild(tr)
        })
        
        table.appendChild(tbody)
        spinner.setAttribute('style', 'display: none')
        mainTable.appendChild(table)
    
        // -->> INICIO - REVISAR PARA TRANSFORMAR EM ASSINCRONO APÓS CRIAÇÃO DA TABELA <<--
        let lines = table.getElementsByTagName("tr")

        for(let i = 0; i < lines.length; i++){
            let line = lines[i];

            line.addEventListener("click", function(){
                clientService.selLines(this, false)
            })
        }

        const editBtn = document.querySelector("#editBtn")
        

        editBtn.addEventListener("click", () => {
            const selecteds = table.querySelectorAll(".selected")

            //Verificar se está selecionado
            if(selecteds.length < 1){
                alert("Selecione pelo menos uma linha")
            } else {
                let selected = selecteds[0]
                selected = selected.querySelectorAll("td")

                const productID = document.querySelector('#productID')
                productID.value = selected[0].innerHTML
                const description = document.querySelector('#description')
                description.value = selected[1].innerHTML
                const quantity = document.querySelector('#quantity')
                quantity.value = selected[2].innerHTML
                const category = document.querySelector('#category')
                category.value = selected[3].innerHTML
                const buyPrice = document.querySelector('#buyPrice')
                buyPrice.value = selected[4].innerHTML.replace('&nbsp;', ' ')
                const sellPrice = document.querySelector('#sellPrice')  
                sellPrice.value = selected[5].innerHTML.replace('&nbsp;', ' ')
                const size = document.querySelector('#size')
                size.value = selected[6].innerHTML
                const color = document.querySelector('#color')
                color.value = selected[7].innerHTML

                const modal = document.querySelector('#modal-container')
                modal.classList.add('show')
    
                const clearBtn = document.querySelector("#clearBtn")
                clearBtn.addEventListener('click', () => {
                    modal.classList.remove('show')
                })

                const addBtn = document.querySelector('#addBtn')
                addBtn.addEventListener('click', () => {
                    const unformatedBuyPrice =  clientService.unFormatCurrency(buyPrice.value) 
                    const unformatedSellPrice =  clientService.unFormatCurrency(sellPrice.value) 
                    const formatedDescription = description.value.toUpperCase()
                    const formatedColor = color.value.toUpperCase()

                    axios.patch(`${server}/estoque/${productID.value}`, {
                        "description": formatedDescription,
                        "quantity": Number(quantity.value),
                        "category": category.value,
                        "buyPrice": unformatedBuyPrice,
                        "sellPrice": unformatedSellPrice,
                        "size": size.value,
                        "color": formatedColor
                    })
                    .then(response => window.alert(`Modificação do produto ${productID.value} - ${formatedDescription} realizada com sucesso!`))
                    .catch(error => console.log(error))
                })
            }
        })
    }
})
.catch(error => console.log(error))

