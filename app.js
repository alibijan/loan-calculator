// const vars
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');
const form = document.getElementById('loan-form');
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const term = document.getElementById('years');
const button = document.querySelector('input.btn-calculate');

const loadingElement = document.getElementById('loading');
const loadingHeader = document.querySelector('.loading-header');

const resultsHeading = document.querySelector('h5');
const results = document.getElementById('results');
    const paymentMonthly = document.getElementById('monthly-payment');
    const paymentTotal = document.getElementById('total-payment');
    const paymentInterest = document.getElementById('total-interest');

// var holders
let amountValue;
let interestValue;
let termValue;

let powerOf;

let inputElement;


// Eventhandler function
loadEventListeners();
function loadEventListeners() {
    // get values from input when calculate is pressed
    button.addEventListener('click', formValues);

    // calculate button event listener
    button.addEventListener('click', buttonEvent);

    // clear button
    button.addEventListener('click', clearButton);

    // close error
    card.addEventListener('click', closeError); // running through card to avoid null error
    
    // easter egg event listener
    form.addEventListener('keyup', easterEgg);
}


// Form values function
function formValues() {
    // Get the values for form field
    amountValue = amount.value;
    interestValue = (interest.value / 100 / 12) + 1; // from percent to decimal
    termValue = term.value * 12;

    // console.log(`Loan amount: ${amountValue}`);
    // console.log(`Loan interest: ${interestValue}`);
    // console.log(`Loan term: ${termValue}`);
}

// calculate button event
function buttonEvent(e) {
    // clear results
    paymentMonthly.setAttribute('value', '');
    paymentTotal.setAttribute('value', '');
    paymentInterest.setAttribute('value', '');
    // if error exists, remove it
    const errorElement = document.querySelectorAll('.alert');
    errorElement.forEach(function(e) {
        e.parentNode.removeChild(e);
    });

    // no errors, loan is calculated
    const success = amountValue !== '' && interestValue !== 1 && termValue !== 0;

    // check if results is already being shown
    console.log(results.style.display === 'block');
    const resultsDisplayed = results.style.display === 'block';

    // either display results or run errorEvent()
    if( success && resultsDisplayed === false ) {
        // load if results aren't being displayed already
        load();
    } else if ( success && resultsDisplayed === true ) {
        // Do nothing if results are being displayed already
    } else {
        errorEvent();
    }

    // set monthly payment input
    paymentMonthly.setAttribute('value', `$${monthlyPayment()}`);
    paymentTotal.setAttribute('value', `$${totalPayment()}`);
    paymentInterest.setAttribute('value', `$${totalInterest()}`);

    // calculate monthly payment
    function monthlyPayment() {
        // who knew the math for a simple loan calculator would be so annoying
        powerOf = Math.pow(interestValue, -(termValue)); // 0.5237
        // let powerOf = Math.pow(interestValue, -(termValue));
        let monthlyAmount = ((interestValue - 1) / (-(powerOf - 1))) * amountValue;
        return monthlyAmount.toFixed(2);
    }
    // calculate total payment
    function totalPayment() {
        let totalAmount = monthlyPayment() * termValue;
        return totalAmount.toFixed(2);
    }
    // calculate total interest
    function totalInterest() {
        let totalInterestAmount = totalPayment() - amountValue;
        return totalInterestAmount.toFixed(2);
    }

    // prevent default
    e.preventDefault();
}

// Loading event
function load() {
    // // DISCLAIMER:
    // I realize adding a fake loading screen is the worst thing ever, but it's a part of the projects challenge

    // display loading element
    loadingElement.style.display = 'block';

    // pick how long it will load for, between 0 - 2 seconds
    const loadTime = Math.floor(Math.random() * 2000);
    console.log(loadTime);

    // disable loading image
    setTimeout(function(){
        // hiding loader
        loadingElement.style.display = 'none';

        // displaying results
        results.style.display = 'block';
    }, loadTime);
}

// clear button event
function clearButton() {
    // checks if fields are empty
    const success = amountValue !== '' && interestValue !== 1 && termValue !== 0;

    if( success ) {
        const buttonClearAll = document.querySelectorAll('.btn-clear');
        const buttonClearArray = Array.from(buttonClearAll);
        if( buttonClearArray.length < 1 ) {
            // creating clear button
            const clearElement = document.createElement('input');
            clearElement.setAttribute('type', 'submit');
            clearElement.setAttribute('value', 'Clear Results');
            clearElement.className = 'btn btn-clear';
            // inserting clear button
            button.parentElement.insertBefore(clearElement, button);

            // changing width for buttons
            const clearButton = document.querySelector('input.btn-clear');
            // styling buttons
            clearButton.style.float = 'left';
            button.style.width = `calc(100% - (${clearButton.offsetWidth}px + 5px))`;
            button.style.float = 'right';

            // clear button event listener
            clearButton.addEventListener('click', clearButtonAction);
            function clearButtonAction(e) {
                // loan values
                amount.value = '';
                interest.value = '';
                term.value = '';
                // result values
                paymentMonthly.setAttribute('value', '');
                paymentTotal.setAttribute('value', '');
                paymentInterest.setAttribute('value', '');

                // hide results
                results.style.display = 'none';

                // hide clear button
                clearButton.remove();
                
                // reset calculate button styling
                button.style.width = '100%';

                e.preventDefault();
            }
        } else {
            buttonClearArray.splice(1, buttonClearArray.length - 1);
        }
    }
}

// add comma after 3rd number
// not added yet, but idea for doing this:
// return calculated value in reverse, count it, if it has a value>3, add , on the 3rd one?

// error event
function errorEvent() {
    // create error element
    const errorElement = document.createElement('div');
    // give classes to error element
    errorElement.className = 'alert alert-danger';
    // create error text
    errorElement.appendChild(document.createTextNode('Error!'));

    // create close link
    const errorElementClose = document.createElement('button');
    // give classes to link
    errorElementClose.className = 'close';
    // add x to link
    errorElementClose.innerHTML = 'x';

    // insert link to error element
    errorElement.appendChild(errorElementClose);
    // insert error element before heading
    card.insertBefore(errorElement, heading);
}

// close error event
function closeError(e) {
    const errorButton = document.querySelector('.close');

    // if clicked on x
    if( e.target === errorButton ) {
        // select alert
        const errorElement = document.querySelectorAll('.alert');
        // loop through parent of error, and remove
        errorElement.forEach(function(e) {
            e.parentNode.removeChild(e);
        });
    }
}

// easter egg
function easterEgg(e) {
    if(e.target.value == 80085 ) {
        inputElement = e.target;
        inputElement.style.fontFamily = 'radiolandregular';
    } else {
        if( inputElement ) {
            inputElement.style.fontFamily = 'inherit';
        }
    }
}