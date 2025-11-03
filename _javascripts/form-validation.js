document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const formMessage = document.getElementById('formMessage');

    // Error messages elements
    const errorElements = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        phone: document.getElementById('phoneError'),
        type: document.getElementById('typeError'),
        subject: document.getElementById('subjectError'),
        message: document.getElementById('messageError')
    };

    // Validation functions
    function validateName(name) {
        const nameRegex = /^[A-Za-z\s]{2,50}$/;
        return nameRegex.test(name.trim());
    }

    function validateEmail(email) {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        return emailRegex.test(email.trim());
    }

    function validatePhone(phone) {
        const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
        const cleanPhone = phone.replace(/[^\d]/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 15;
    }

    function validateSubject(subject) {
        return subject.trim().length >= 5 && subject.trim().length <= 100;
    }

    function validateMessage(message) {
        return message.trim().length >= 10 && message.trim().length <= 1000;
    }

    // Display error message
    function showError(field, message) {
        errorElements[field].textContent = message;
        errorElements[field].style.display = 'block';
    }

    // Clear error message
    function clearError(field) {
        errorElements[field].textContent = '';
        errorElements[field].style.display = 'none';
    }

    document.getElementById('contactName').addEventListener('blur', function () {
        if (!validateName(this.value)) {
            showError('name', 'Please enter a valid name (2-50 letters and spaces only)');
        } else {
            clearError('name');
        }
    });

    document.getElementById('contactEmail').addEventListener('blur', function () {
        if (!validateEmail(this.value)) {
            showError('email', 'Please enter a valid email address');
        } else {
            clearError('email');
        }
    });

    document.getElementById('contactPhone').addEventListener('blur', function () {
        if (!validatePhone(this.value)) {
            showError('phone', 'Please enter a valid phone number (10-15 digits)');
        } else {
            clearError('phone');
        }
    });

    document.getElementById('contactSubject').addEventListener('blur', function () {
        if (!validateSubject(this.value)) {
            showError('subject', 'Subject must be between 5-100 characters');
        } else {
            clearError('subject');
        }
    });

    document.getElementById('contactMessage').addEventListener('blur', function () {
        if (!validateMessage(this.value)) {
            showError('message', 'Message must be between 10-1000 characters');
        } else {
            clearError('message');
        }
    });

    document.getElementById('messageType').addEventListener('change', function () {
        if (this.value === '') {
            showError('type', 'Please select a message type');
        } else {
            clearError('type');
        }
    });

    // Form submission handler
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            type: document.getElementById('messageType').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value
        };

        // Validate all fields
        let isValid = true;

        if (!validateName(formData.name)) {
            showError('name', 'Please enter a valid name');
            isValid = false;
        }

        if (!validateEmail(formData.email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!validatePhone(formData.phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        if (!formData.type) {
            showError('type', 'Please select a message type');
            isValid = false;
        }

        if (!validateSubject(formData.subject)) {
            showError('subject', 'Subject must be between 5-100 characters');
            isValid = false;
        }

        if (!validateMessage(formData.message)) {
            showError('message', 'Message must be between 10-1000 characters');
            isValid = false;
        }

        if (isValid) {
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formMessage.textContent = 'Sending your message...';
            formMessage.className = 'form-message info';

            
            setTimeout(() => {

                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                formMessage.className = 'form-message success';
                contactForm.reset();

                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                    formMessage.textContent = '';
                }, 3000);
            }, 2000);
        }
    });

    // Input event listeners for real-time validation clearing
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const fieldName = this.name.replace('contact', '').toLowerCase();
            if (fieldName in errorElements) {
                clearError(fieldName);
            }
        });
    });
});