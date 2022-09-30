const url = 'http://192.99.46.183/~zanutta/php/contact_me.php';

const submitBtn = document.querySelector('#submitBtn');
const contactResponse = document.querySelector('#contactResponse');
const formInputs = document.querySelectorAll('.contactPopup__input');
const popupClose = document.querySelector('.contactPopup__close');

function initContactForm() {
    submitBtn.addEventListener('click', () => submitContactForm());
    formInputs.forEach(input => input.addEventListener('input', () => {
        input.classList.remove('input-error');
        contactResponse.textContent = "";
        contactResponse.classList.remove('active');
    }));
}


function postForm(data) {        
    $.post(url, data, function (data) {
        contactResponse.textContent = 'Thank you! We will be in touch shortly.'
        contactResponse.classList.add('active');

        setTimeout(() => {
            contactResponse.classList.remove('active');
            contactResponse.textContent = "";

            formInputs.forEach(input => input.value = '');
        }, 3000);
    }).fail(err => {
        contactResponse.textContent = 'Something went wrong...'
        contactResponse.classList.add('active');
        console.log(err);
    });
}

function submitContactForm() {
    let formValid = true;

    const userFirstName = document.querySelector(".contactPopup__input[name='firstName']");
    const userLastName = document.querySelector(".contactPopup__input[name='lastName']");
    const userEmail = document.querySelector(".contactPopup__input[name='email']");
    const userPhone = document.querySelector(".contactPopup__input[name='phone']");
    const userTypeOfProject = document.querySelector(".contactPopup__input[name='typeOfProject']");
    const userHasDesignLayouts = document.querySelector(".contactPopup__input[name='designLayouts']");
    const userFile = document.querySelector(".contactPopup__input[name='file']");
    const userMessage = document.querySelector(".contactPopup__input[name='message']");

    const requiredFields = [userFirstName, userLastName, userEmail];

    requiredFields.forEach(input => {
        if (input.value === "") {
            formValid = false;
            input.classList.add('input-error');
            contactResponse.textContent = "Please fill out all required fields";
            contactResponse.classList.add('active');
        }
    });

    if (formValid) {
        const formData = {
            userFirstName: userFirstName.value,
            userLastName: userLastName.value,
            userEmail: userEmail.value,
            userPhone: userPhone.value === "" ? "No phone number provided" : userPhone.value,
            userTypeOfProject: userTypeOfProject.value === "" ? "No project type given" : userTypeOfProject.value,
            userHasDesignLayouts: userHasDesignLayouts.value === "" ? "No design layouts or blueprints provided" : userHasDesignLayouts.value,
            userFile: userFile.value,
            userMessage: userMessage.value === "" ? "No message provided" : userMessage.value
        }

        postForm(formData);

        setTimeout(() => {
            popupClose.click();
        }, 2500);
    }
}

export default initContactForm;