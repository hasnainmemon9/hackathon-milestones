// Handle the Edit and Done buttons for Education and Experience
var educationEditButton = document.getElementById("education-edit-button");
var educationDoneButton = document.getElementById("education-done-button");
var educationTextarea = document.getElementById("education-textarea");
var experienceEditButton = document.getElementById("experience-edit-button");
var experienceDoneButton = document.getElementById("experience-done-button");
var experienceTextarea = document.getElementById("experience-textarea");
var pdfButton = document.getElementById("pdf-button");
educationEditButton.addEventListener("click", function () {
    educationTextarea.style.display = "block";
    educationEditButton.style.display = "none";
    educationDoneButton.style.display = "inline-block";
});
educationDoneButton.addEventListener("click", function () {
    educationTextarea.style.display = "none";
    educationEditButton.style.display = "inline-block";
    educationDoneButton.style.display = "none";
});
experienceEditButton.addEventListener("click", function () {
    experienceTextarea.style.display = "block";
    experienceEditButton.style.display = "none";
    experienceDoneButton.style.display = "inline-block";
});
experienceDoneButton.addEventListener("click", function () {
    experienceTextarea.style.display = "none";
    experienceEditButton.style.display = "inline-block";
    experienceDoneButton.style.display = "none";
});
// Handle form submission
var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLink = document.getElementById("shareable-link");
form.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education-textarea").value;
    var experience = document.getElementById("experience-textarea").value;
    var skills = document.getElementById("skills")
        .value;
    var username = document.getElementById("username")
        .value; // Get username
    var pictureInput = document.getElementById("picture");
    var pictureFile = (_a = pictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    function displayResume(pictureHTML) {
        var resumeHTML = "".concat(pictureHTML, "\n              <h3 id=\"resumeh3\">Personal Information</h3>\n              <p id=\"resumep\"><b>Name:</b> ").concat(name, "</p>\n              <p id=\"resumep\"><b>Email:</b> ").concat(email, "</p>\n              <p id=\"resumep\"><b>Phone:</b> ").concat(phone, "</p>\n  \n              <h3 id=\"resumeh3\">Education</h3>\n              <p>").concat(education, "</p>\n  \n              <h3 id=\"resumeh3\">Experience</h3>\n              <p>").concat(experience, "</p>\n  \n              <h3 id=\"resumeh3\">Skills</h3>\n              <p>").concat(skills, "</p>");
        if (resumeDisplayElement) {
            resumeDisplayElement.innerHTML = resumeHTML;
            resumeDisplayElement.style.display = "block";
        }
        else {
            console.error("The Resume Display Element Is Missing");
        }
        // Generate and display shareable link
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        if (shareableLink) {
            shareableLink.href = shareableURL;
            shareableLink.textContent = shareableURL;
            shareableLinkContainer.style.display = "block";
            pdfButton.style.display = "block";
            experienceEditButton.style.display = "block";
            educationEditButton.style.display = "block";
            educationTextarea.style.display = "none";
            experienceTextarea.style.display = "none";
        }
        // Save resume data in localStorage
        localStorage.setItem(username, JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            education: education,
            experience: experience,
            skills: skills,
            pictureHTML: pictureHTML,
        }));
    }
    if (pictureFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var pictureHTML = "<img src=\"".concat((_a = e.target) === null || _a === void 0 ? void 0 : _a.result, "\" alt=\"Profile Picture\" style=\"max-width: 200px; max-height: 200px; display: block; margin: 0 auto;\">");
            displayResume(pictureHTML);
        };
        reader.readAsDataURL(pictureFile);
    }
    else {
        displayResume("");
    }
});
// Handle PDF generation
pdfButton.addEventListener("click", function () {
    var resumeContent = document.getElementById("resume-display");
    if (resumeContent) {
        // Use html2pdf library to generate and download the PDF
        var opt = {
            margin: 0.5,
            filename: "resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().from(resumeContent).set(opt).save();
    }
    else {
        console.error("Resume content is missing");
    }
});
// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("username").value =
                username;
            document.getElementById("name").value =
                resumeData.name;
            document.getElementById("email").value =
                resumeData.email;
            document.getElementById("phone").value =
                resumeData.phone;
            document.getElementById("education-textarea").value = resumeData.education;
            document.getElementById("experience-textarea").value = resumeData.experience;
            document.getElementById("skills").value =
                resumeData.skills;
            if (resumeData.pictureHTML) {
                resumeDisplayElement.innerHTML =
                    resumeData.pictureHTML +
                        "\n            <h3>Personal Information</h3>\n            <p><b>Name:</b> ".concat(resumeData.name, "</p>\n            <p><b>Email:</b> ").concat(resumeData.email, "</p>\n            <p><b>Phone:</b> ").concat(resumeData.phone, "</p>\n            <h3>Education</h3>\n            <p>").concat(resumeData.education, "</p>\n            <h3>Experience</h3>\n            <p>").concat(resumeData.experience, "</p>\n            <h3>Skills</h3>\n            <p>").concat(resumeData.skills, "</p>");
            }
        }
    }
});
