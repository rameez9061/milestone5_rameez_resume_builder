var form = document.getElementById("resume-form");
var resumeOutput = document.getElementById("resume-output");
var shareableLinkInput = document.getElementById("shareable-link");
var profilePicInput = document.getElementById('profile-pic');
var profilePicPreview = document.querySelector('.profile-picture img');
var copyLinkBtn = document.getElementById("copy-link-btn");
var downloadBtn = document.getElementById("download-btn");
// Ensure profilePicPreview exists before setting its src
if (profilePicInput) {
    profilePicInput.addEventListener('change', function () {
        var _a;
        var file = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                if (profilePicPreview) {
                    profilePicPreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                }
            };
            reader.readAsDataURL(file);
        }
    });
}
// Handle resume form submission
if (form) {
    form.addEventListener("submit", function (event) {
        var _a, _b, _c, _d, _e;
        event.preventDefault();
        console.log("Form submitted");
        if (!profilePicPreview) {
            console.error("Profile picture preview element not found.");
            return;
        }
        var name = ((_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.value) || '';
        var email = ((_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value) || '';
        var education = ((_c = document.getElementById("education")) === null || _c === void 0 ? void 0 : _c.value) || '';
        var skills = ((_d = document.getElementById("skills")) === null || _d === void 0 ? void 0 : _d.value) || '';
        var experience = ((_e = document.getElementById("experience")) === null || _e === void 0 ? void 0 : _e.value) || '';
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Profile Pic Source:", profilePicPreview.src);
        // Generate resume HTML
        var resumeHTML = "\n            <div class=\"profile-picture\">\n                <img src=\"".concat(profilePicPreview.src, "\" alt=\"Profile Picture\">\n            </div>\n            <h3>").concat(name, "</h3>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Education:</strong></p>\n            <p>").concat(education, "</p>\n            <p id=\"skills-section\"><strong>Skills:</strong></p>\n            <ul id=\"skills-list\">").concat(skills.split(",").map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "</ul>\n            <p><strong>Experience:</strong></p>\n            <p>").concat(experience, "</p>\n        ");
        if (resumeOutput) {
            resumeOutput.innerHTML = resumeHTML;
        }
        // Create a URL-friendly slug from the name
        var slug = name.toLowerCase().replace(/\s+/g, '-');
        // Generate a unique URL for the resume
        var uniqueURL = "https://your-app.vercel.app/resume/".concat(slug);
        if (shareableLinkInput) {
            shareableLinkInput.value = uniqueURL;
        }
    });
}
// Handle "Copy Link" button click using Clipboard API
if (copyLinkBtn && shareableLinkInput) {
    copyLinkBtn.addEventListener("click", function () {
        var urlToCopy = shareableLinkInput.value;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(urlToCopy).then(function () {
                alert("Link copied to clipboard!");
            }).catch(function (err) {
                console.error("Could not copy text: ", err);
            });
        }
        else {
            console.error("Clipboard API is not supported");
        }
    });
}
// Function to download the resume as a PDF
function downloadResumeAsPDF() {
    var elementToConvert = document.getElementById("resume-output");
    if (!elementToConvert) {
        console.error("No resume output element found to convert to PDF.");
        return;
    }
    // Define options for the PDF
    var opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Generate PDF and save it
    html2pdf().from(elementToConvert).set(opt).save();
}
// Attach the download function to the button click event
if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadResumeAsPDF);
}
