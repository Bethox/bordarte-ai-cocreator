const images = {
  masculino: {
    blanco: "m-blanco.jpg",
    negro: "m-negro.jpg",
    "azul-cielo": "m-azul-cielo.jpg",
    "blanco-hueso": "m-blanco-hueso.jpg",
    "gris-raton": "m-gris-raton.jpg"
  },
  femenino: {
    blanco: "f-blanco.jpg",
    negro: "f-negro.jpg",
    "palo-rosa": "f-palo-rosa.jpg",
    lavanda: "f-lavanda.jpg",
    turquesa: "f-turquesa.jpg"
  }
};

let selectedGender = "masculino";
let selectedColor = "blanco";

function renderOptions() {
  const container = document.getElementById("colorOptions");
  container.innerHTML = "";

  Object.keys(images[selectedGender]).forEach(color => {
    const img = document.createElement("img");
    img.src = images[selectedGender][color];
    img.classList.add("thumb");

    img.onclick = () => {
      selectedColor = color;
      document.getElementById("hoodieBase").src =
        images[selectedGender][color];
    };

    container.appendChild(img);
  });
}

document.querySelectorAll('input[name="gender"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    selectedGender = e.target.value;
    selectedColor = "blanco";
    document.getElementById("hoodieBase").src =
      images[selectedGender]["blanco"];
    renderOptions();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderOptions();
});

function generateDesign() {
  const mode = document.querySelector('input[name="mode"]:checked').value;

  if (mode === "text") {
    const idea = document.getElementById("idea").value;
    const style = document.getElementById("style").value;
    const color = document.getElementById("designColor").value;
    const size = document.getElementById("fontSize").value;

    const designText = document.getElementById("designText");
    const designPng = document.getElementById("designPng");

    designPng.style.display = "none";
    designText.style.display = "block";

    designText.innerText = idea;
    designText.style.color = color;
    designText.style.fontSize = size + "px";

    if (style === "minimalista")
      designText.style.fontFamily = "Arial";

    if (style === "romantico")
      designText.style.fontFamily = "Georgia";

    if (style === "urbano")
      designText.style.fontFamily = "Impact";
  }
}

document.getElementById("pngUpload")?.addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function() {
    const img = document.getElementById("designPng");
    img.src = reader.result;
    img.style.display = "block";
    document.getElementById("designText").style.display = "none";
  };
  reader.readAsDataURL(file);
});

function sendWhatsApp() {
  const phoneNumber = "593996028746";

  let message = `Hola Bordarte 👋\nQuiero cotizar un hoodie personalizado.\n\nGénero: ${selectedGender}\nColor: ${selectedColor}\n`;

  const idea = document.getElementById("idea").value;
  if (idea)
    message += `Texto: ${idea}\n`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
