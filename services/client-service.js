function getRandomIntInclusive(min, max) {
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let stringRandom = random.toString().padStart(5, '0')
    return stringRandom
  }

function calculateDigit(barcode){
    let num = 0
    let result = 0
  
    //calcular digito
    for(let i=1; i<=barcode.length; i++){
      if( i % 2 == 1){
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
  
function generateBarcode(){
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

function formatCurrency(price){
  const defaultFormat = Intl.NumberFormat("pt-br", {
      currency: "BRL",
      style: "currency"
  })

  return defaultFormat.format(price)
}
  
function unFormatCurrency(price){
  //regular expression (regex)
  //R$ 1000,10 -> 100010 -> 1000,10
  return Number(price.replace(/\D/g, '')) / 100
}

function selLines(line, nLines){
  if(!nLines){
    let lines = line.parentElement.getElementsByTagName("tr");
    for(let i = 0; i < lines.length; i++){
      let line_ = lines[i];
      line_.classList.remove("selected");  
    }
  }
  line.classList.toggle("selected");
 }


  export const clientService = {
      getRandomIntInclusive,
      calculateDigit,
      generateBarcode,
      formatCurrency,
      unFormatCurrency,
      selLines
  }