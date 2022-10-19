


const handelSignup = async () => {
    // read all the form information
    const formValue = {
        name: document.getElementById('nameId').value,
        email: document.getElementById('emailId').value,
        pass1: document.getElementById('passId').value,
        pass2: document.getElementById('passIdRepeat').value,
        course: document.getElementById('courseId').value,
        terms: document.getElementById('termsId').checked,
    }

    // validate user input
    const formDataValidated = validateSignup(formValue)

    if(formDataValidated) {
        // make a request call to our server to save user information
        const response = await fetch('/signup', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValue) 
        });
        console.log(response)
        if(response.status !== 200) {
            const responseBody = await response.json()
            console.log(responseBody)
            showError(responseBody.error)
        } 
    }
}

const validateSignup = (formValue) => {
    // confirm nothings empty
    if( (!formValue.email || formValue.email === "") ) {
        showError('Please provide an email')
        return false;
    }

    if( (!formValue.pass1 || formValue.pass1 === "")) {
        showError('Please provide a password')
        return false;
    }

    if(!formValue.pass2 || formValue.pass2 === "") {
        showError('Please confirm your password')
        return false;
    }

    if( (!formValue.name || formValue.name === "") ) {
        showError('Please tell us your name')
        return false;
    }

    // confirm email
    if(!formValue.email.includes('@')){
        showError('Please provide a valid email')
        return false;
    }

    // confirm passwords match
    if(formValue.pass1 !== formValue.pass2) {
        showError('Please make sure your passwords match')
        return false;
    }

    // confirm terms are met 
    if(!formValue.terms) {
        showError('Please agree to terms and conditions')
        return false;
    }
        return true;

}


const showError = (errorMessage) => {
    const body = document.getElementsByTagName('body')[0]
    console.log( body)
    const randomNumber = Math.random()
    const id = `toast-${randomNumber}`
    body.insertAdjacentHTML('beforeend', `    
    <div id="${id}" class="toast errorToast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                ${errorMessage}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                aria-label="Close" onClick="closeError('${id}')"></button>
        </div>
    </div>`)
}

const closeError = (id) => {
    const toast = document.getElementById(id)
    console.log(toast)
    toast.style.display = 'none'
}

const signupButton = document.getElementById("signupBtn")
signupButton.addEventListener('click', handelSignup)