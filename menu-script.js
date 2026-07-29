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
      <a href="./rashifal/mesh.html">मेष राशि का भविष्यफल</a>
      <a href="./rashifal/upay.html" style="font-size: 20px;">आज के अचूक उपाय</a>
      <a href="./rashifal/navgrah.html">नवग्रह मंत्र</a>
    </div>
  `;
  document.getElementById('menu-container').innerHTML = menuHTML;
}

// पेज लोड होते ही मेनू लोड करें
window.onload = loadMenu;
