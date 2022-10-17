/**
 * Focus on the first input upon page load
 *
 */
document.querySelector("input[type='text']").focus();

/**
 * Sets text input for other job explanation to hidden upon page load
 *
 */
const otherJob = document.getElementById('other-job-role');
otherJob.style.display = 'none';


/**
 * Creates a listener on the job pulldown to show other job text input or hide if deselected
 *
 */
document.getElementById('title').addEventListener('change', function () {
    if (this.value === 'other') {
        otherJob.style.display = 'inherit';
    }
    else {
        otherJob.style.display = 'none';
    }
})

/**
 * Hides color options upon page load
 *
 */
const colorOptions = document.getElementById('color');
colorOptions.disabled = true;

// Toggle Display of an element
const turnOnDisplay = (element) => {
    element.style.display = 'inherit';
}

const turnOffDisplay = (element) => {
    element.style.display = 'none';
}

/**
 * Shows or hide color options based on selected theme
 *
 */
//T shirt info
const themeOptions = document.getElementById('design');
themeOptions.addEventListener('change', function () {
    const jsPunsOptions = document.querySelectorAll('[data-theme="js puns"]')
    const heartOptions = document.querySelectorAll('[data-theme="heart js"]')
    colorOptions.disabled = false;
    if (this.value === 'js puns') {
        for (let x = 0; x < jsPunsOptions.length; x++) {
            jsPunsOptions[x].hidden = false;
            heartOptions[x].hidden = true;
        }
    }
    else {
        for (let x = 0; x < jsPunsOptions.length; x++) {
            jsPunsOptions[x].hidden = true;
            heartOptions[x].hidden = false;
        }
    }
});
// Register for Activities
const activitiesFieldset = document.getElementById('activities');
const costField = document.getElementById('activities-cost');
let activitiesCost = 0;
activitiesFieldset.addEventListener('change', (e) => {
    if (e.target.checked) {
        activitiesCost += parseInt(e.target.dataset.cost);
    } else {
        activitiesCost -= parseInt(e.target.dataset.cost);
    };
    costField.innerText = `Total: $${activitiesCost}`;
})


// Payment Info
const paymentInfo = document.getElementById('payment');
let payingByCredit = false;
const showPaymentInfo = (value) => {
    const creditCard = document.getElementById('credit-card');
    const payPal = document.getElementById('paypal');
    const bitcoin = document.getElementById('bitcoin');
    if (value === 'credit-card') {
        creditCard.style.display = 'inherit';
        payPal.style.display = 'none';
        bitcoin.style.display = 'none';
        payingByCredit = true;
    } else if (value === 'paypal') {
        creditCard.style.display = 'none';
        payPal.style.display = 'inherit';
        bitcoin.style.display = 'none';
        payingByCredit = false;
    } else {
        creditCard.style.display = 'none';
        payPal.style.display = 'none';
        bitcoin.style.display = 'inherit';
        payingByCredit = false;
    }
}


paymentInfo.children[1].selected = true;
showPaymentInfo('credit-card');
paymentInfo.addEventListener('change', function () {
    showPaymentInfo(this.value);
})


// Validate Form
const form = document.querySelector('form');

const validateName = () => {
    const name = document.getElementById('name');
    const nameHint = document.getElementById('name-hint')
    const checkName = (name) => {
        const nameRegEx = /^[a-zA-Z]+/u;
        return nameRegEx.test(name)
    }
    if (!checkName(name.value)) {
        turnOnDisplay(nameHint)
        name.parentElement.classList.remove('valid')
        name.parentElement.classList.add('not-valid')
    } else {
        turnOffDisplay(nameHint)
        name.parentElement.classList.remove('not-valid')
        name.parentElement.classList.add('valid')
    }
}

const validateEmail = () => {
    const email = document.getElementById('email');
    const emailHint = document.getElementById('email-hint');
    const checkEmail = (email) => {
        const emailRegEx = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;
        return emailRegEx.test(email)
    };
    if (!checkEmail(email.value)) {
        turnOnDisplay(emailHint)
        email.parentElement.classList.remove('valid')
        email.parentElement.classList.add('not-valid')
    } else {
        turnOffDisplay(emailHint)
        email.parentElement.classList.remove('not-valid')
        email.parentElement.classList.add('valid')
    }
}

const activities = document.getElementById('activities')

const validateRegistry = () => {
    const activitiyCheckboxes = document.querySelectorAll('#activities [type="checkbox"]');
    const registryHint = document.getElementById('activities-hint');
    let checkedActivities = 0;
    for (let i = 0; i < activitiyCheckboxes.length; i++) {
        if (activitiyCheckboxes[i].checked) {
            checkedActivities++;
        }
    }
    if (checkedActivities === 0) {
        activities.classList.remove('valid')
        activities.classList.add('not-valid')
        turnOnDisplay(registryHint);
    }
    else {
        activities.classList.remove('not-valid')
        activities.classList.add('valid')
        turnOffDisplay(registryHint)
    }

}

const validateCreditCard = () => {
    const creditCard = document.getElementById('cc-num');
    const ccHint = document.getElementById('cc-hint');
    const checkCC = (ccNum) => {
        const ccRegEx = /^[\d]{13,16}$/;
        return (ccRegEx.test(ccNum))
    }
    if (!checkCC(creditCard.value)) {
        turnOnDisplay(ccHint)
        creditCard.parentElement.classList.remove('valid')
        creditCard.parentElement.classList.add('not-valid')
    } else {
        turnOffDisplay(ccHint)
        creditCard.parentElement.classList.remove('not-valid')
        creditCard.parentElement.classList.add('valid')
    }
}

const validateZipCode = () => {
    const zipCode = document.getElementById('zip');
    const zipHint = document.getElementById('zip-hint');
    const checkZip = (zip) => {
        const zipRegEx = /^[\d]{5}/;
        return (zipRegEx.test(zip))
    }
    if (!checkZip(zipCode.value)) {
        turnOnDisplay(zipHint)
        zipCode.parentElement.classList.remove('valid')
        zipCode.parentElement.classList.add('not-valid')
    } else {
        turnOffDisplay(zipHint)
        zipCode.parentElement.classList.remove('not-valid')
        zipCode.parentElement.classList.add('valid')
    }
}
const validateCvv = () => {
    const cvv = document.getElementById('cvv');
    const cvvHint = document.getElementById('cvv-hint');
    const checkCvv = (cvv) => {
        const cvvRegEx = /^[\d]{3}$/;
        return (cvvRegEx.test(cvv))
    }
    if (!checkCvv(cvv.value)) {
        turnOnDisplay(cvvHint)
        cvv.parentElement.classList.remove('valid')
        cvv.parentElement.classList.add('not-valid')
    } else {
        turnOffDisplay(cvvHint)
        cvv.parentElement.classList.remove('not-valid')
        cvv.parentElement.classList.add('valid')
    }
}

const validatePaymentInfo = () => {
    validateCreditCard();
    validateZipCode();
    validateCvv()
}

const validateForm = (e) => {
    validateName();
    validateEmail();
    validateRegistry();
    validatePaymentInfo();
    const notValid = document.querySelectorAll('.not-valid');
    if (notValid.length > 0) {
        e.preventDefault();
    }
}
form.addEventListener('keyup', (e) => {
    if (e.target.id === 'name') {
        validateName();
    }
    else if (e.target.id === 'email') {
        validateEmail();
    }
    else if (e.target.id === 'cc-num') {
        validateCreditCard();
    }
    else if (e.target.id === 'zip') {
        validateZipCode();
    }
    else if (e.target.id === 'cvv') {
        validateCvv();
    }
})
form.addEventListener('focusout', (e) => {
    if (e.target.id === 'name') {
        validateName();
    }
    else if (e.target.id === 'email') {
        validateEmail();
    }
    else if (e.target.id === 'cc-num') {
        validateCreditCard();
    }
    else if (e.target.id === 'zip') {
        validateZipCode();
    }
    else if (e.target.id === 'cvv') {
        validateCvv();
    }
})
activities.addEventListener('change', () => {
    validateRegistry()
})
form.addEventListener('submit', (e) => {
    validateForm(e);
})