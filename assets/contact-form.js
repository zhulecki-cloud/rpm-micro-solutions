// Contact Form Handler for RPM Micro Solutions
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Create email body
        const emailBody = `
New Project Inquiry from RPM Website

Contact Information:
- Name: ${data.firstName} ${data.lastName}
- Company: ${data.company}
- Title: ${data.title || 'Not provided'}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}

Project Details:
- Type: ${data.projectType || 'Not specified'}
- Timeline: ${data.timeline || 'Not specified'}
- Details: ${data.projectDetails}

Submitted: ${new Date().toLocaleString()}
        `.trim();
        
        // Create mailto link (fallback method)
        const subject = encodeURIComponent('New Project Inquiry from RPM Website');
        const body = encodeURIComponent(emailBody);
        const mailtoLink = `mailto:info@rpmmicrosolutions.com?subject=${subject}&body=${body}`;
        
        // Update button state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Try to open mail client
        window.location.href = mailtoLink;
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.textContent = 'Email Sent - Check Your Email Client';
            submitBtn.style.backgroundColor = '#28a745';
            
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.innerHTML = `
                <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin-top: 15px;">
                    <strong>Form submitted successfully!</strong><br>
                    Your default email client should open with the message. If not, please email us directly at: 
                    <a href="mailto:info@rpmmicrosolutions.com">info@rpmmicrosolutions.com</a>
                </div>
            `;
            form.appendChild(successDiv.firstElementChild);
            
            // Reset form
            form.reset();
            
        }, 1000);
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 5000);
    });
});