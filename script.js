function loadRashifal() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    // वर्तमान समय का की (Key) प्रारूप
    const currentTimeStr = `${year}${month}${day}${hour}${minute}`;
    
    // सभी उपलब्ध डेटा कीज़ को लें
    const sortedKeys = Object.keys(allData).sort();
    let activeKey = null;

    // सही गोचर समय ढूँढें
    for (let key of sortedKeys) {
        let keyNumeric = key.replace(/-/g, '');
        if (keyNumeric <= currentTimeStr) {
            activeKey = key;
        }
    }

    const rashifalData = allData[activeKey];
    document.getElementById('current-date').innerText = new Date().toLocaleDateString('hi-IN');
    const container = document.getElementById('rashifal-container');
    container.innerHTML = '';

    if (!rashifalData) {
        container.innerHTML = "<h2 style='text-align:center;'>आज के लिए अभी कोई गोचर अपडेट नहीं है।</h2>";
        return;
    }

    rashifalData.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'card';
        const points = item.msg.split('.').filter(p => p.trim() !== "").map(p => `<li>${p.trim()}</li>`).join('');
        
        card.innerHTML = `
            <div class="card-header">
                <span class="rashi-icon">${item.icon}</span>
                <h3>${item.rashi}</h3>
            </div>
            <ul class="analysis-list">${points}</ul>
        `;
        container.appendChild(card);
    });
}

window.onload = loadRashifal;
