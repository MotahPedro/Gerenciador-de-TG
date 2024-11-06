const apiUrl = "https://localhost:3080";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm") as HTMLFormElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const errorElement = document.getElementById("error") as HTMLParagraphElement;

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Login successful');
      } else {
        errorElement.textContent = 'Login failed';
      }
    } catch (error) {
      console.error('Error:', error);
      errorElement.textContent = 'An error occurred';
    }
  });
});