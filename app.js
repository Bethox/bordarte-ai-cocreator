// ===== Helpers =====
function setHoodieColor(hex) {
  document.documentElement.style.setProperty("--hoodie-color", hex);

  const stroke = (hex.toLowerCase() === "#111111" || hex.toLowerCase() === "#000000")
    ? "rgba(255,255,255,0.25)"
    : "rgba(0,0,0,0.20)";

  document.documentElement.style.setProperty("--hoodie-stroke", stroke);
}

function currentMode() {
  return document.querySelector('input[name="mode"]:checked')?.value || "text";
}

function showTextMode() {
  document.getElementById("textMode").classList.remove("hidden");
  document.getElementById("uploadMode").classList.add("hidden");

  document.getElementById("designPng").style.display = "none";
  document.getElementById("designText").style.display = "block";
}

function showUploadMode() {
  document.getElementById("uploadMode").classList.remove("hidden");
  document.getElementById("textMode").classList.add("hidden");

  document.getElementById("designText").style.display = "none";
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".swatch").forEach(btn => {
    btn.addEventListener("click", () => {
      const hex = btn.getAttribute("data-hoodie");
      document.getElementById("hoodieColor").value = hex;
      setHoodieColor(hex);
    });
  });

  document.getElementById("hoodieColor").addEventListener("input", (e) => {
    setHoodieColor(e.target.value);
  });

  document.querySelectorAll('input[name="mode"]').forEach(r => {
    r.addEventListener("change", () => {
      if (currentMode() === "text") showTextMode();
      else showUploadMode();
    });
  });

  const fontSize = document.getElementById("fontSize");
  const fontSizeLabel = document.getElementById("fontSizeLabel");
  fontSize.addEventListener("input", () => {
    fontSizeLabel.textContent = `${fontSize.value}px`;
  });

  const pngSize = document.getElementById("pngSize");
  const pngSizeLabel = document.getElementById("pngSizeLabel");
  pngSize.addEventListener("input", () => {
    pngSizeLabel.textContent = `${pngSize.value}px`;
    const img = document.getElementById("designPng");
    img.style.maxWidth = `${pngSize.value}px`;
    img.style.maxHeight = `${pngSize.value}px`;
  });

  document.getElementById("pngUpload").addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "image/png") {
      alert("Por favor sube un archivo PNG.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = document.getElementById("designPng");
      img.src = reader.result;

      const size = document.getElementById("pngSize").value;
      img.style.maxWidth = `${size}px`;
      img.style.maxHeight = `${size}px`;

      img.style.display = "block";
      document.getElementById("designText").style.display = "none";
    };
    reader.readAsDataURL(file);
  });

  setHoodieColor(document.getElementById("hoodieColor").value);
  showTextMode();
});

// ===== Generar Diseño =====
function generateDesign() {
  const mode = currentMode();

  if (mode === "text") {
    const idea = document.getElementById("idea").value.trim();
    const style = document.getElementById("style").value;
    const color = document.getElementById("designColor").value;
    const size = document.getElementById("fontSize").value;

    const designText = document.getElementById("designText");
    const designPng = document.getElementById("designPng");

    designPng.style.display = "none";
    designText.style.display = "block";

    designText.innerText = idea || "Tu diseño aquí";
    designText.style.color = color;
    designText.style.fontSize = `${size}px`;

    if (style === "minimalista") {
      designText.style.fontFamily = "Arial, sans-serif";
      designText.style.letterSpacing = "1px";
      designText.style.textTransform = "uppercase";
    }
    if (style === "romantico") {
      designText.style.fontFamily = "Georgia, serif";
      designText.style.letterSpacing = "0px";
      designText.style.textTransform = "none";
    }
    if (style === "urbano") {
      designText.style.fontFamily = "Impact, sans-serif";
      designText.style.letterSpacing = "0.5px";
      designText.style.textTransform = "uppercase";
    }
  }

  if (mode === "upload") {
    const fileInput = document.getElementById("pngUpload");
    if (!fileInput.files || !fileInput.files[0]) {
      alert("Primero sube un PNG para previsualizarlo.");
      return;
    }
  }
}

// ===== WhatsApp =====
function sendWhatsApp() {
  const mode = currentMode();
  const hoodieColor = document.getElementById("hoodieColor").value;

  const phoneNumber = "593996028746";

  let message = `Hola Bordarte 👋\nQuiero cotizar un hoodie personalizado.\n\n🧥 Color hoodie: ${hoodieColor}\n`;

  if (mode === "text") {
    const idea = document.getElementById("idea").value.trim();
    const style = document.getElementById("style").value;
    const color = document.getElementById("designColor").value;
    const size = document.getElementById("fontSize").value;

    message += `📝 Texto: ${idea || "No especificado"}\n🔤 Tipografía: ${style}\n🎨 Color texto: ${color}\n📏 Tamaño: ${size}px\n`;
  } else {
    message += `🖼️ Diseño: PNG cargado (te lo envío por este chat)\n`;
  }

  message += `\n¿Me ayudas con precio y tiempos?`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
