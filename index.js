const phoneWidth = window.matchMedia("(max-width: 767px)");
var porcentageAnimated = false;

document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------------------------------------
   *  - Scripts que se ejecutan una vez se carga la pagina
   * ------------------------------------------------------ */

  var contadores = document.querySelectorAll(".percentage__number");

  for (let i = 0; i < contadores.length; i++) {
    setIncremento(contadores[i]);
  }

  checkIncrementoAnimation();
  suscribeMenuEvents();
});

function suscribeMenuEvents() {
  const popupMenu = document.getElementById("menu__btn_toggle");
  const navContainer = document.getElementById("nav__container");
  const cards = document.getElementsByClassName("blog-card");
  var prevScrollpos = window.pageYOffset;

  window.addEventListener("scroll", () => {
    if (popupMenu.checked) popupMenu.click();

    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      navContainer.style.top = "0";
    } else {
      navContainer.style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;

    if (phoneWidth.matches) {
      for (let i = 0; i < cards.length; i++) {
        let topdistancia = cards[i].offsetTop - window.pageYOffset;
        let botDistancia =
          cards[i].offsetTop + cards[i].offsetHeight - window.pageYOffset;
        if (topdistancia < 150 && botDistancia > 0) {
          cards[i].classList.add("blog-card__hover");
        } else {
          cards[i].classList.remove("blog-card__hover");
        }
      }
    }

    checkIncrementoAnimation();
    
  });

  window.addEventListener("click", (ev) => {
    const popupMenu = document.getElementById("menu__btn_toggle");
    if (popupMenu.checked) {
      if (ev.path.filter((f) => f.id == "menu__btn_toggle_hamb") == 0) {
        popupMenu.click();
      }
    }
  });
  
}

function checkIncrementoAnimation() {
  var currentScrollPos = window.pageYOffset;
  const porcentageContainer = document.getElementById("porcentage__container");
  if(!porcentageAnimated && porcentageContainer.offsetTop < (currentScrollPos + window.innerHeight) - (window.innerHeight * 0.5)){
    porcentageAnimated = true;
    var contadores = document.querySelectorAll(".percentage__number");

    for (let i = 0; i < contadores.length; i++) {
      startIncremento(contadores[i]);
    }
  }
}

function setIncremento(element){
  if(!element.dataset.maxCount){
      element.dataset.maxCount = element.innerHTML;
      element.innerHTML = 0;
  }
}

function startIncremento(element, time = 500, stepsAmount = 100){
    var max = parseFloat(element.dataset.maxCount);
    var numero = parseFloat(element.innerHTML);
    var incremental = max/stepsAmount;
    var timeStep = time/stepsAmount;
    if(numero >= max){
        element.innerHTML = max.toFixed(2);
        return;
    }
    element.innerHTML = (numero+incremental).toFixed(2);
    setTimeout(() => {startIncremento(element, time, stepsAmount)}, timeStep);
}

function esp() {
  window.location.href = "/es";
}

function eng() {
  window.location.href = "/en";
}
