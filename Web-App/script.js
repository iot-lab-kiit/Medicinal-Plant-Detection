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
    } else {
        document.getElementById('plantName').innerText = 'Error predicting plant.';
    }
}
