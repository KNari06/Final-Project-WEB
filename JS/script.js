document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded successfully!");

  // ===== Task 1: Form validation (only if form exists)
  const form = document.querySelector(".contact_form");
  if (form) {
    let messageBox = document.createElement("div");
    messageBox.id = "formMessages";
    form.appendChild(messageBox);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      messageBox.innerHTML = "";
      messageBox.style.color = "red";

      const name = document.getElementById("person_name").value.trim();
      const email = document.getElementById("person_email").value.trim();

      let errors = [];
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

      if (name === "") errors.push("Please enter your name.");
      if (email === "") errors.push("Please enter your email.");
      else if (!email.match(emailPattern)) errors.push("Please enter a valid email address.");

      if (errors.length > 0) {
        messageBox.innerHTML = errors.join("<br>");
      } else {
        messageBox.style.color = "green";
        messageBox.innerHTML = "✅ Thank you! We will contact you soon.";
        form.reset();
      }
    });
  }

  // ===== Task 1.2 — Variables
  let myName = "Nurlan";
  let myAge = 20;
  let isStudent = true;
  console.log(`My name is ${myName}, I am ${myAge} years old, and it is ${isStudent} that I am a student.`);

  // ===== Task 2: Accordion
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach(item => {
    const title = item.querySelector(".accordion-title");
    title.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // ===== Task 3: Popup Form
  const openPopupBtn = document.getElementById("openPopupBtn");
  const popupOverlay = document.getElementById("popupOverlay");
  const closePopupBtn = document.getElementById("closePopupBtn");

  if (openPopupBtn && popupOverlay && closePopupBtn) {
    openPopupBtn.addEventListener("click", () => {
      popupOverlay.style.display = "flex";
    });

    closePopupBtn.addEventListener("click", () => {
      popupOverlay.style.display = "none";
    });

    popupOverlay.addEventListener("click", (event) => {
      if (event.target === popupOverlay) {
        popupOverlay.style.display = "none";
      }
    });
  }
});







// --- Task 1: Simple Rating Interaction ---
document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star');
  const message = document.querySelector('.rating-message');

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      // Убираем выделение со всех
      stars.forEach(s => s.classList.remove('active'));
      // Добавляем активные до выбранной
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add('active');
      }
      // Сообщение пользователю
      message.textContent = `You rated this app ${index + 1} stars!`;
    });
  });
});





function changeLanguage(lang) {
    const textElement = document.querySelector(".lang-text");
    switch (lang) {
      case "en":
        textElement.textContent = "Hello! Welcome to our site.";
        break;
      case "ru":
        textElement.textContent = "Привет! Добро пожаловать на наш сайт.";
        break;
      case "kk":
        textElement.textContent = "Сәлем! Біздің сайтқа қош келдіңіз.";
        break;
      default:
        textElement.textContent = "Language not supported.";
    }
  }




// ===== Task 2: Arrays + Loops (Dynamic Cars Catalog) =====
document.addEventListener("DOMContentLoaded", () => {
  const carList = document.getElementById("carList");

  if (carList) {
    // массив объектов с машинами
    const cars = [
      { brand: "Porsche 911", year: 2024, price: 180000 },
      { brand: "Lamborghini Huracán", year: 2023, price: 220000 },
      { brand: "McLaren 720S", year: 2022, price: 250000 },
      { brand: "Rolls-Royce Ghost", year: 2021, price: 300000 },
      { brand: "Bugatti Chiron", year: 2019, price: 350000 },
    ];

    // создаём HTML через цикл
    cars.forEach(car => {
      const item = document.createElement("div");
      item.classList.add("car-item");
      item.innerHTML = `
        <h3>${car.brand}</h3>
        <p>Year: ${car.year}</p>
        <p>Price: $${car.price.toLocaleString()}</p>
      `;
      carList.appendChild(item);
    });
  }
});



// ===== Task 5: Animation + Sound =====
document.addEventListener("DOMContentLoaded", () => {
  const animateBtn = document.getElementById("animateBtn");
  const cards = document.querySelectorAll(".service_card");

  // Создаём звук
  const carSound = new Audio("/sounds/car-engine-372477 (1).mp3"); 

  if (animateBtn && cards.length > 0) {
    animateBtn.addEventListener("click", () => {
      // проигрываем звук при клике
      carSound.play();

      // анимация карточек по очереди
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("jump");
          setTimeout(() => card.classList.remove("jump"), 600);
        }, index * 200);
      });
    });
  }
});


  

//-----ASS6(P1-T1)  
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const cards = document.querySelectorAll(".service_card");

    function filterCards() {
      const query = searchInput.value.trim().toLowerCase();
      let found = false;

      cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        if (title.includes(query)) {
          card.style.display = "block";
          found = true;
        } else {
          card.style.display = "none";
        }
      });

      // если ничего не найдено
      if (!found) {
        if (!document.querySelector(".no-results")) {
          const message = document.createElement("div");
          message.classList.add("no-results");
          message.textContent = "Nothing was found.";
          document.querySelector(".our_services_content").appendChild(message);
        }
      } else {
        const msg = document.querySelector(".no-results");
        if (msg) msg.remove();
      }
    }

    // фильтрация при нажатии 
    searchBtn.addEventListener("click", filterCards);

    // фильтрация при вводе  
    searchInput.addEventListener("input", filterCards);
  });


// -------------(P1-T2)
  document.addEventListener("DOMContentLoaded", () => {
  const autoInput = document.getElementById("autoInput");
  const suggestionsBox = document.getElementById("suggestionsBox");

  // список всех машин (можно добавить свои)
  const cars = [
    "Porsche 911 GT",
    "Lamborghini",
    "McLaren",
    "Mansory Rolls-Royce Ghost",
    "Mansory Mercedes-AMG G 63",
    "Bugatti Chiron",
    "Ferrari",
    "Aston Martin",
    "Bentley"
  ];

  // показываем подсказки при вводе
  autoInput.addEventListener("input", () => {
    const query = autoInput.value.trim().toLowerCase();
    suggestionsBox.innerHTML = ""; // очищаем старые подсказки

    if (query.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    const filtered = cars.filter(car => car.toLowerCase().includes(query));

    if (filtered.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    // создаём подсказки
    filtered.forEach(car => {
      const item = document.createElement("div");
      item.textContent = car;
      item.classList.add("suggestion-item");

      // при клике вставляем в инпут
      item.addEventListener("click", () => {
        autoInput.value = car;
        suggestionsBox.style.display = "none";
      });

      suggestionsBox.appendChild(item);
    });

    suggestionsBox.style.display = "block";
  });

  // скрывать подсказки при клике вне
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-bar")) {
      suggestionsBox.style.display = "none";
    }
  });
});




//Скрытые карточки в каталоге

document.addEventListener('DOMContentLoaded', function() {
  const moreBtn = document.querySelector('.more-btn');
  const hiddenSection = document.querySelector('.hidden-content');

  moreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Переключаем видимость
    hiddenSection.classList.toggle('show');

    // Меняем текст кнопки
    if (hiddenSection.classList.contains('show')) {
      moreBtn.textContent = 'Show less';
      // Плавно прокручиваем к новым карточкам
      hiddenSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      moreBtn.textContent = 'Learn more';
      // Прокрутка обратно к началу секции
      document.querySelector('.our_services_top').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});









const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

// По умолчанию светлая тема
body.classList.add('light-theme');

// Если нужна кнопка для переключения темы
themeToggleBtn?.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');
});
