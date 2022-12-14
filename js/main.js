// [1] --> Logic Of Seetinges Box

// Main
let icon = document.querySelector(".icon i");
let settingesBox = document.querySelector(".settinges-box");
icon.onclick = function () {
  this.classList.toggle("fa-spin");
  settingesBox.classList.toggle("open");
};

// Colors List
let colorsList = document.querySelectorAll(".colors-list li");
if (localStorage.getItem("color") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );
  colorsList.forEach((li) => {
    li.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${localStorage.getItem("color")}"]`)
    .classList.add("active");
}
colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color", e.target.dataset.color);
    colorsList.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

// Random Backgrounds
let randomBg = document.querySelectorAll(".random-bg button");

let randonBgOpt = true;
let counter;
if (localStorage.getItem("background") !== null) {
  if (localStorage.getItem("background") === "true") {
    randonBgOpt = true;
  } else {
    randonBgOpt = false;
  }
  randomBg.forEach((button) => {
    button.classList.remove("active");
  });
  if (localStorage.getItem("background") === "true") {
    document.querySelector(".random-bg .yes").classList.add("active");
  } else {
    document.querySelector(".random-bg .no").classList.add("active");
  }
}
randomBg.forEach((button) => {
  button.addEventListener("click", (e) => {
    randomBg.forEach((button) => {
      button.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.choice === "yes") {
      randonBgOpt = true;
      randomImages();
      localStorage.setItem("background", true);
    } else {
      randonBgOpt = false;
      clearInterval(counter);
      localStorage.setItem("background", false);
    }
  });
});

// Bullets
let bulletsOpt = document.querySelectorAll(".bullets-opt button");
let bulletsContainer = document.querySelector(".bullets");

if (localStorage.getItem("bullets_option") !== null) {
  bulletsOpt.forEach((el) => {
    el.classList.remove("active");
  });
  if (localStorage.getItem("bullets_option") === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-opt .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-opt .no").classList.add("active");
  }
}

bulletsOpt.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (el.dataset.display === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else if (el.dataset.display === "no") {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    bulletsOpt.forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

// [2] --> Logic Of Lnading Page

let landingPage = document.querySelector(".landing-page");
let imgsOfArray = ["1bg.jpg", "2bg.jpg", "3bg.jpg", "4bg.jpg"];
function randomImages() {
  if (randonBgOpt === true) {
    counter = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsOfArray.length);
      landingPage.style.backgroundImage = `url(imgs/${imgsOfArray[randomNumber]})`;
    }, 3000);
  }
}
randomImages();

// [3] Logic Of Navbar Active

let links = document.querySelectorAll(".links li a");
links.forEach((a) => {
  a.addEventListener("click", (e) => {
    handelActiveClass(e);
  });
});

// [4] --> Logic Of Full Skills Width

let sctionSkills = document.querySelector(".skills");
let allSkills = document.querySelectorAll(".skills span");
window.onscroll = function () {
  if (window.scrollY <= sctionSkills.offsetTop + 200) {
    allSkills.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};

// [5] Logic Of Gallery

let imgages = document.querySelectorAll(".gallery img");
imgages.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overLay = document.createElement("div");
    overLay.className = "over-layy";
    document.body.appendChild(overLay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImage = document.createElement("img");
    popupImage.src = e.target.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    let popupHeadding = document.createElement("h4");
    let p = document.createElement("p");
    let textHeadding = document.createTextNode(e.target.alt);
    let textP = document.createTextNode("Some Thing About Image");
    popupHeadding.appendChild(textHeadding);
    popupBox.appendChild(popupHeadding);
    p.appendChild(textP);
    popupBox.appendChild(p);
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.innerHTML = "X";
    popupBox.appendChild(closeButton);
  });
});
addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".over-layy").remove();
  }
});

// [6] Logic Of Bullets

let allBullets = document.querySelectorAll(".bullets .bullet");

allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
    allBullets.forEach((bullet) => {
      bullet.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

// [7] Reset Options
document.querySelector(".reset-box").addEventListener("click", (e) => {
  localStorage.clear();
  location.reload();
});

// [8] Toggle Menu
let toggle = document.querySelector(".toggle");
let menu = document.querySelector(".menu ul");
toggle.onclick = () => {
  menu.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== toggle && menu.classList.contains("open")) {
    menu.classList.toggle("open");
    console.log("true");
  }
});
