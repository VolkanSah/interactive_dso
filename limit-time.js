// limit-time.js

// Replace 'unload' with 'beforeunload'
window.addEventListener('beforeunload', function(event) {
    // Your code here
    // Optionally, to show a confirmation dialog:
    event.returnValue = 'Are you sure you want to leave?';
});

// Other JavaScript code for limit-time.js
