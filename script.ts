declare var html2pdf: any;

const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeOutput = document.getElementById("resume-output") as HTMLDivElement;
const shareableLinkInput = document.getElementById("shareable-link") as HTMLInputElement;
const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
const profilePicPreview = document.querySelector('.profile-picture img') as HTMLImageElement;
const copyLinkBtn = document.getElementById("copy-link-btn") as HTMLButtonElement;
const downloadBtn = document.getElementById("download-btn") as HTMLButtonElement;


if (profilePicInput) {
    profilePicInput.addEventListener('change', function() {
        const file = profilePicInput.files?.[0];  

        if (file) {
            const reader = new FileReader();  
            
            reader.onload = function(e) {
                if (profilePicPreview) {
                    profilePicPreview.src = e.target?.result as string;
                }
            };

            reader.readAsDataURL(file);  
        }
    });
}


if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form submitted");

        if (!profilePicPreview) {
            console.error("Profile picture preview element not found.");
            return;
        }

        const name = (document.getElementById("name") as HTMLInputElement)?.value || '';
        const email = (document.getElementById("email") as HTMLInputElement)?.value || '';
        const education = (document.getElementById("education") as HTMLTextAreaElement)?.value || '';
        const skills = (document.getElementById("skills") as HTMLTextAreaElement)?.value || '';
        const experience = (document.getElementById("experience") as HTMLTextAreaElement)?.value || '';

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Profile Pic Source:", profilePicPreview.src);

       
        const resumeHTML = `
            <div class="profile-picture">
                <img src="${profilePicPreview.src}" alt="Profile Picture">
            </div>
            <h3>${name}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Education:</strong></p>
            <p>${education}</p>
            <p id="skills-section"><strong>Skills:</strong></p>
            <ul id="skills-list">${skills.split(",").map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
            <p><strong>Experience:</strong></p>
            <p>${experience}</p>
        `;
        
        if (resumeOutput) {
            resumeOutput.innerHTML = resumeHTML;
        }

        
        const user_url = name.toLowerCase().replace(/\s+/g, '-');

        
        const uniqueURL = `https://your-app.vercel.app/resume/${user_url}`;
        if (shareableLinkInput) {
            shareableLinkInput.value = uniqueURL;
        }
    });
}


if (copyLinkBtn && shareableLinkInput) {
    copyLinkBtn.addEventListener("click", () => {
        const urlToCopy = shareableLinkInput.value;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(urlToCopy).then(() => {
                alert("Link copied to clipboard!");
            }).catch(err => {
                console.error("Could not copy text: ", err);
            });
        } else {
            console.error("Clipboard API is not supported");
        }
    });
}


function downloadResumeAsPDF() {
    const elementToConvert = document.getElementById("resume-output");

    if (!elementToConvert) {
        console.error("No resume output element found to convert to PDF.");
        return;
    }

    
    const opt = {
        margin:       0.5,
        filename:     'resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    
    html2pdf().from(elementToConvert).set(opt).save();
}


if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadResumeAsPDF);
}
