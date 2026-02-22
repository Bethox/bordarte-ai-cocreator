function generateDesign() {
  const idea = document.getElementById("idea").value.trim();
  const style = document.getElementById("style").value;
  const color = document.getElementById("colorPicker").value;

  const designText = document.getElementById("designText");

  // Si no escribe nada, ponemos un texto por defecto
  designText.innerText = idea || "Tu diseño aquí";
  designText.style.color = color;

  if (style === "minimalista") {
    designText.style.fontFamily = "Arial, sans-serif";
    designText.style.fontSize = "18px";
    designText.style.letterSpacing = "1px";
  }

  if (style === "romantico") {
    designText.style.fontFamily = "Georgia, serif";
    designText.style.fontSize = "22px";
    designText.style.letterSpacing = "0px";
  }

  if (style === "urbano") {
    designText.style.fontFamily = "Impact, sans-serif";
    designText.style.fontSize = "20px";
    designText.style.letterSpacing = "0.5px";
  }
}

function sendWhatsApp() {
  const idea = document.getElementById("idea").value.trim();
  const style = document.getElementById("style").value;
  const color = document.getElementById("colorPicker").value;

  // CAMBIA ESTE NÚMERO por tu WhatsApp en formato internacional (Ecuador: 593 + número, sin +)
  const phoneNumber = "593996028746";

  const message =
`Hola Bordarte 👋
Quiero cotizar un hoodie personalizado.

🧠 Idea: ${idea || "No especificada"}
🎨 Estilo: ${style}
🖌️ Color diseño: ${color}

¿Me ayudan con precio y tiempos?`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
