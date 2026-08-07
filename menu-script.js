function toggleNav() {
  var nav = document.getElementById("mySideNav");
  if (nav.style.width === "250px") {
    nav.style.width = "0";
  } else {
    nav.style.width = "250px";
  }
}

// ड्रॉपडाउन को खोलने और बंद करने के लिए फंक्शन
function toggleDropdown(event) {
  event.preventDefault();
  var dropdownContent = document.getElementById("rashifalDropdown");
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
}

// मेनू लोड करने के लिए फंक्शन
function loadMenu() {
  const menuHTML = `
    <div id="mySideNav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" onclick="toggleNav()">&times;</a>
      
      <!-- ड्रॉपडाउन मेनू (सभी राशियों का राशिफल) -->
      <a href="#" class="dropdown-btn" onclick="toggleDropdown(event)">सभी राशियों का राशिफल &#9662;</a>
      <div id="rashifalDropdown" class="dropdown-container">
        <a href="./rashifal/mesh.html">मेष राशि</a>
        <a href="./rashifal/vrash.html">वृषभ राशि</a>
        <a href="./rashifal/mithun.html">मिथुन राशि</a>
        <a href="./rashifal/kark.html">कर्क राशि</a>
        <a href="./rashifal/singh.html">सिंह राशि</a>
        <a href="./rashifal/kanya.html">कन्या राशि</a>
        <a href="./rashifal/tula.html">तुला राशि</a>
        <a href="./rashifal/vrischika.html">वृश्चिक राशि</a>
        <a href="./rashifal/dhanu.html">धनु राशि</a>
        <a href="./rashifal/makar.html">मकर राशि</a>
        <a href="./rashifal/kumbh.html">कुंभ राशि</a>
        <a href="./rashifal/meen.html">मीन राशि</a>
        </div>

      <a href="./rashifal/upay.html">आज के अचूक उपाय</a>
      <a href="./rashifal/navgrah.html">नवग्रह मंत्र</a>
         <!-- ✅ यहाँ पर हमने आपका वीडियो वाला सेलेक्ट बॉक्स जोड़ दिया है -->
      <div style="padding: 10px 15px;">
        <label style="color: #fff; font-size: 13px; margin-bottom: 5px; display: block;">मंत्र वीडियो चुनें:</label>
        <select id="mantra-select" onchange="playVideo(this.value)" style="width: 100%; padding: 8px; border-radius: 5px; background: #fff; color: #000;">
            <option value="">-- मंत्र चुनें --</option>
            <option value="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fv%2F1DL3hx1sxU%2F&show_text=false&width=267">नौ ग्रहों के मंत्र</option>
        </select>
      </div>
      
      <a href="./rashifal/panchang.html">आज का पंचांग</a>
      <a href="./rashifal/gurupurnima.html">गुरु पूर्णिमा 2026</a>
      <a href="savan.html">श्रावण मास 2026</a>
      <a href="shukra_gochar.html">शुक्र ग्रह का गोचर</a>
      <a href="https://www.facebook.com/share/v/1DL3hx1sxU/" target="_blank" rel="noopener noreferrer">नौ ग्रहों के मंत्र</a>
    </div>
  `;
  document.getElementById('menu-container').innerHTML = menuHTML;
}

// पेज लोड होते ही मेनू लोड करें
window.onload = loadMenu;


