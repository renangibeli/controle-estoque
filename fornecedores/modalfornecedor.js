import {
    clientService
} from "../services/client-service.js"

const inputId = document.querySelector('#inputId')

const inputName = document.querySelector('#inputName')
const labelName = document.querySelector('#labelName')

const inputCnpj = document.querySelector('#inputCnpj')
const labelCnpj = document.querySelector('#labelCnpj')

const inputCep = document.querySelector('#inputCep')
const inputAdress = document.querySelector('#inputAdress')
const inputNumber = document.querySelector('#inputNumber')
const inputComp = document.querySelector('#inputComp')
const inputDistrict = document.querySelector('#inputDistrict')
const inputCity = document.querySelector('#inputCity')
const inputUf = document.querySelector('#inputUf')

const inputTelephone = document.querySelector('#inputTelephone')
const inputCellphone = document.querySelector('#inputCellphone')

//------>>>>>> INICIO - INCLUIR MASCARAS <<<<<<------
Inputmask("99.999.999/9999-99").mask(inputCnpj)
Inputmask("99999-999").mask(inputCep)
Inputmask("(99) 9999-9999").mask(inputTelephone)
Inputmask("(99) 9 9999-9999").mask(inputCellphone)
//--->>> FIM - INCLUIR MASCARAS <<<<<<------

//------>>>>>> INICIO - API PARA BUSCAR DADOS DO CEP <<<<<<------
inputCep.addEventListener('blur', () => {
    let unmaskCep = inputCep.inputmask.unmaskedvalue()

    if (unmaskCep.length == 8) {
        axios.get(`https://viacep.com.br/ws/${inputCep.value}/json/`)
            .then(response => {
                const result = response.data
                inputAdress.value = result.logradouro
                inputDistrict.value = result.bairro
                inputCity.value = result.localidade
                inputUf.value = result.uf
            })
            .catch()
    } else {
        inputAdress.value = ''
        inputDistrict.value = ''
        inputCity.value = ''
        inputUf.value = ''
    }
})
//------>>>>>> FIM - API PARA BUSCAR DADOS DO CEP <<<<<<------


//------>>>>>> INICIO - GRAVAR DADOS DO VENDEDOR NO BANCO DE DADOS <<<<<<------
const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', () => {

    let dbToDo
    let serverToUse
    let actionToDo
    if(inputId.value){
        dbToDo = axios.patch
        serverToUse = `${server}/fornecedores/${inputId.value}`
        actionToDo = 'atualizado'
    } else {
        dbToDo = axios.post
        serverToUse = `${server}/fornecedores`
        actionToDo = 'realizado'
    }
    
    const unmaskCnpj = inputCnpj.inputmask.unmaskedvalue()

    const {
        nameValid,
        cnpjValid
    } = clientService.validateFieldsFornecedor(inputName.value, unmaskCnpj)

    if (nameValid && cnpjValid) {
        dbToDo(`${serverToUse}`, {
                "nome": inputName.value,
                "cnpj": inputCnpj.value,
                "cep": inputCep.value,
                "endereco": inputAdress.value,
                "numero": inputNumber.value,
                "complemento": inputComp.value,
                "bairro": inputDistrict.value,
                "cidade": inputCity.value,
                "uf": inputUf.value,
                "telefone": inputTelephone.value,
                "celular": inputCellphone.value
            })
            .then(response => {
                window.alert(`Cadastro do fornecedor ${inputName.value} ${actionToDo} com sucesso!`)
            })
            .catch(error => console.log(error))
    } else {
        let errorFields = []
        if (!nameValid) {
            clientService.addInvalidClass(inputName, labelName)
            errorFields.push('razão social')
        }

        if (!cnpjValid) {
            clientService.addInvalidClass(inputCnpj, labelCnpj)
            errorFields.push('CNPJ')
        }

        let errorMessage = 'Corrija os seguintes campos: ' + (errorFields.join(', '))
        window.alert(errorMessage)
    }
})

//------>>>>>> FIM - GRAVAR DADOS DO VENDEDOR NO BANCO DE DADOS <<<<<<------


//------>>>>>> INICIO - BOTÃO DE LIMPAR DADOS DO MODAL <<<<<<------
const clearBtn = document.querySelector('#clearBtn')
clearBtn.addEventListener('click', () => {

    inputName.value = ''
    inputCnpj.value = ''
    inputCep.value = ''
    inputAdress.value = ''
    inputNumber.value = ''
    inputComp.value = ''
    inputDistrict.value = ''
    inputCity.value = ''
    inputUf.value = ''
    inputTelephone.value = ''
    inputCellphone.value = ''

    clientService.removeInvalidClass(inputName, labelName)
    clientService.removeInvalidClass(inputCnpj, labelCnpj)
})
//------>>>>>> FIM - BOTÃO DE LIMPAR DADOS DO MODAL <<<<<<------


//------>>>>>> INICIO - BOTÃO DE VOLTAR DO MODAL <<<<<<------
const backBtn = document.querySelector("#backBtn")
backBtn.addEventListener('click', () => {
    const modal = document.querySelector('#modal-container')
    modal.classList.remove('show')

    inputId.value = ''
    inputName.value = ''
    inputCnpj.value = ''
    inputCep.value = ''
    inputAdress.value = ''
    inputNumber.value = ''
    inputComp.value = ''
    inputDistrict.value = ''
    inputCity.value = ''
    inputUf.value = ''
    inputTelephone.value = ''
    inputCellphone.value = ''

    clientService.removeInvalidClass(inputName, labelName)
    clientService.removeInvalidClass(inputCnpj, labelCnpj)
})
//------>>>>>> FIM - BOTÃO DE VOLTAR DO MODAL <<<<<<------