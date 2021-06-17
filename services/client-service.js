function getRandomIntInclusive(min, max) {
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  let stringRandom = random.toString().padStart(5, '0')
  return stringRandom
}

async function getNextNumber() {
  axios.get(`${server}/estoque`)
    .then((response) => {
      const result = response.data
      let id
      if (result.length == 0) {
        id = '00001'
        return id
      } else {
        const lastIndex = result[result.length - 1]
        id = Number(lastIndex.id)
        id += 1
        id = id.toString()
        return id
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function calculateDigit(barcode) {
  let num = 0
  let result = 0

  //calcular digito
  for (let i = 1; i <= barcode.length; i++) {
    if (i % 2 == 1) {
      result += parseInt(barcode.substr(num, 1)) * 1
    } else {
      result += parseInt(barcode.substr(num, 1)) * 3
    }
    num += 1
  }

  //procurar dezena mais próxima do resultado
  let nextTen = Math.ceil(result / 10) * 10
  //calcular digito
  let digit = (nextTen - result).toString()
  return digit
}

function generateBarcode() {
  let barcodeType = document.querySelector('#barcodeType').value
  let showText = document.querySelector('#showText').value
  let productID = document.querySelector('#productID').value

  const brazil = '789'
  const company = '0001'
  //concatenar código de barra para calculo do digito
  let barcodeValue = brazil + company + productID
  let digit = calculateDigit(barcodeValue)

  //concatenar código de barra + digito
  barcodeValue += digit

  JsBarcode("#barcode", barcodeValue, {
    format: barcodeType,
    lineColor: "#000",
    width: 3,
    height: 40,
    displayValue: showText,
    font: "cursive",
  });
}

function formatCurrency(price) {
  const defaultFormat = Intl.NumberFormat("pt-br", {
    currency: "BRL",
    style: "currency"
  })

  return defaultFormat.format(price)
}

function unFormatCurrency(price) {
  //regular expression (regex)
  //R$ 1000,10 -> 100010 -> 1000,10
  return Number(price.replace(/\D/g, '')) / 100
}

function selLines(line, nLines) {
  if (!nLines) {
    let lines = line.parentElement.getElementsByTagName("tr");
    for (let i = 0; i < lines.length; i++) {
      let line_ = lines[i];
      line_.classList.remove("selected");
    }
  }
  line.classList.toggle("selected");
}

function validateFields(description, quantity, gender, buyPrice, sellPrice, size, color) {
  let [descriptionValid, quantityValid, genderValid, buyPriceValid, sellPriceValid, sizeValid, colorValid] = [false, false, false, false, false, false, false]

  if (description !== '') {
    descriptionValid = true
  }

  if (quantity > 0) {
    quantityValid = true
  }

  if (gender !== '') {
    genderValid = true
  }

  if (buyPrice > 0) {
    buyPriceValid = true
  }

  if (sellPrice > 0) {
    sellPriceValid = true
  }

  if (size !== '') {
    sizeValid = true
  }

  if (color !== '') {
    colorValid = true
  }

  return {
    descriptionValid,
    quantityValid,
    genderValid,
    buyPriceValid,
    sellPriceValid,
    sizeValid,
    colorValid
  }
}


function formatFields(description, quantity, buyPrice, sellPrice, color) {
  const formatedDescription = description.toUpperCase()
  const formatedQuantity = Number(quantity)
  const formatedBuyPrice = clientService.unFormatCurrency(buyPrice)
  const formatedSellPrice = clientService.unFormatCurrency(sellPrice)
  const formatedColor = color.toUpperCase()

  return {
    formatedDescription,
    formatedQuantity,
    formatedBuyPrice,
    formatedSellPrice,
    formatedColor
  }
}

function removeInvalidClass(input, label) {
  input.classList.remove('invalid-input')
  label.classList.remove('invalid-label')
}

function addInvalidClass(input, label) {
  input.classList.add('invalid-input')
  label.classList.add('invalid-label')
}

function createTable(headerFields, result, divTable, divSpinner, divIcons, tableType) {
  if (result.length === 0) {
    const p = document.createElement('p')
    p.innerHTML = 'Não existem dados cadastrados'
    p.setAttribute('style', 'padding: 20px')

    divIcons.setAttribute('style', 'display: none')

    divSpinner.setAttribute('style', 'display: none')
    divTable.appendChild(p)
  } else {

    //criar cabeçalho da tabela
    const table = document.createElement('table')
    table.setAttribute('data-cols-width', '40')
    table.setAttribute('id', 'table')

    const thead = document.createElement('thead')
    table.appendChild(thead)

    const trHead = document.createElement('tr')
    thead.appendChild(trHead)

    for (let i in headerFields) {
      let thHead = document.createElement('th')
      thHead.innerHTML = headerFields[i]
      thHead.setAttribute('data-fill-color', '808080')
      thHead.setAttribute('data-f-color', 'f5f5f5')
      thHead.setAttribute('data-f-bold', true)
      thHead.setAttribute('data-b-a-s', 'thin')
      trHead.appendChild(thHead)
    }

    const tbody = document.createElement('tbody')

    switch (tableType) {
      case "estoque":
        //criar linhas da tabela com dados do banco
        result.map(result => {
          const tr = document.createElement('tr')

          //id
          const tdId = document.createElement('td')
          tdId.innerHTML = result.id
          tdId.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdId)

          //descrição
          const tdDescription = document.createElement('td')
          tdDescription.innerHTML = result.description
          tdDescription.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdDescription)

          //Entrada
          const tdEntry = document.createElement('td')
          tdEntry.innerHTML = result.stock.entry
          tdEntry.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdEntry)

          //Saida
          const tdOut = document.createElement('td')
          tdOut.innerHTML = result.stock.out
          tdOut.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdOut)

          //quantidade
          const tdQuantity = document.createElement('td')
          tdQuantity.innerHTML = result.stock.quantity
          tdQuantity.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdQuantity)

          //genero
          const tdGender = document.createElement('td')
          tdGender.innerHTML = result.gender
          tdGender.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdGender)

          //Preço de compra
          const tdBuyPrice = document.createElement('td')
          const formatedBuyPrice = clientService.formatCurrency(result.buyPrice)
          tdBuyPrice.innerHTML = formatedBuyPrice
          tdBuyPrice.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdBuyPrice)

          //preço de venda
          const tdSellPrice = document.createElement('td')
          const formatedSellPrice = clientService.formatCurrency(result.sellPrice)
          tdSellPrice.innerHTML = formatedSellPrice
          tdSellPrice.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdSellPrice)

          //tamanho
          const tdSize = document.createElement('td')
          tdSize.innerHTML = result.size
          tdSize.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdSize)

          //cor
          const tdColor = document.createElement('td')
          tdColor.innerHTML = result.color
          tdColor.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdColor)

          tbody.appendChild(tr)
        })
        break
      case "vendedor":
        result.map(result => {
          const tr = document.createElement('tr')

          //nome
          const tdId = document.createElement('td')
          tdId.innerHTML = result.id
          tdId.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdId)

          //nome
          const tdName = document.createElement('td')
          tdName.innerHTML = result.nome
          tdName.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdName)

          //cpf
          const tdCpf = document.createElement('td')
          tdCpf.innerHTML = result.cpf
          tdCpf.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCpf)

          //rg
          const tdRg = document.createElement('td')
          tdRg.innerHTML = result.rg
          tdRg.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdRg)

          //Data de nascimento
          const tdDtNasc = document.createElement('td')
          tdDtNasc.innerHTML = result.dtNasc.split('-').reverse().join('/')
          tdDtNasc.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdDtNasc)

          //genero
          const tdGenero = document.createElement('td')
          tdGenero.innerHTML = result.genero
          tdGenero.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdGenero)

          //cep
          const tdCep = document.createElement('td')
          tdCep.innerHTML = result.cep
          tdCep.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCep)

          //endereco
          const tdEndereco = document.createElement('td')
          tdEndereco.innerHTML = result.endereco
          tdEndereco.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdEndereco)

          //numero
          const tdNumero = document.createElement('td')
          tdNumero.innerHTML = result.numero
          tdNumero.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdNumero)

          //complemento
          const tdComplemento = document.createElement('td')
          tdComplemento.innerHTML = result.complemento
          tdComplemento.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdComplemento)

          //bairro
          const tdBairro = document.createElement('td')
          tdBairro.innerHTML = result.bairro
          tdBairro.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdBairro)

          //cidade
          const tdCidade = document.createElement('td')
          tdCidade.innerHTML = result.cidade
          tdCidade.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCidade)

          //uf
          const tdUf = document.createElement('td')
          tdUf.innerHTML = result.uf
          tdUf.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdUf)

          //telefone
          const tdTelefone = document.createElement('td')
          tdTelefone.innerHTML = result.telefone
          tdTelefone.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdTelefone)

          //celular
          const tdCelular = document.createElement('td')
          tdCelular.innerHTML = result.celular
          tdCelular.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCelular)

          tbody.appendChild(tr)
        })
        break

      case "fornecedor":
        result.map(result => {
          const tr = document.createElement('tr')

          //id
          const tdId = document.createElement('td')
          tdId.innerHTML = result.id
          tdId.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdId)

          //nome
          const tdName = document.createElement('td')
          tdName.innerHTML = result.nome
          tdName.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdName)

          //cpf
          const tdCnpj = document.createElement('td')
          tdCnpj.innerHTML = result.cnpj
          tdCnpj.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCnpj)

          //cep
          const tdCep = document.createElement('td')
          tdCep.innerHTML = result.cep
          tdCep.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCep)

          //endereco
          const tdEndereco = document.createElement('td')
          tdEndereco.innerHTML = result.endereco
          tdEndereco.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdEndereco)

          //numero
          const tdNumero = document.createElement('td')
          tdNumero.innerHTML = result.numero
          tdNumero.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdNumero)

          //complemento
          const tdComplemento = document.createElement('td')
          tdComplemento.innerHTML = result.complemento
          tdComplemento.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdComplemento)

          //bairro
          const tdBairro = document.createElement('td')
          tdBairro.innerHTML = result.bairro
          tdBairro.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdBairro)

          //cidade
          const tdCidade = document.createElement('td')
          tdCidade.innerHTML = result.cidade
          tdCidade.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCidade)

          //uf
          const tdUf = document.createElement('td')
          tdUf.innerHTML = result.uf
          tdUf.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdUf)

          //telefone
          const tdTelefone = document.createElement('td')
          tdTelefone.innerHTML = result.telefone
          tdTelefone.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdTelefone)

          //celular
          const tdCelular = document.createElement('td')
          tdCelular.innerHTML = result.celular
          tdCelular.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCelular)

          tbody.appendChild(tr)
        })
        break

        case "metodos-pagamentos":
        result.map(result => {
          const tr = document.createElement('tr')

          //id
          const tdId = document.createElement('td')
          tdId.innerHTML = result.id
          tdId.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdId)

          //nome
          const tdTipo = document.createElement('td')
          tdTipo.innerHTML = result.tipo
          tdTipo.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdTipo)

          tbody.appendChild(tr)
        })
        break

        case "clientes":
        result.map(result => {
          const tr = document.createElement('tr')

          //nome
          const tdId = document.createElement('td')
          tdId.innerHTML = result.id
          tdId.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdId)

          //nome
          const tdName = document.createElement('td')
          tdName.innerHTML = result.nome
          tdName.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdName)

          //cpf
          const tdCpf = document.createElement('td')
          tdCpf.innerHTML = result.cpf
          tdCpf.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCpf)

          //rg
          const tdRg = document.createElement('td')
          tdRg.innerHTML = result.rg
          tdRg.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdRg)

          //Data de nascimento
          const tdDtNasc = document.createElement('td')
          tdDtNasc.innerHTML = result.dtNasc.split('-').reverse().join('/')
          tdDtNasc.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdDtNasc)

          //genero
          const tdGenero = document.createElement('td')
          tdGenero.innerHTML = result.genero
          tdGenero.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdGenero)

          //cep
          const tdCep = document.createElement('td')
          tdCep.innerHTML = result.cep
          tdCep.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCep)

          //endereco
          const tdEndereco = document.createElement('td')
          tdEndereco.innerHTML = result.endereco
          tdEndereco.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdEndereco)

          //numero
          const tdNumero = document.createElement('td')
          tdNumero.innerHTML = result.numero
          tdNumero.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdNumero)

          //complemento
          const tdComplemento = document.createElement('td')
          tdComplemento.innerHTML = result.complemento
          tdComplemento.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdComplemento)

          //bairro
          const tdBairro = document.createElement('td')
          tdBairro.innerHTML = result.bairro
          tdBairro.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdBairro)

          //cidade
          const tdCidade = document.createElement('td')
          tdCidade.innerHTML = result.cidade
          tdCidade.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCidade)

          //uf
          const tdUf = document.createElement('td')
          tdUf.innerHTML = result.uf
          tdUf.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdUf)

          //email
          const tdEmail = document.createElement('td')
          tdEmail.innerHTML = result.email
          tdEmail.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdEmail)

          //telefone
          const tdTelefone = document.createElement('td')
          tdTelefone.innerHTML = result.telefone
          tdTelefone.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdTelefone)

          //celular
          const tdCelular = document.createElement('td')
          tdCelular.innerHTML = result.celular
          tdCelular.setAttribute('data-b-a-s', 'thin')
          tr.appendChild(tdCelular)

          tbody.appendChild(tr)
        })
        break


      default:
        break
    }

    table.appendChild(tbody)
    divSpinner.setAttribute('style', 'display: none')
    divTable.appendChild(table)
  }
}

function validateFieldsVendedor(name, cpf) {
  let [nameValid, cpfValid] = [false, false]

  if (name !== '') {
    nameValid = true
  }

  if (cpf !== '' && cpf.length == 11) {
    cpfValid = true
  }

  return {
    nameValid,
    cpfValid
  }
}

function validateFieldsCliente(name, cpf, email) {
  let [nameValid, cpfValid, emailValid] = [false, false, false]

  if (name !== '') {
    nameValid = true
  }

  if (cpf !== '' && cpf.length == 11) {
    cpfValid = true
  }

  if (email !== '' && email.includes('@')){
    emailValid = true
  }

  return {
    nameValid,
    cpfValid,
    emailValid
  }
}

function validateFieldsFornecedor(name, cnpj) {
  let [nameValid, cnpjValid] = [false, false]

  if (name !== '') {
    nameValid = true
  }

  if (cnpj !== '' && cnpj.length == 14) {
    cnpjValid = true
  }

  return {
    nameValid,
    cnpjValid
  }
}




export const clientService = {
  getRandomIntInclusive,
  getNextNumber,
  calculateDigit,
  generateBarcode,
  formatCurrency,
  unFormatCurrency,
  selLines,
  validateFields,
  formatFields,
  removeInvalidClass,
  addInvalidClass,
  createTable,
  validateFieldsVendedor,
  validateFieldsFornecedor,
  validateFieldsCliente
}