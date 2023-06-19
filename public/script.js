document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Perform custom validation logic
    const nameInput = document.getElementById("nameInput").value;
    const emailInput = document.getElementById("emailInput").value;
    const contact = document.getElementById("contactInput").value;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const whatsapp = document.getElementById("whatsapp");

    const nameError = "Name is required!";
    const emailError = "Please enter a valid Email!";
    const whatsappError = "WhatsApp Number is required!";

    name.innerText = "";
    email.innerText = "";
    whatsapp.innerText = "";

    if (nameInput.trim() === "") {
      name.innerText = nameError;
      return;
    }

    if (nameInput.length < 3) {
      name.innerText = "Name is too short!";
      return;
    }

    if (emailInput.trim() === "") {
      email.innerText = "Please enter your email!";
      return;
    }

    // if (!validateEmail(emailInput)) {
    //   email.innerText = emailError;
    //   return;
    // }

    if (contact.trim() === "") {
      whatsapp.innerText = whatsappError;
      return;
    }
    if (contact.length < 10 && contact.length > 10) {
      whatsapp.innerText = "Number should be of 10 digits!";
    }

    if (!validateContactNumber(contact)) {
      whatsapp.innerText = "Please enter 10 digits Number";
      return;
    }

    // Form is valid, proceed with form submission
    this.submit();
  });

// function validateEmail(email) {
//   // Regular expression for email validation
//   var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
//   return emailRegex.test(email);
// }

function validateContactNumber(contact) {
  // Regular expression for contact number validation
  var contactRegex = /^\d{10}$/; // Assumes 10-digit phone number
  return contactRegex.test(contact);
}
