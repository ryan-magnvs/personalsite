// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active');
    });
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Python Email Automation functionality
const fromEmailInput = document.getElementById('from-email');
const bccInput = document.getElementById('bcc');
const subjectInput = document.getElementById('subject');
const mailingListInput = document.getElementById('mailing-list');
const sendDateInput = document.getElementById('send-date');
const sendTimeInput = document.getElementById('send-time');
const modeSelect = document.getElementById('mode');
const pythonCodeInput = document.getElementById('python-code');

const statusArea = document.getElementById('status-area');
const jsonPreview = document.getElementById('json-preview');

const btnValidate = document.getElementById('btn-validate');
const btnTest = document.getElementById('btn-test');
const btnSchedule = document.getElementById('btn-schedule');

// Helper function to collect form values
function collectFormValues() {
    const fromEmail = fromEmailInput.value.trim();
    const bcc = bccInput.value.trim();
    const subjectTemplate = subjectInput.value.trim();
    const mailingListRaw = mailingListInput.value.trim();
    const sendDate = sendDateInput.value;
    const sendTime = sendTimeInput.value;
    const mode = modeSelect.value;
    const pythonCode = pythonCodeInput.value;
    
    // Convert mailing list to array
    const mailingList = mailingListRaw
        .split('\n')
        .map(email => email.trim())
        .filter(email => email.length > 0);
    
    // Create scheduledAt string
    const scheduledAt = sendDate && sendTime ? `${sendDate}T${sendTime}` : '';
    
    return {
        fromEmail,
        bcc,
        subjectTemplate,
        mailingList,
        sendDate,
        sendTime,
        scheduledAt,
        mode,
        pythonCode
    };
}

// Helper function to validate configuration
function validateConfig(data) {
    const errors = [];
    
    if (!data.fromEmail) {
        errors.push('From email is required');
    }
    
    if (!data.subjectTemplate) {
        errors.push('Subject template is required');
    }
    
    if (data.mailingList.length === 0) {
        errors.push('At least one recipient is required');
    }
    
    return errors;
}

// Helper function to show status message
function showStatus(message, type) {
    statusArea.textContent = message;
    statusArea.className = 'status-area active';
    
    if (type === 'success') {
        statusArea.classList.add('status--success');
    } else if (type === 'error') {
        statusArea.classList.add('status--error');
    }
}

// Helper function to show JSON preview
function showJsonPreview(data) {
    jsonPreview.textContent = JSON.stringify(data, null, 2);
    jsonPreview.classList.add('active');
}

// Validate button handler
btnValidate.addEventListener('click', () => {
    const data = collectFormValues();
    const errors = validateConfig(data);
    
    if (errors.length > 0) {
        showStatus(`Validation failed: ${errors.join(', ')}`, 'error');
        jsonPreview.classList.remove('active');
    } else {
        showStatus('Configuration looks good.', 'success');
        
        const payload = {
            fromEmail: data.fromEmail,
            bcc: data.bcc,
            subjectTemplate: data.subjectTemplate,
            mailingList: data.mailingList,
            sendDate: data.sendDate,
            sendTime: data.sendTime,
            scheduledAt: data.scheduledAt,
            mode: data.mode,
            pythonCode: data.pythonCode
        };
        
        showJsonPreview(payload);
        console.log('Validation payload:', payload);
    }
});

// Run test button handler
btnTest.addEventListener('click', () => {
    const data = collectFormValues();
    const errors = validateConfig(data);
    
    if (errors.length > 0) {
        showStatus(`Validation failed: ${errors.join(', ')}`, 'error');
        jsonPreview.classList.remove('active');
        return;
    }
    
    const payload = {
        fromEmail: data.fromEmail,
        bcc: data.bcc,
        subjectTemplate: data.subjectTemplate,
        mailingList: data.mailingList,
        sendDate: data.sendDate,
        sendTime: data.sendTime,
        scheduledAt: data.scheduledAt,
        mode: data.mode,
        pythonCode: data.pythonCode
    };
    
    showStatus('Starting test run (simulation)...', 'success');
    showJsonPreview(payload);
    console.log('Test run payload:', payload);
    
    // TODO: Replace simulation with real backend call, e.g.:
    // fetch('/api/python-email-automation', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload)
    // });
    
    setTimeout(() => {
        showStatus('Test run completed successfully (simulation only).', 'success');
    }, 1500);
});

// Schedule run button handler
btnSchedule.addEventListener('click', () => {
    const data = collectFormValues();
    const errors = validateConfig(data);
    
    if (errors.length > 0) {
        showStatus(`Validation failed: ${errors.join(', ')}`, 'error');
        jsonPreview.classList.remove('active');
        return;
    }
    
    const payload = {
        fromEmail: data.fromEmail,
        bcc: data.bcc,
        subjectTemplate: data.subjectTemplate,
        mailingList: data.mailingList,
        sendDate: data.sendDate,
        sendTime: data.sendTime,
        scheduledAt: data.scheduledAt,
        mode: data.mode,
        pythonCode: data.pythonCode
    };
    
    const scheduleTime = data.scheduledAt || 'specified time';
    showStatus(`Scheduling run for ${scheduleTime} (simulation)...`, 'success');
    showJsonPreview(payload);
    console.log('Schedule run payload:', payload);
    
    // TODO: Replace simulation with real backend call, e.g.:
    // fetch('/api/python-email-automation', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload)
    // });
    
    setTimeout(() => {
        showStatus('Run scheduled (simulation only).', 'success');
    }, 1500);
});