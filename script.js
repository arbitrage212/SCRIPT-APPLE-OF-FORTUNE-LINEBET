// LOGIN
async function checkCode() {
  const code = document.getElementById("code").value;

  if (!/^\d{10}$/.test(code)) {
    alert("ACCESS DENIED");
    return;
  }

  const res = await fetch("codes.json");
  const data = await res.json();

  if (data.codes.includes(code)) {
    localStorage.setItem("auth", "true");
    window.location.href = "app.html";
  } else {
    alert("INVALID CODE");
  }
}

// PROTECTION
if (window.location.pathname.includes("app.html")) {
  if (!localStorage.getItem("auth")) {
    window.location.href = "index.html";
  }
}

// APPLE LOGIC
function showApple() {
  const slots = document.querySelectorAll(".apple-slot");

  slots.forEach(slot => {
    slot.classList.remove("apple");
    slot.textContent = "↑↓";
  });

  const chosen = slots[Math.floor(Math.random() * slots.length)];
  chosen.classList.add("apple");
  chosen.textContent = "🍏";
}
