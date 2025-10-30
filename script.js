document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('auth-trigger') && !anchor.classList.contains('switch-form')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
    const authTriggers = document.querySelectorAll('.auth-trigger');
    const dropdownForms = document.querySelectorAll('.dropdown-form');
    const closeButtons = document.querySelectorAll('.close-form');
    const switchLinks = document.querySelectorAll('.switch-form');
    
    let activeForm = null;
    
    authTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const formId = this.getAttribute('data-form');
            const form = document.getElementById(`${formId}-form`);
            
            closeAllForms();
            
            if (form) {
                form.classList.add('active');
                activeForm = form;
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeAllForms();
        });
    });
    
    switchLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const fromForm = this.getAttribute('data-from');
            const toForm = this.getAttribute('data-to');
            
            closeAllForms();
            
            const newForm = document.getElementById(`${toForm}-form`);
            if (newForm) {
                newForm.classList.add('active');
                activeForm = newForm;
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (activeForm && !activeForm.contains(e.target) && !e.target.classList.contains('auth-trigger')) {
            closeAllForms();
        }
    });
    
    function closeAllForms() {
        dropdownForms.forEach(form => {
            form.classList.remove('active');
        });
        activeForm = null;
    }
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('login-message');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                showMessage(loginMessage, 'Будь ласка, заповніть всі обов\'язкові поля', 'error');
                return;
            }
            
            showMessage(loginMessage, 'Успішна авторизація! Перенаправлення...', 'success');
            
            setTimeout(() => {
                loginForm.reset();
                loginMessage.style.display = 'none';
                closeAllForms();
            }, 2000);
        });
    }
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('register-message');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const birthdate = document.getElementById('register-birthdate').value;
            const terms = document.getElementById('terms').checked;
            
            if (!name || !email || !password || !confirmPassword || !birthdate) {
                showMessage(registerMessage, 'Будь ласка, заповніть всі обов\'язкові поля', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage(registerMessage, 'Паролі не співпадають', 'error');
                return;
            }
            
            if (!terms) {
                showMessage(registerMessage, 'Ви повинні погодитися з умовами використання', 'error');
                return;
            }
            
            showMessage(registerMessage, 'Реєстрація успішна! Ласкаво просимо!', 'success');
            
            setTimeout(() => {
                registerForm.reset();
                registerMessage.style.display = 'none';
                closeAllForms();
            }, 3000);
        });
    }
    
    function showMessage(element, text, type) {
        if (element) {
            element.textContent = text;
            element.className = 'form-message ' + type;
            element.style.display = 'block';
        }
    }
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .hobby-card').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});