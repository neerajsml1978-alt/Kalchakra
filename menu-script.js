function toggleNav() {
  var nav = document.getElementById("mySideNav");
  if (nav.style.width === "250px") {
    nav.style.width = "0";
  } else {
    nav.style.width = "250px";
  }
}

// मेनू लोड करने के लिए फंक्शन
function loadMenu() {
  const menuHTML = `
    <div id="mySideNav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" onclick="toggleNav()">&times;</a>
      <a href="mesh.html">मेष राशि का भविष्यफल</a>
      <a href="vrishabh.html">वृषभ राशि का भविष्यफल</a>
      <a href="mithun.html">मिथुन राशि का भविष्यफल</a>
      <a href="kark.html">कर्क राशि का भविष्यफल</a>
      <a href="singh.html">सिंह राशि का भविष्यफल</a>
      <a href="kanya.html">कन्या राशि का भविष्यफल</a>
      <a href="tula.html">तुला राशि का भविष्यफल</a>
      <a href="vrischika.html">वृश्चिक राशि का भविष्यफल</a>
      <a href="dhanu.html">धनु राशि का भविष्यफल</a>
      <a href="makar.html">मकर राशि का भविष्यफल</a>
      <a href="kumbh.html">कुंभ राशि का भविष्यफल</a>
      <a href="meen.html">मीन राशि का भविष्यफल</a>
      <a href="./rashifal/upay.html">आज के अचूक उपाय</a>
      <a href="./rashifal/navgrah.html">नवग्रह मंत्र</a>
    </div>
  `;
  document.getElementById('menu-container').innerHTML = menuHTML;
}

// पेज लोड होते ही मेनू लोड करें
window.onload = loadMenu;
