function returnForm(id) {
    return `
        <form class="form" id="${id}">
            <div class="form__col--50">
                <input class="form-input" type="text" name="firstName" placeholder="First Name">
            </div>
            <div class="form__col--50">
                <input class="form-input" type="text" name="lastName" placeholder="Last Name">
            </div>
            <div class="form__col--50">
                <input class="form-input" type="email" name="email" placeholder="Email">
            </div>
            <div class="form__col--50">
                <input class="form-input" type="text" name="phoneNumber" placeholder="Phone Number">
            </div>
            <div class="form__col--100">
                <textarea class="form-input" name="message" cols="30" rows="3" placeholder="Message"></textarea>
            </div>

            <br/>

            <div class="form__col--100 form__consent">
                <div class="form__consent--input">
                    <input class="consent" type="checkbox" name="consent" required>
                </div>
            <div class="form__consent--copy">
                <p>Your privacy is a human right. We are committed to keeping your personal information safe and secure. We promise we will never share it with anyone without your permission. We will only use it to communicate with you and to ensure we are providing you with valuable information about our products.
                </p>
            </div>
            </div>

            <div class="form__col--100">
                <p class="bold form__response"></p>
            </div>

            <button class="btn btn-arrow" id="${id}Submit">
                Submit
                <svg xmlns="http://www.w3.org/2000/svg" width="18.055" height="7.386" viewBox="0 0 18.055 7.386">
                    <path id="Shape_1" data-name="Shape 1" d="M145.243,288.491l-.007,0h13.916l-.082,2.346a.239.239,0,0,0,0,.336l.142.142a.236.236,0,0,0,.334,0l3.441-3.455a.238.238,0,0,0,.069-.168.232.232,0,0,0-.069-.167l-3.441-3.458a.24.24,0,0,0-.334,0l-.142.143a.234.234,0,0,0-.069.167.227.227,0,0,0,.069.164l.093,2.351H145.24a.245.245,0,0,0-.24.243v1.125A.24.24,0,0,0,145.243,288.491Z" transform="translate(-145 -283.997)" fill="#fff"/>
                </svg>
            </button>
        </form>
    `
}

function renderContactForms() {
    const contactForm = document.querySelector('#contactForm');
    contactForm.innerHTML = returnForm('contact');

}

export default renderContactForms;