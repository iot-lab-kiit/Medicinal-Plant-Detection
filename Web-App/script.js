async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = document.getElementById('preview');
            imgElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

/*async function openCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.getElementById('video');
    video.srcObject = stream;
    video.play();

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    document.body.appendChild(video);
    
    // Allow the user to take a photo
    video.addEventListener('click', async () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imgDataUrl = canvas.toDataURL('image/png');
        document.getElementById('preview').src = imgDataUrl;

        // Stop video stream
        stream.getTracks().forEach(track => track.stop());
        video.remove();
    });
}*/

async function predictPlant() {
    const imageInput = document.getElementById('imageInput');
    const previewImg = document.getElementById('preview').src;

    let file;
    if (imageInput.files.length > 0) {
        file = imageInput.files[0];
    } else {
        // If using camera, create a Blob from the preview image
        const response = await fetch(previewImg);
        const blob = await response.blob();
        file = new File([blob], "image.png", { type: "image/png" });
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const result = await response.json();
        document.getElementById('plantName').innerText = result.predicted_label;
        document.getElementById('plantDescription').innerText = result.description || "No description available.";
        document.getElementById('plantUses').innerText = result.uses || "No uses available.";
    } else {
        document.getElementById('plantName').innerText = 'Error predicting plant.';
        document.getElementById('plantDescription').innerText = '';
        document.getElementById('plantUses').innerText = '';
    }
}


function showDetails() {
    const modal = document.getElementById('detailsModal');
    const modalContent = document.querySelector('.modal-content');
    // Here you would set the content dynamically based on the prediction
    document.getElementById('modalPlantName').innerText = document.getElementById('plantName').innerText;
    document.getElementById('plantDescription').innerText = document.getElementById('plantDescription').innerText;
    document.getElementById('plantUses').innerText = document.getElementById('plantUses').innerText;

    // Display the modal
    modal.style.display = 'block'; // Set display to block before adding 'show'
    setTimeout(() => {
        modal.classList.add('show'); // Add the 'show' class to trigger fade in and slide down
    }, 10);
}

function closeDetails() {
    const modal = document.getElementById('detailsModal');

    // Remove the 'show' class for fade-out effect
    modal.classList.remove('show');

    // Use a timeout to hide the modal after the fade-out
    setTimeout(() => {
        modal.style.display = "none"; // Hide the modal completely
    }, 500); // Match this duration with the CSS transition time
}

// Optional: Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('detailsModal');
    if (event.target === modal) {
        closeDetails(); // Use the close function
    }
}
