document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");
  const successBox = document.getElementById("successBox");
  const resetButton = document.getElementById("resetButton");

  // универсальная функция показать сообщение
  function showSuccess(message = "Message sent successfully!", duration = 3000) {
    successBox.querySelector('.success-text').textContent = `✅ ${message}`;
    successBox.classList.add('show');

0    // стилизованный console.log (полезно при отладке)
    console.log(
      "%c " + message + " ",
      "background: #1b3f1b; color: #dff7df; padding:6px 10px; border-radius:6px; font-weight:700;"
    );

    // автоматически скрыть через duration
    clearTimeout(showSuccess._hideTimer);
    showSuccess._hideTimer = setTimeout(() => {
      successBox.classList.remove('show');
    }, duration);
  }

  // Пример onSuccess для использования в форме
  function onSuccess() {
    showSuccess("Message sent successfully!", 3500);
    form.reset();
  }

  // Привязка формы (пример fetch уже у тебя есть — просто вызывай onSuccess при успехе)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // ...сбор данных и fetch
    try {
      // пример fetch (оставь свой URL)
      const payload = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        branch: document.getElementById("branch").value,
        message: document.getElementById("message").value
      };
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Network error");
      onSuccess(); // если всё ок
    } catch (err) {
      showSuccess("Failed to send!", 3500);
      console.error(err);
    }
  });

  // Reset скрывает сообщение и очищает форму
  resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    successBox.classList.remove('show');
    clearTimeout(showSuccess._hideTimer);
  });
});
