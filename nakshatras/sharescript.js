function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        }).catch(err => console.error('Error sharing:', err));
    } else {
        alert("आपका ब्राउज़र शेयरिंग सपोर्ट नहीं करता है।");
    }
}
