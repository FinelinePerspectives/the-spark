const url = 'https://www.thesparkapartments.ca/php/contact_me.php';

const submitBtnContact = document.querySelector('#submitBtnContact');
const submitBtnPopup = document.querySelector('#submitBtnPopup');
const formInputs = document.querySelectorAll('.form-input');

function initContactForm() {
    submitBtnContact.addEventListener('click', (e) => {
        e.preventDefault();
        submitContactForm('Contact');
    });

    submitBtnPopup.addEventListener('click', (e) => {
        e.preventDefault();
        submitContactForm('Popup');
    });

    formInputs.forEach(input => input.addEventListener('input', () => {
        input.classList.remove('input-error');
        const formResponseContact = document.querySelector(`.formResponseContact`);
        const formResponsePopup = document.querySelector(`.formResponsePopup`);

        formResponseContact.classList.remove('active');
        formResponseContact.textContent = "";

        formResponsePopup.classList.remove('active');
        formResponsePopup.textContent = "";
    }));
}


function postForm(data, formResponse) {        
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
    });
}

function submitContactForm(id) {
    let formValid = true;
    const formResponse = document.querySelector(`.formResponse${id}`);

    const userFirstName = document.querySelector(`.form-input[name='firstName${id}']`);
    const userLastName = document.querySelector(`.form-input[name='lastName${id}']`);
    const userEmail = document.querySelector(`.form-input[name='email${id}']`);
    const userPhone = document.querySelector(`.form-input[name='phoneNumber${id}']`);
    const userConsent = document.querySelector(`.consent${id}`).checked;

    const requiredFields = [userFirstName, userLastName, userEmail, userPhone];

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
        }

        postForm(formData, formResponse);

        if (id === 'Popup') {
            const closePopup = document.querySelector('.registerPopup__close');

            setTimeout(() => {
                closePopup.click();
            }, 2500)
        }
    }
}

export default initContactForm;