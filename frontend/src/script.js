// In script.js

document.getElementById('contactForm').addEventListener('submit', async function(event) {
    // Prevent the page from reloading when the form is submitted
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const status = document.getElementById('form-status');

    try {
        // Send the form data to your server's '/submit-form' endpoint
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            status.textContent = '✅ Message sent successfully!';
            status.style.color = 'green';
            form.reset(); // Clear the form fields
        } else {
            status.textContent = '❌ Something went wrong. Please try again.';
            status.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        status.textContent = '❌ An error occurred.';
        status.style.color = 'red';
    }
});