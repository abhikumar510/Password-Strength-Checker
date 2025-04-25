document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    // Show home section by default
    document.querySelector('#home').classList.add('active');
    
    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).classList.add('active');
            
            // Close mobile menu if open
            nav.classList.remove('open');
            burger.classList.remove('toggle');
            
            // Scroll to top of section
            window.scrollTo({
                top: document.querySelector(targetId).offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Mobile menu toggle
    burger.addEventListener('click', function() {
        nav.classList.toggle('open');
        this.classList.toggle('toggle');
    });
    
    // Password Strength Checker
    const passwordInput = document.getElementById('password-input');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthResult = document.getElementById('strength-result');
    const passwordFeedback = document.getElementById('password-feedback');
    const toggleVisibility = document.getElementById('toggle-visibility');
    
    passwordInput.addEventListener('input', checkPasswordStrength);
    toggleVisibility.addEventListener('click', togglePasswordVisibility);
    
    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        let feedback = [];
        
        // Reset
        strengthBar.className = 'strength-bar';
        strengthBar.style.width = '0%';
        
        if (password.length === 0) {
            strengthResult.textContent = 'None';
            passwordFeedback.textContent = '';
            return;
        }
        
        // Length check
        if (password.length < 8) {
            feedback.push('Password should be at least 8 characters long');
        } else {
            strength += 1;
            if (password.length >= 12) strength += 1;
        }
        
        // Lowercase check
        if (/[a-z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('Add lowercase letters');
        }
        
        // Uppercase check
        if (/[A-Z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('Add uppercase letters');
        }
        
        // Number check
        if (/[0-9]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('Add numbers');
        }
        
        // Symbol check
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('Add special characters (e.g., !@#$%^&*)');
        }
        
        // Update strength bar and text
        strengthBar.classList.add(`strength-${Math.min(strength, 4)}`);
        
        const strengthTexts = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
        strengthResult.textContent = strengthTexts[Math.min(strength, 4)];
        
        // Update feedback
        if (feedback.length > 0) {
            passwordFeedback.innerHTML = '<strong>Suggestions:</strong><ul>' + 
                feedback.map(item => `<li>${item}</li>`).join('') + '</ul>';
        } else {
            passwordFeedback.textContent = 'Great password!';
            passwordFeedback.style.color = 'var(--success-color)';
        }
    }
    
    function togglePasswordVisibility() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleVisibility.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            toggleVisibility.innerHTML = '<i class="fas fa-eye"></i>';
        }
    }
    
    // Password Generator
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');
    const generateBtn = document.getElementById('generate-btn');
    const generatedPassword = document.getElementById('generated-password');
    const copyBtn = document.getElementById('copy-btn');
    
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });
    
    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyPassword);
    
    function generatePassword() {
        const length = lengthSlider.value;
        const hasUpper = uppercaseCheck.checked;
        const hasLower = lowercaseCheck.checked;
        const hasNumber = numbersCheck.checked;
        const hasSymbol = symbolsCheck.checked;
        
        if (!hasUpper && !hasLower && !hasNumber && !hasSymbol) {
            alert('Please select at least one character type');
            return;
        }
        
        let charset = '';
        if (hasUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (hasLower) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (hasNumber) charset += '0123456789';
        if (hasSymbol) charset += '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
        
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        
        generatedPassword.value = password;
        
        // Automatically check the strength of the generated password
        passwordInput.value = password;
        checkPasswordStrength();
    }
    
    function copyPassword() {
        if (!generatedPassword.value) {
            alert('Generate a password first');
            return;
        }
        
        generatedPassword.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }
    
    // Generate a password on page load for the Generate section
    generatePassword();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('open');
            burger.classList.remove('toggle');
        }
    });
});