const url = 'http://192.99.46.183/~thespark/php/contact_me.php';

const submitBtn = document.querySelector('#submitBtn');
const formResponse = document.querySelector('.form__response');
const formInputs = document.querySelectorAll('.form-input');

function initContactForm() {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        submitContactForm();
    });
    formInputs.forEach(input => input.addEventListener('input', () => {
        input.classList.remove('input-error');
        formResponse.classList.remove('active');
        formResponse.textContent = "";
    }));

}


function postForm(data) {        
    $.post(url, data, function (data) {
        formResponse.textContent = 'Thank you! We will be in touch shortly.'
        formResponse.classList.add('active');

        setTimeout(() => {
            formResponse.classList.remove('active');
            formResponse.textContent = "";

            formInputs.forEach(input => input.value = '');
        }, 3000);
    }).fail(err => {
        formResponse.textContent = 'Something went wrong...'
        formResponse.classList.add('active');
        console.log(err);
    });
}

function submitContactForm() {
    let formValid = true;

    const userFirstName = document.querySelector(".form-input[name='firstName']");
    const userLastName = document.querySelector(".form-input[name='lastName']");
    const userEmail = document.querySelector(".form-input[name='email']");
    const userPhone = document.querySelector(".form-input[name='phoneNumber']");
    const userMessage = document.querySelector(".form-input[name='message']");
    const userConsent = document.querySelector('#consent').checked;

    const requiredFields = [userFirstName, userLastName, userEmail, userPhone, userMessage];

    requiredFields.forEach(input => {
        if (input.value === "") {
            formValid = false;
            input.classList.add('input-error');
            formResponse.textContent = "Please fill out all required fields";
            formResponse.classList.add('active');
        }
    });
    
    if (formValid) {
        if (!userConsent) {
            formValid = false;
            formResponse.textContent = "Please acknowledge the privacy policy";
            formResponse.classList.add('active');
        };
    }

    if (formValid) {
        const formData = {
            userFirstName: userFirstName.value,
            userLastName: userLastName.value,
            userEmail: userEmail.value,
            userPhone: userPhone.value,
            userMessage: userMessage.value
        }

        postForm(formData);
    }
}

export default initContactForm;