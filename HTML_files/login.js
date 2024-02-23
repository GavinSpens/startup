document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.querySelector('.email-input');
    const passwordInput = document.querySelector('.password-input');
    const submitBtn = document.querySelector('.btn.btn-primary');

    submitBtn.addEventListener('click', () => {
        const emailValidation = new RegExp(".*@.*\..*")
        if (emailValidation.test(emailInput.value)) {
            
        }
    });
});