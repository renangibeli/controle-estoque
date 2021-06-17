import {
    clientService
} from "../services/client-service.js"

const inputId = document.querySelector('#inputId')
const inputMethod = document.querySelector('#inputMethod')
const labelMethod = document.querySelector('#labelMethod')

//------>>>>>> INICIO - GRAVAR DADOS DO MÉTODOS NO BANCO DE DADOS <<<<<<------
const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', () => {

    let dbToDo
    let serverToUse
    let actionToDo
    if(inputId.value){
        dbToDo = axios.patch
        serverToUse = `${server}/metodos-pagamentos/${inputId.value}`
        actionToDo = 'atualizado'
    } else {
        dbToDo = axios.post
        serverToUse = `${server}/metodos-pagamentos`
        actionToDo = 'realizado'
    }

    let methodValid = false

    if (inputMethod.value !== ''){
        methodValid = true
    }
    

    if (methodValid) {
        dbToDo(`${serverToUse}`, {
                "tipo": inputMethod.value,
            })
            .then(response => {
                window.alert(`Cadastro de método de pagamento ${inputMethod.value} ${actionToDo} com sucesso!`)
            })
            .catch(error => console.log(error))
    } else {
        let errorFields = []
        if (!methodValid) {
            clientService.addInvalidClass(inputMethod, labelMethod)
            errorFields.push('método de pagamento')
        }

        let errorMessage = 'Corrija os seguintes campos: ' + (errorFields.join(', '))
        window.alert(errorMessage)
    }
})

//------>>>>>> FIM - GRAVAR DADOS DO VENDEDOR NO BANCO DE DADOS <<<<<<------


//------>>>>>> INICIO - BOTÃO DE LIMPAR DADOS DO MODAL <<<<<<------
const clearBtn = document.querySelector('#clearBtn')
clearBtn.addEventListener('click', () => {

    inputMethod.value = ''

    clientService.removeInvalidClass(inputMethod, labelMethod)
})


//------>>>>>> FIM - BOTÃO DE LIMPAR DADOS DO MODAL <<<<<<------


//------>>>>>> INICIO - BOTÃO DE VOLTAR DO MODAL <<<<<<------
const backBtn = document.querySelector("#backBtn")
backBtn.addEventListener('click', () => {
    const modal = document.querySelector('#modal-container')
    modal.classList.remove('show')

    inputId.value = ''
    inputMethod.value = ''

    clientService.removeInvalidClass(inputMethod, labelMethod)
})
//------>>>>>> FIM - BOTÃO DE VOLTAR DO MODAL <<<<<<------