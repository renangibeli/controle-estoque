const inputName = document.querySelector('#inputName')
const inputCpf = document.querySelector('#inputCpf')
const inputRg = document.querySelector('#inputRg')
const inputBirthday = document.querySelector('#inputBirthday')
const inputGender = document.querySelector('#inputGender')

const inputCep = document.querySelector('#inputCep')
const inputAdress = document.querySelector('#inputAdress')
const inputNumber = document.querySelector('#inputNumber')
const inputComp = document.querySelector('#inputComp')
const inputDistrict = document.querySelector('#inputDistrict')
const inputCity = document.querySelector('#inputCity')
const inputUf = document.querySelector('#inputUf')

const inputTelephone = document.querySelector('#inputTelephone')
const inputCellphone = document.querySelector('#inputCellphone')


Inputmask("999.999.999-99").mask(inputCpf)
Inputmask("99.999.999-9").mask(inputRg)
Inputmask("99999-999").mask(inputCep)
Inputmask("(99) 9999-9999").mask(inputTelephone)
Inputmask("(99) 9 9999-9999").mask(inputCellphone)



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

const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', () => {
    axios.post(`${server}/vendedores`,{
        "nome": inputName.value,
        "cpf": inputCpf.value,
        "rg": inputRg.value,
        "dtNasc": inputBirthday.value,
        "genero": inputGender.value,
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
    .then((response) => {
        window.alert(`Cadastro do vendedor ${inputName.value} realizado com sucesso!`)
    })
    .catch(error => console.log(error)) 
})


const backBtn = document.querySelector("#backBtn")
                    clearBtn.addEventListener('click', () => {
                        modal.classList.remove('show')
                        /* clientService.removeInvalidClass(inputDescription, labelDescripition)
                        clientService.removeInvalidClass(inputQuantity, labelQuantity)
                        clientService.removeInvalidClass(inputGender, labelGender)
                        clientService.removeInvalidClass(inputBuyPrice, labelBuyPrice)
                        clientService.removeInvalidClass(inputSellPrice, labelSellPrice)
                        clientService.removeInvalidClass(inputSize, labelSize)
                        clientService.removeInvalidClass(inputColor, labelColor) */
                    })