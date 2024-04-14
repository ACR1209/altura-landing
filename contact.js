function createContactMailto(form){
    const locale = localStorage.getItem("locale");
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    const fillErrorMessage = getErrorMessage("fill", locale);

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("name_error");
    const emailError = document.getElementById("email_error");
    const messageError = document.getElementById("message_error");
    let error = false;

    if (!name) {
        nameError.innerHTML = fillErrorMessage;
        nameInput.classList.add("border-2","border-red-500");
        nameError.classList.remove("hidden");
        error = true;
    }

    if (!email) {
        emailError.innerHTML = fillErrorMessage;
        emailInput.classList.add("border-2","border-red-500");
        emailError.classList.remove("hidden");
        error = true;
    }

    if (!message) {
        messageError.innerHTML = fillErrorMessage;
        messageInput.classList.add("border-2","border-red-500");
        messageError.classList.remove("hidden");
        error = true;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
        emailError.innerHTML = getErrorMessage("email", locale);
        emailInput.classList.add("border-2","border-red-500");
        emailError.classList.remove("hidden");
        error = true;
    }

    const nameRegex = /^[a-zA-ZàáäâèéëêìíïîòóöôùúüûñÇçÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛÑç\s]+$/;
    if (!nameRegex.test(name)) {
        nameError.innerHTML = getErrorMessage("name", locale);
        nameInput.classList.add("border-2","border-red-500");
        nameError.classList.remove("hidden");
        error = true;
    }

    if (error) {
        return;
    }

    const mailto = `mailto:david@alturasoluciones.com?subject=Contact%20with%20Altura:%20${name}&body=Email: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

    const link = document.createElement('a');
    link.setAttribute('href', mailto);
    link.setAttribute('target', '_blank');
    link.click();
}

const ERROR_MESSAGES = {
    fill: {
        es: "Por favor rellene este campo.",
        en: "Please fill this field."
    },
    email: {
        es: "Por favor ingresa una dirección de correo electrónico válida.",
        en: "Please enter a valid email address."
    },
    name: {
        es: "Por favor ingresa un nombre válido.",
        en: "Please enter a valid name."
    }
};

function getErrorMessage(type, locale) {
    return ERROR_MESSAGES[type][locale] || ERROR_MESSAGES[type]["en"];
}

function init() {
    const form = document.getElementById("contact_form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        createContactMailto(form);
    });
}

document.addEventListener("DOMContentLoaded", init);