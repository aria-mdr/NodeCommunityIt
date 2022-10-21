const login = async (event) => {
    event.preventDefault()
    const formData = {
        email: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value
    }
    const response = await fetch('/login', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) 
    });
    console.log(response)
    if(response.status === 200) {
        window.location = '/dashboard'
    }
}

const signInButton = document.getElementById("signInButton");

signInButton.addEventListener('click', login)