const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// 12 राशियों की लिस्ट और उनका पाथ (rashifal फोल्डर के अंदर)
const rashis = [
    { id: 'mesh', name: 'मेष राशि', icon: '🐏', dataFile: 'rashifal/meshdata.js' },
    { id: 'vrishabh', name: 'वृषभ राशि', icon: '🐂', dataFile: 'rashifal/vrishabhdata.js' },
    { id: 'mithun', name: 'मिथुन राशि', icon: '♊', dataFile: 'rashifal/mithundata.js' },
    { id: 'kark', name: 'कर्क राशि', icon: '🦀', dataFile: 'rashifal/karkdata.js' },
    { id: 'singh', name: 'सिंह राशि', icon: '🦁', dataFile: 'rashifal/singhdata.js' },
    { id: 'kanya', name: 'कन्या राशि', icon: '♍', dataFile: 'rashifal/kanyadata.js' },
    { id: 'tula', name: 'तुला राशि', icon: '⚖️', dataFile: 'rashifal/tuladata.js' },
    { id: 'vrischika', name: 'वृश्चिक राशि', icon: '🦂', dataFile: 'rashifal/vrischikadata.js' },
    { id: 'dhanu', name: 'धनु राशि', icon: '🏹', dataFile: 'rashifal/dhanudata.js' },
    { id: 'makar', name: 'मकर राशि', icon: '🐊', dataFile: 'rashifal/makardata.js' },
    { id: 'kumbh', name: 'कुंभ राशि', icon: '🏺', dataFile: 'rashifal/kumbhdata.js' },
    { id: 'meen', name: 'मीन राशि', icon: '🐟', dataFile: 'rashifal/meendata.js' }
];

const templatePath = path.join(__dirname, 'template.html');
if (!fs.existsSync(templatePath)) {
    console.error('Error: template.html not found in root directory!');
    process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf-8');
const now = new Date();
const formattedDate = now.toLocaleDateString('hi-IN');

// वर्तमान समय की की (Key) गोचर मिलान के लिए
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hour = String(now.getHours()).padStart(2, '0');
const minute = String(now.getMinutes()).padStart(2, '0');
const currentTimeStr = `${year}${month}${day}${hour}${minute}`;

// प्रत्येक राशि के लिए लूप
rashis.forEach(rashi => {
    const dataFilePath = path.join(__dirname, rashi.dataFile);
    
    if (!fs.existsSync(dataFilePath)) {
        console.log(`Warning: Data file ${rashi.dataFile} not found. Skipping...`);
        return;
    }

    // JS फ़ाइल से allData लोड करना
    const jsCode = fs.readFileSync(dataFilePath, 'utf-8');
    const sandbox = {};
    const script = new Function('window', 'global', jsCode + '; return allData;');
    
    let allData;
    try {
        allData = script(sandbox, sandbox);
    } catch (e) {
        console.error(`Error parsing ${rashi.dataFile}:`, e.message);
        return;
    }

    // सही गोचर समय ढूँढना
    const sortedKeys = Object.keys(allData).sort();
    let activeKey = sortedKeys[0];
    for (let key of sortedKeys) {
        let keyNumeric = key.replace(/-/g, '');
        if (keyNumeric <= currentTimeStr) activeKey = key;
    }

    const rashifalData = allData[activeKey] || [];

    // HTML कार्ड्स तैयार करना
    let cardsHtml = '';
    if (rashifalData.length === 0) {
        cardsHtml = "<h2 style='text-align:center;'>आज के लिए अभी कोई गोचर अपडेट नहीं है।</h2>";
    } else {
        rashifalData.forEach(item => {
            const points = item.msg.split('.').filter(p => p.trim() !== "").map(p => `<li>${p.trim()}</li>`).join('');
            cardsHtml += `
                <div class="card">
                    <div class="card-header">
                        <span class="rashi-icon">${item.icon}</span>
                        <h3>${item.rashi}</h3>
                    </div>
                    <ul class="analysis-list">${points}</ul>
                </div>
            `;
        });
    }

    // JSDOM का उपयोग करके टेंपलेट में डेटा भरना
    const dom = new JSDOM(templateHtml);
    const document = dom.window.document;

    document.title = `${rashi.name} विशेष राशिफल`;

    const dateSpan = document.getElementById('current-date');
    if (dateSpan) dateSpan.textContent = formattedDate;
        // यहाँ {{RASHI_ICON}} और {{RASHI_NAME}} को बदला जा रहा है
    document.body.innerHTML = document.body.innerHTML
        .replace(/\{\{RASHI_ICON\}\}/g, rashi.icon)
        .replace(/\{\{RASHI_NAME\}\}/g, rashi.name);
    const container = document.getElementById('rashifal-container');
    if (container) {
        container.innerHTML = cardsHtml;
    }

    // फाइनल HTML फाइल को सीधे रूट में सेव करना (या आप चाहें तो rashifal/ फोल्डर में भी करा सकते हैं)
    fs.writeFileSync(path.join(__dirname, `${rashi.id}.html`), dom.serialize(), 'utf-8');
    console.log(`Successfully Generated: ${rashi.id}.html`);
});

console.log('All static rashifal pages generated successfully!');
