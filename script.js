
const form = document.getElementById("employeeForm");
const message = document.getElementById("message");
const dateInput = document.getElementById("date");

// Set today's date as the maximum joining date
const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.max = localToday;

form.addEventListener("submit", function(event) {
    event.preventDefault();

    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });

    message.textContent = "";
    message.className = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;
    const phone = document.getElementById("phone").value.trim();
    const department = document.getElementById("department").value;
    const date = dateInput.value;

    let valid = true;

    function showError(id, text) {
        document.getElementById(id).textContent = text;
        valid = false;
    }

    // Name validation
    if (!/^[A-Za-z ]{3,50}$/.test(name)) {
        showError("nameError",
            "Enter a valid name (3–50 letters).");
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("emailError",
            "Enter a valid email address.");
    }

    // Password validation
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/.test(password)) {
        showError("passwordError",
            "Use 8+ characters, a letter, a number and a symbol.");
    }

    // Confirm password validation
    if (confirmPassword === "" || password !== confirmPassword) {
        showError("confirmError", "Passwords do not match.");
    }

    // Indian mobile number validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
        showError("phoneError",
            "Enter a valid 10-digit Indian mobile number.");
    }

    // Department validation
    if (department === "") {
        showError("departmentError",
            "Please select a department.");
    }

    // Joining date validation
    if (!date || date > localToday) {
        showError("dateError",
            "Select today or a past joining date.");
    }

    if (valid) {
        message.textContent =
            "✓ Employee registration validated successfully!";
        message.className = "success";

        console.log("Employee Details:", {
            name: name,
            email: email,
            phone: phone,
            department: department,
            joiningDate: date,
            notes: document.getElementById("notes").value.trim()
        });
    } else {
        message.textContent = "Please correct the errors above.";
        message.className = "failure";
    }
});

// Clear error messages when resetting
form.addEventListener("reset", function() {
    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });

    message.textContent = "";
    message.className = "";
});
