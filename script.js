const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Showing error message in the input
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'; 
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Showing success message in the input
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'; 
}

//Checking valid E-mail (StackOverflow)
function checkemail(input) {
    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }else{
        showError(input, 'Email is not valid')
    }
}

//Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

//Check length
function checkLength(input,min,max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        }else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        }else{
            showSuccess(input);
        }
    }

//Check password
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Password do not match!');
    }
}

//Get FieldName (Change first letter to upper case)
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username,3,15); //username min 3 characters max 15
    checkLength(password,6,25) //password min 6 characters max 25
    checkemail(email);
    checkPasswordsMatch(password, password2);
});