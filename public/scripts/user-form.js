const showMessage = (isSuccessfulResponse) => {
    if (isSuccessfulResponse) {
        document.getElementById("errorMessage").style.display = "none";
        document.getElementById("successMessage").style.display = "block";
    } else {
        document.getElementById("successMessage").style.display = "none";
        document.getElementById("errorMessage").textContent = "Failed to submit form";
        document.getElementById("errorMessage").style.display = "block";
    }
};
const submitForm = (event) => {
    event.preventDefault();
    const formData = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value
    };
    fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            showMessage(response.ok);
        })
        .catch(error => {
            showMessage(false);
        });
};

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("userDataForm");
    form.addEventListener("submit", submitForm);
});
