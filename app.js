// include ConvolverNode.j

const baseCurrencyURL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-07-10/v1/currencies/usd.json';
const baseFlagURL = `https://flagsapi.com/IN/flat/64.png`;

const flagElements = document.querySelectorAll("#flag");
const selectFrom = document.getElementById("from")
const selectTo = document.getElementById("to");
const selectElemets = [selectFrom, selectTo];
const convertButton = document.getElementById("convert");
const exchangeButton = document.getElementById("exchange");
const countryFlag = document.querySelector("country-flag");
const input = document.querySelector("#input");
const result = document.getElementById("result");
let previousFrom;
let previousTo;

let currVal;


document.addEventListener('DOMContentLoaded', () => {
    // populating select with country code

    if (input.value <= 0) {
        input.value = 1;
    }

    // clearing existing values
    selectFrom.innerHTML = "";
    selectTo.innerHTML = "";

    // filling select values from code.js coutry code
    for (let i = 0; i < selectElemets.length; i++) {
        Object.keys(countryList).forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            option.text = code;
            selectElemets[i].appendChild(option);

        })
    }

    // default values of select elemnts
    selectFrom.value = 'USD';
    selectTo.value = 'INR';
    

    // swapping select elemts
    exchangeButton.addEventListener('click', () => {
        // swapping elements
        const temp = selectFrom.value;
        selectFrom.value = selectTo.value;
        selectTo.value = temp;
        for (const element of selectElemets) {
            UpdateFlag(element);
        }
    });

    for (const i of selectElemets) {
        i.addEventListener("change", (e) => {
            UpdateFlag(i);
        });
    }


});

const UpdateFlag = (element) => {
    let currCode = element.value;
    // let newURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-07-10/v1/currencies/${currCode}.json`;
    let countryCode = countryList[currCode];
    let newURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.parentElement.querySelector('#country-flag');
    img.src = newURL;
    
}


convertButton.addEventListener('click', (e) => {
    GetCurrencyURL(selectFrom.value, selectTo.value);

    // console.log(toCurrCode);
})



const GetCurrencyURL = (fromCurrCode , toCurrCode) => {
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-07-10/v1/currencies/${fromCurrCode.toLowerCase()}.json`;
    
    GetCurrencyValue(url, toCurrCode , fromCurrCode);
    
    // console.log(url);
}

async function GetCurrencyValue(url , toCurrCode , fromCurrCode) {
    try {
        let response = await fetch(url);
        let data = await response.json();

        // console.log(toCurrCode.toLowerCase());
        currVal = data[fromCurrCode.toLowerCase()][toCurrCode.toLowerCase()];
        // console.log(currVal);

        ConvertCurrency(currVal, fromCurrCode, toCurrCode);

    } catch (e) {
        
    }
}

const ConvertCurrency = (currVal , fromCurrCode , toCurrCode) => {
    let r = currVal * input.value;
    result.textContent = `${input.value} ${fromCurrCode} = ${r} ${toCurrCode}`
}




