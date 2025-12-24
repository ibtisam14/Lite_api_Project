async function callApi() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const responseElement = document.getElementById('response');
    const callApiBtn = document.getElementById('callApiBtn');
    const loadingElement = document.getElementById('loading');
    
    // Validate inputs
    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }
    
    // Show loading state
    callApiBtn.disabled = true;
    callApiBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    loadingElement.style.display = 'block';
    
    // Clear previous response
    responseElement.textContent = '';
    responseElement.className = '';
    
    try {
        const response = await fetch('/protected/', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(username + ':' + password),
                'Content-Type': 'application/json'
            }
        });
        
        // Hide loading
        loadingElement.style.display = 'none';
        
        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Format and display success response
        const formattedResponse = JSON.stringify(data, null, 2);
        responseElement.textContent = formattedResponse;
        responseElement.classList.add('success');
        
        // Show success status
        showStatus('success', 'Authentication successful!');
        
    } catch (error) {
        // Hide loading
        loadingElement.style.display = 'none';
        
        // Display error
        const errorMessage = error.message || 'Failed to connect to API';
        responseElement.textContent = `Error: ${errorMessage}\n\nTimestamp: ${new Date().toISOString()}\nEndpoint: /protected/\nMethod: GET`;
        responseElement.classList.add('error');
        
        // Show error status
        showStatus('error', `Authentication failed: ${errorMessage}`);
        
    } finally {
        // Reset button
        callApiBtn.disabled = false;
        callApiBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Test API Connection';
    }
}

function showError(message) {
    const responseElement = document.getElementById('response');
    responseElement.textContent = `Error: ${message}\n\nPlease check your credentials and try again.`;
    responseElement.classList.add('error');
    showStatus('error', message);
}

function showStatus(type, message) {
    const responseHeader = document.querySelector('.response-header h2');
    
    // Remove existing status indicator
    const existingStatus = responseHeader.querySelector('.status-indicator');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Create new status indicator
    const statusElement = document.createElement('span');
    statusElement.className = `status-indicator status-${type}`;
    statusElement.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    
    responseHeader.appendChild(statusElement);
    
    // Auto-remove status after 5 seconds
    setTimeout(() => {
        if (statusElement.parentNode === responseHeader) {
            statusElement.remove();
        }
    }, 5000);
}

function copyResponse() {
    const responseElement = document.getElementById('response');
    const text = responseElement.textContent;
    
    if (!text || text === 'Enter credentials and click "Test API Connection" to see the response here.') {
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalHTML = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.color = '#10b981';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.color = '';
        }, 2000);
    });
}

// Add Enter key support for the form
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                callApi();
            }
        });
    });
    
    // Auto-focus on username field
    document.getElementById('username').focus();
});