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

    const thead = document.createElement('thead')
    table.appendChild(thead)
    
    const trHead = document.createElement('tr')
    thead.appendChild(trHead)

    const tableFields = ['ID', 'Descrição', 'Quantidade', 'Categoria', 'Custo', 'Venda', 'Tamanho', 'Cor']

    for (let i in tableFields){
        let tdHead = document.createElement('td')
        tdHead.innerHTML = tableFields[i]
        trHead.appendChild(tdHead)
        tdHead.setAttribute('data-fill-color', '808080')
        tdHead.setAttribute('data-f-color', 'f5f5f5')
        tdHead.setAttribute('data-f-bold', true)
        tdHead.setAttribute('data-b-a-s', 'thin')
    }

    const tbody = document.createElement('tbody')
    
    result.map(product => {
        const tr = document.createElement('tr')
        
        //id
        const tdId = document.createElement('td')
        tdId.innerHTML = product.id
        tdId.setAttribute('data-b-a-s', 'thin')
        tr.appendChild(tdId)

        //descrição
        const tdDescription = document.createElement('td')
        tdDescription.innerHTML = product.description
        tdDescription.setAttribute('data-b-a-s', 'thin')
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
        tr.appendChild(tdColor)

        tbody.appendChild(tr)
    })

    table.appendChild(tbody)
    spinner.setAttribute('style', 'display: none')
    mainTable.appendChild(table)
    }
})
.catch(error => console.log(error))