const submitForm = (event) => {
    event.preventDefault();
    const roverName = document.getElementById("rover").value;
    console.log("/photos/" + encodeURIComponent(roverName));
    window.location.href = "/photos/" + encodeURIComponent(roverName);
};

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("roverPhotosForm");
    form.addEventListener("submit", submitForm);
});
