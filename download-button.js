// यह फंक्शन किसी भी पेज पर डाउनलोड बटन जोड़ देगा
function addDownloadButton(targetContainerId, fileName) {
    // बटन बनाना
    const btn = document.createElement('button');
    btn.className = 'download-btn';
    btn.innerText = 'डाउनलोड करें (High Quality Image)';
    btn.style.display = 'block';
    btn.style.margin = '20px auto';
    btn.style.padding = '15px 30px';
    btn.style.fontSize = '20px';
    btn.style.backgroundColor = '#8b0000';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '10px';
    btn.style.cursor = 'pointer';

    // बटन पर क्लिक इवेंट
    btn.addEventListener('click', function() {
        const container = document.getElementById(targetContainerId);
        html2canvas(container, { scale: 3, backgroundColor: '#f4f7f6' }).then(canvas => {
            const link = document.createElement('a');
            link.download = fileName || 'download.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // बटन को बॉडी में सबसे नीचे जोड़ना
    document.body.appendChild(btn);
}
