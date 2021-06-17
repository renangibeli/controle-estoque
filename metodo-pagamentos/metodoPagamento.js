import {
    clientService
} from '../services/client-service.js'

const title = document.querySelector('#title')


const inputId = document.querySelector('#inputId')
const inputMethod = document.querySelector('#inputMethod')

axios.get(`${server}/metodos-pagamentos`)
.then(response => {
    const result = response.data

    const mainTable = document.querySelector('#mainTable')
    const spinner = document.querySelector('#displayNone')
    const headerFields = ['ID', 'Método de Pagamento']
    const rowIcons = document.querySelector('#rowIcons')

    clientService.createTable(headerFields, result, mainTable, spinner, rowIcons, "metodos-pagamentos")

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

    title.innerHTML = 'Cadastrar Métodos de Pagamento'
    
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
        inputMethod.value = selected[1].innerHTML

        title.innerHTML = 'Editar Métodos de Pagamento'

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
        
            axios.delete(`${server}/metodos-pagamentos/${selected[0].innerHTML}`)
            .then(window.alert(`Métodos de pagamento: ${selected[0].innerHTML} - ${selected[1].innerHTML} excluído com sucesso`))
            .catch(error => {
                console.log(error)
            })
        } 
    }
})
//------>>>>>> FIM - BOTÃO DE EXCLUIR <<<<<<------