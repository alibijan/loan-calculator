// const vars
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');
const form = document.getElementById('loan-form');
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const term = document.getElementById('years');
const button = document.querySelector('input.btn');

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

    // either display results or run errorEvent()
    if( amountValue !== '' && interestValue !== 1 && termValue !== 0 ) {
        results.style.display = 'block';
    } else {
        ErrorEvent();
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

// error event
function ErrorEvent(removeErrorEvent) {
    // create error element
    const errorElement = document.createElement('div');
    // give classes to error element
    errorElement.className = 'alert alert-danger';
    // create error text
    errorElement.appendChild(document.createTextNode('Error!'));
    // insert before heading
    card.insertBefore(errorElement, heading);

    if( removeErrorEvent === 'remove' ) {
        errorElement.remove();
    }
}

// easter egg
function easterEgg(e) {
    // console.log(e.target.value);
    if(e.target.value == 80085 ) {
        inputElement = e.target;
        inputElement.style.fontFamily = 'radiolandregular';
    } else {
        inputElement.style.fontFamily = 'inherit';
    }
}