
// Clears the textarea and sends an alert for the subscribe button, to improve the realism of the site

document.getElementById('clearButton').addEventListener('click', function() {
  const emailInput = document.getElementById('subscribe-email');
  const email = emailInput.value.trim(); // Remove leading and trailing whitespaces

  if (email) {
      emailInput.value = '';
      alert("You have subscribed to our newsletter. Check your email.");
  }
});