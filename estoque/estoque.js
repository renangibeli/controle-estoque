axios.get(`${server}/estoque`)
.then((response) => {
    const result = response.data
    let mainTable = document.querySelector('#mainTable')

    let table = document.createElement('table')
    table.setAttribute('data-cols-width', '40')

    let thead = document.createElement('thead')
    table.appendChild(thead)
    
    let trHead = document.createElement('tr')
    thead.appendChild(trHead)

    const tableFields = ['ID', 'Descrição', 'Quantidade', 'Categoria', 'Custo', 'Venda', 'Tamanho', 'Cor']

    for (i in tableFields){
        let tdHead = document.createElement('td')
        tdHead.innerHTML = tableFields[i]
        trHead.appendChild(tdHead)
        tdHead.setAttribute('data-fill-color', '808080')
        tdHead.setAttribute('data-f-color', 'f5f5f5')
        tdHead.setAttribute('data-f-bold', true)
        tdHead.setAttribute('data-b-a-s', 'thin')
    }

    let tbody = document.createElement('tbody')
    
    result.map(product => {
        let tr = document.createElement('tr')
        
        //id
        let tdId = document.createElement('td')
        tdId.innerHTML = product.id
        tdId.setAttribute('data-b-a-s', 'thin')
        tr.appendChild(tdId)

        //descrição
        let tdName = document.createElement('td')
        tdName.innerHTML = product.name
        tdName.setAttribute('data-b-a-s', 'thin')
        tr.appendChild(tdName)

        //quantidade
        let tdQuantity = document.createElement('td')
        tdQuantity.innerHTML = product.quantity
        tdQuantity.setAttribute('data-b-a-s', 'thin')
        tr.appendChild(tdQuantity)

        //categoria
        let tdCategory = document.createElement('td')
        tdCategory.innerHTML = product.category
        tdCategory.setAttribute('data-b-a-s', 'thin')
        tr.appendChild(tdCategory)

        //Preço de compra
        let tdPriceBuy = document.createElement('td')
        tdPriceBuy.innerHTML = product.priceBuy
        tdPriceBuy.setAttribute('data-b-a-s', 'thin')
        tr.appendChild(tdPriceBuy)

        //preço de venda
        let tdPriceSell = document.createElement('td')
        tdPriceSell.innerHTML = product.priceSell
        tdPriceSell.setAttribute('data-b-a-s', 'thin')
        tr.appendChild(tdPriceSell)

        //tamanho
        let tdSize = document.createElement('td')
        tdSize.innerHTML = product.size
        tdSize.setAttribute('data-b-a-s', 'thin')
        tr.appendChild(tdSize)

        //cor
        let tdColor = document.createElement('td')
        tdColor.innerHTML = product.color
        tdColor.setAttribute('data-b-a-s', 'thin')
        tr.appendChild(tdColor)

        tbody.appendChild(tr)
    })

    table.appendChild(tbody)
    let spinner = document.querySelector('#displayNone')
    spinner.setAttribute('style', 'display: none')
    mainTable.appendChild(table)
})
.catch(error => console.log(error))