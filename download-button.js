function createCustomCaptureButton() {
    const btn = document.createElement('button');
    btn.className = 'download-btn';
    btn.innerText = 'कस्टम कैप्चर करें';
    btn.style.display = 'block';
    btn.style.margin = '40px auto';
    btn.style.padding = '15px 40px';
    btn.style.backgroundColor = '#8b0000';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '10px';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
    
    btn.onclick = function() {
        document.getElementById('capture-modal').style.display = 'block';
    };
    
    document.body.appendChild(btn);
}

function executeCustomCapture() {
    const start = parseInt(document.getElementById('start-idx').value);
    const count = parseInt(document.getElementById('card-count').value);
    const container = document.getElementById('capture-area');
    const allCards = container.querySelectorAll('.card');

    // कार्ड्स को फिल्टर करें: जो रेंज से बाहर हैं उन्हें छुपाएं
    allCards.forEach((card, index) => {
        if (index < start || index >= (start + count)) {
            card.style.display = 'none';
        } else {
            card.style.display = 'flex';
        }
    });

    // कैप्चर करें
    html2canvas(container, { scale: 3, backgroundColor: '#f4f7f6' }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-rashifal.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // सब कुछ वापस दिखाएं
        allCards.forEach(card => card.style.display = 'flex');
        document.getElementById('capture-modal').style.display = 'none';
    });
}
