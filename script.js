// ================== LOGIN + VALIDATION ==================

async function checkCode() {
  const codeInput = document.getElementById("code");
  const fileInput = document.getElementById("screenshots");

  if (!codeInput) return;

  const code = codeInput.value.trim();
  const files = fileInput ? fileInput.files : [];

  // Vérification ID 10 chiffres
  if (!/^\d{10}$/.test(code)) {
    alert("ID غير صالح (يجب أن يكون 10 أرقام)");
    return;
  }

  // Vérification upload screenshots
  if (!files || files.length < 1) {
    alert("يرجى تحميل صور الإثبات");
    return;
  }

  try {
    const response = await fetch("codes.json");
    const data = await response.json();

    if (data.codes.includes(code)) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("userID", code);
      window.location.href = "app.html";
    } else {
      alert("ID غير مفعل");
    }
  } catch (error) {
    alert("Erreur chargement codes.json");
    console.error(error);
  }
}


// ================== PROTECTION PAGE APP ==================

if (window.location.pathname.includes("app.html")) {
  if (!localStorage.getItem("auth")) {
    window.location.href = "index.html";
  }
}


// ================== APPLE SYSTEM ==================

function showApple() {
  const slots = document.querySelectorAll(".apple-slot");

  if (!slots.length) return;

  // Reset toutes les cases
  slots.forEach(slot => {
    slot.classList.remove("apple");
    slot.textContent = "↑↓";
  });

  // Choix aléatoire
  const randomIndex = Math.floor(Math.random() * slots.length);
  const chosen = slots[randomIndex];

  chosen.classList.add("apple");
  chosen.textContent = "🍏";
}


// ================== IMAGE PREVIEW ==================

document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("screenshots");
  const preview = document.getElementById("preview");

  if (!input || !preview) return;

  input.addEventListener("change", function () {

    preview.innerHTML = "";

    Array.from(input.files).forEach(file => {

      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();

      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "80px";
        img.style.margin = "5px";
        img.style.border = "1px solid #00ff00";
        preview.appendChild(img);
      };

      reader.readAsDataURL(file);
    });
  });

});
