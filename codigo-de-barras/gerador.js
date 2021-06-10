import { clientService } from '../services/client-service.js'

let btnBarcode = document.querySelector('#btnBarcode')

btnBarcode.addEventListener('click', () => clientService.generateBarcode())
