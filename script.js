function convertToAudio() {
    const videoInput = document.getElementById('videoInput');
    const audioOutput = document.getElementById('audioOutput');
    const downloadLink = document.getElementById('downloadLink');

    if (!videoInput.files.length) {
        alert('Please select a video file.');
        return;
    }

    const videoFile = videoInput.files[0];
    const videoURL = URL.createObjectURL(videoFile);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const mediaSource = audioContext.createMediaElementSource(new Audio(videoURL));
    const analyser = audioContext.createAnalyser();
    
    mediaSource.connect(analyser);
    analyser.connect(audioContext.destination);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(dataArray);

    const source = audioContext.createBufferSource();
    source.buffer = analyser.context.createBuffer(1, 2048, audioContext.sampleRate);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    source.start(0);
    audioOutput.src = videoURL;
    audioOutput.controls = true;

    // Show the download button after conversion
    downloadLink.style.display = 'inline-block';
}

function downloadAudio() {
    const audioOutput = document.getElementById('audioOutput');
    const downloadLink = document.getElementById('downloadLink');

    const blob = new Blob([audioOutput.src], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
}

// ... (الكود السابق)

// دالة لإعادة تعيين الحالة إلى الوضع الابتدائي
function resetConverter() {
    document.getElementById('videoInput').value = '';
    document.getElementById('audioOutput').src = '';
    document.getElementById('downloadLink').style.display = 'none';
}