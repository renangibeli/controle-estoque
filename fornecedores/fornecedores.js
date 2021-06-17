import {
    clientService
} from '../services/client-service.js'

const title = document.querySelector('#title')

const inputId = document.querySelector('#inputId')
const inputName = document.querySelector('#inputName')
const inputCnpj = document.querySelector('#inputCnpj')

const inputCep = document.querySelector('#inputCep')
const inputAdress = document.querySelector('#inputAdress')
const inputNumber = document.querySelector('#inputNumber')
const inputComp = document.querySelector('#inputComp')
const inputDistrict = document.querySelector('#inputDistrict')
const inputCity = document.querySelector('#inputCity')
const inputUf = document.querySelector('#inputUf')

const inputTelephone = document.querySelector('#inputTelephone')
const inputCellphone = document.querySelector('#inputCellphone')

axios.get(`${server}/fornecedores`)
.then(response => {
    const result = response.data

    const mainTable = document.querySelector('#mainTable')
    const spinner = document.querySelector('#displayNone')
    const headerFields = ['ID', 'Razão Social', 'CNPJ', 'CEP', 'Endereço', 'Número', 'Complemento', 'Bairro', 'Cidade', 'UF', 'Telefone', 'Celular']
    const rowIcons = document.querySelector('#rowIcons')

    clientService.createTable(headerFields, result, mainTable, spinner, rowIcons, "fornecedor")

    // -->> SELEÇÃO DE LINHAS DENTRO DA TABELA HTML <<--
    let lines = table.getElementsByTagName("tr")

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        line.addEventListener("click", function () {
            clientService.selLines(this, false)
        })
    }
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

//------>>>>>> INICIO - BOTÃO DE CADASTRAR <<<<<<------
const createBtn = document.querySelector('#createBtn')
createBtn.addEventListener('click', () => {

    title.innerHTML = 'Cadastrar fornecedores'
    
    const modal = document.querySelector('#modal-container')
    modal.classList.add('show')
})
//------>>>>>> FINAL - BOTÃO DE CADASTRAR <<<<<<------


//------>>>>>> INICIO - BOTÃO DE EDITAR <<<<<<------
const editBtn = document.querySelector("#editBtn")

editBtn.addEventListener("click", () => {
    const selecteds = table.querySelectorAll(".selected")

    //Verificar se está selecionado
    if (selecteds.length < 1) {
        alert("Selecione pelo menos uma linha")
    } else {
        let selected = selecteds[0]
        selected = selected.querySelectorAll("td")

        inputId.value = selected[0].innerHTML
        inputName.value = selected[1].innerHTML
        inputCnpj.value = selected[2].innerHTML
        inputCep.value = selected[3].innerHTML
        inputAdress.value = selected[4].innerHTML
        inputNumber.value = selected[5].innerHTML
        inputComp.value = selected[6].innerHTML
        inputDistrict.value = selected[7].innerHTML
        inputCity.value = selected[8].innerHTML
        inputUf.value = selected[9].innerHTML
        inputTelephone.value = selected[10].innerHTML
        inputCellphone.value = selected[11].innerHTML

        title.innerHTML = 'Editar fornecedores'

        const modal = document.querySelector('#modal-container')
        modal.classList.add('show')
    }
})
//------>>>>>> FIM - BOTÃO DE EDITAR <<<<<<------

//------>>>>>> INICIO - BOTÃO DE EXCLUIR <<<<<<------
const excludeBtn = document.querySelector('#excludeBtn')
excludeBtn.addEventListener('click', () => {
    const selecteds = table.querySelectorAll(".selected")

    if (selecteds.length < 1) {
        alert("Selecione pelo menos uma linha")
    } else {
        if(window.confirm('Tem certeza que deseja excluir a linha selecionada?')){
            let selected = selecteds[0]
            selected = selected.querySelectorAll("td")
        
            axios.delete(`${server}/fornecedores/${selected[0].innerHTML}`)
            .then(window.alert(`Fornecedor: ${selected[0].innerHTML} - ${selected[1].innerHTML} excluído com sucesso`))
            .catch(error => {
                console.log(error)
            })
        }
    }
})
//------>>>>>> FIM - BOTÃO DE EXCLUIR <<<<<<------