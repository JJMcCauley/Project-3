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

/**
 * Shows or hides an element
 *
 * @param {element} element The element to be shown or hidden
 */
const turnOnDisplay = (element) => {
    element.style.display = 'inherit';
}

const turnOffDisplay = (element) => {
    element.style.display = 'none';
}

/**
 * Shows or hide t-shirt color options based on selected theme
 *
 */
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
        jsPunsOptions[0].selected = true;
    }
    else {
        for (let x = 0; x < jsPunsOptions.length; x++) {
            jsPunsOptions[x].hidden = true;
            heartOptions[x].hidden = false;
        }
        heartOptions[0].selected = true;
    }
});

/**
 * Allows for activities to be resistered for and adds up their price total
 *
 */
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


/**
 * Shows only selected payment method's information and defaults to credit  card
 *
 */
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


/**
 * Form Validation
 *
 */
const form = document.querySelector('form');

/**
 * validates name against several regular expressions and provides feedback based on which tests are passed
 *
 */
const validateName = () => {
    let errors = 0;
    const name = document.getElementById('name');
    const nameHint = document.getElementById('name-hint')
    let nameHintHtml = ''
    const checkName = (name) => {
        const nameRegEx = /^[a-zA-Z][a-zA-Z\s]*$/u;
        return nameRegEx.test(name)
    }
    const checkEmpty = (name) => {
        if (name.value === '') {
            return true;
        }
    }
    const checkFirstLetter = (name) => {
        const firstLetterRegEx = /^[a-zA-Z]/;
        return firstLetterRegEx.test(name);
    }
    if (checkEmpty(name)) {
        nameHintHtml += 'Name field cannot be blank<br>';
        errors++;
    }
    if (!checkFirstLetter(name)) {
        nameHintHtml += `First character must be a letter<br>`
    }
    if (!checkName(name.value)) {
        nameHintHtml += `Name must consist of letters and spaces only`;
        nameHint.innerHTML = nameHintHtml;
        turnOnDisplay(nameHint)
        name.parentElement.classList.remove('valid')
        name.parentElement.classList.add('not-valid')
        errors++;
    } else {
        turnOffDisplay(nameHint)
        name.parentElement.classList.remove('not-valid')
        name.parentElement.classList.add('valid')
    }
    return errors;
}

/**
 * Validates email using a regular expression and provides feedback if invalid email is entered
 *
 */
const validateEmail = () => {
    let errors = 0;
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
        errors++;
    } else {
        turnOffDisplay(emailHint)
        email.parentElement.classList.remove('not-valid')
        email.parentElement.classList.add('valid')
    }
    return errors;
}

/**
 * Validates activities registered for by ensuring an activity has been chosen and disabling activities at the same time
 *
 */
const activities = document.getElementById('activities')
const activitiyCheckboxes = document.querySelectorAll('#activities [type="checkbox"]');
const validateRegistry = () => {
    let errors = 0;
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
        errors++;
    }
    else {
        activities.classList.remove('not-valid')
        activities.classList.add('valid')
        turnOffDisplay(registryHint)
    }
    return errors;
}

/**
 * Ensures valid credit card number has been entered
 *
 */
const validateCreditCard = () => {
    let errors = 0;
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
        errors++;
    } else {
        turnOffDisplay(ccHint)
        creditCard.parentElement.classList.remove('not-valid')
        creditCard.parentElement.classList.add('valid')
    }
    return errors;
}

/**
 * Ensures valid zip code has been entered
 *
 */
const validateZipCode = () => {
    let errors = 0;
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
        errors++;
    } else {
        turnOffDisplay(zipHint)
        zipCode.parentElement.classList.remove('not-valid')
        zipCode.parentElement.classList.add('valid')
    }
    return errors;
}

/**
 * Ensures valid CVV has been entered
 *
 */
const validateCvv = () => {
    const cvv = document.getElementById('cvv');
    const cvvHint = document.getElementById('cvv-hint');
    let errors = 0;
    const checkCvv = (cvv) => {
        const cvvRegEx = /^[\d]{3}$/;
        return (cvvRegEx.test(cvv))
    }
    if (!checkCvv(cvv.value)) {
        turnOnDisplay(cvvHint)
        cvv.parentElement.classList.remove('valid')
        cvv.parentElement.classList.add('not-valid')
        errors++;
    } else {
        turnOffDisplay(cvvHint)
        cvv.parentElement.classList.remove('not-valid')
        cvv.parentElement.classList.add('valid')
    }
    return errors;
}

/**
 * Runs all credit card validations at once
 *
 */
const validatePaymentInfo = () => {
    let errors = 0;
    errors += validateCreditCard();
    errors += validateZipCode();
    errors += validateCvv();
    return errors;
}

/**
 * Runs all form validations
 *
 */
const validateForm = (e) => {
    let errors = 0;
    errors += validateName();
    errors += validateEmail();
    errors += validateRegistry();
    if (payingByCredit) {
        errors += validatePaymentInfo();
    }
    if (errors > 0) {
        e.preventDefault();
    }
}

/**
 * Checks a given registry entry for scheduling conflicts and disables or renables as appropriate
 *
 * @param {element} node Which group of nine students will be chosen
 */
const checkForScheduleConflicts = (node) => {
    const activityTime = node.dataset.dayAndTime;
    const activityName = node.name;
    for (let i = 0; i < activitiyCheckboxes.length; i++) {
        const currentCheckbox = activitiyCheckboxes[i];
        if (node.checked) {
            if (currentCheckbox.name !== activityName && currentCheckbox.dataset.dayAndTime === activityTime) {
                currentCheckbox.parentElement.classList.add('disabled')
                currentCheckbox.disabled = true;
            }
        } else {
            if (currentCheckbox.name !== activityName && currentCheckbox.dataset.dayAndTime === activityTime) {
                currentCheckbox.parentElement.classList.remove('disabled')
                currentCheckbox.disabled = false;
            }
        }
    }
}

/**
 * Validates a form field when a key is entered in one of their fields
 */
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

/**
 * Validates a form field when it loses focus
 */
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

/**
 * listens for a change to event registry checkbox state and validates registry
 */
activities.addEventListener('change', (e) => {
    validateRegistry()
    checkForScheduleConflicts(e.target);
})
form.addEventListener('submit', (e) => {
    validateForm(e);
})

/**
 * Adds focus class to all checkbox elements
 */
for (let i = 0; i < activitiyCheckboxes.length; i++) {
    const activeCheckBox = activitiyCheckboxes[i];
    activeCheckBox.addEventListener('focus', function () {
        this.parentElement.classList.add('focus')
    })
    activeCheckBox.addEventListener('blur', function () {
        this.parentElement.classList.remove('focus')
    })
}

