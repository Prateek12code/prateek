function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

var loader;
function loadNow(opacity){
  if(opacity <=0){
    displayContent();
  }
  else{
    loader.style.opacity = opacity;
    window.setTimeout(function() {
      loadNow(opacity -0.3)
    }, 400);

  }
}

function displayContent() {
  loader.style.display = 'none';
  document.getElementById('content').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
  loader = document.getElementById('loader');
  loadNow(1);
});

const letters = "0123456789.*-+/+_)(&%$#@!~`?><,:;}{[]ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.getElementById("title").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 2;
  }, 40);
}

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();


document.addEventListener("DOMContentLoaded", function() { 
  const carousel = document.querySelector(".carousel"); 
  const arrowBtns = document.querySelectorAll(".wrapper i"); 
  const wrapper = document.querySelector(".wrapper"); 

  const firstCard = carousel.querySelector(".card"); 
  const firstCardWidth = firstCard.offsetWidth; 

  let isDragging = false, 
      startX, 
      startScrollLeft, 
      timeoutId; 

  const dragStart = (e) => {  
      isDragging = true; 
      carousel.classList.add("dragging"); 
      startX = e.pageX; 
      startScrollLeft = carousel.scrollLeft; 
  }; 

  const dragging = (e) => { 
      if (!isDragging) return; 
    
      // Calculate the new scroll position 
      const newScrollLeft = startScrollLeft - (e.pageX - startX); 
    
      // Check if the new scroll position exceeds  
      // the carousel boundaries 
      if (newScrollLeft <= 0 || newScrollLeft >=  
          carousel.scrollWidth - carousel.offsetWidth) { 
            
          // If so, prevent further dragging 
          isDragging = false; 
          return; 
      } 
    
      // Otherwise, update the scroll position of the carousel 
      carousel.scrollLeft = newScrollLeft; 
  }; 

  const dragStop = () => { 
      isDragging = false;  
      carousel.classList.remove("dragging"); 
  }; 

  const autoPlay = () => { 
    
      // Return if window is smaller than 800 
      if (window.innerWidth < 800) return;  
        
      // Calculate the total width of all cards 
      const totalCardWidth = carousel.scrollWidth; 
        
      // Calculate the maximum scroll position 
      const maxScrollLeft = totalCardWidth - carousel.offsetWidth; 
        
      // If the carousel is at the end, stop autoplay 
      if (carousel.scrollLeft >= maxScrollLeft) return; 
        
      // Autoplay the carousel after every 2500ms 
      timeoutId = setTimeout(() =>  
          carousel.scrollLeft += firstCardWidth, 2500); 
  }; 

  carousel.addEventListener("mousedown", dragStart); 
  carousel.addEventListener("mousemove", dragging); 
  document.addEventListener("mouseup", dragStop); 
  wrapper.addEventListener("mouseenter", () =>  
      clearTimeout(timeoutId)); 
  wrapper.addEventListener("mouseleave", autoPlay); 

  // Add event listeners for the arrow buttons to  
  // scroll the carousel left and right 
  arrowBtns.forEach(btn => { 
      btn.addEventListener("click", () => { 
          carousel.scrollLeft += btn.id === "left" ?  
              -firstCardWidth : firstCardWidth; 
      }); 
  }); 
}); 



let notifications = document.querySelector('.notifications');
    let success = document.getElementById('success');
    let error = document.getElementById('error');
    let warning = document.getElementById('warning');
    let info = document.getElementById('info');
    
    function createToast(type, icon, title, text){
        let newToast = document.createElement('div');
        newToast.innerHTML = `
            <div class="toast ${type}">
                <i class="${icon}"></i>
                <div class="content">
                    <div class="title">${title}</div>
                    <span>${text}</span>
                </div>
                <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
            </div>`;
        notifications.appendChild(newToast);
        newToast.timeOut = setTimeout(
            ()=>newToast.remove(), 5000
        )
    }
    success.onclick = function(){
        let type = 'success';
        let icon = 'fa-solid fa-circle-check';
        let title = 'Success';
        let text = 'Hoohoo! The link got opened!';
        createToast(type, icon, title, text);
    }
    error.onclick = function(){
        let type = 'error';
        let icon = 'fa-solid fa-circle-exclamation';
        let title = 'Hmm..';
        let text = 'Stil Underdevelopment. Blame Prateek For This!';
        createToast(type, icon, title, text);
    }
    warning.onclick = function(){
        let type = 'warning';
        let icon = 'fa-solid fa-triangle-exclamation';
        let title = 'Warning';
        let text = 'Ahh Here We Go Again! From Starting.';
        createToast(type, icon, title, text);
    }
    info.onclick = function(){
        let type = 'info';
        let icon = 'fa-solid fa-circle-info';
        let title = 'Info';
        let text = 'This is a info toast.';
        createToast(type, icon, title, text);
    }






let hrs = document.getElementById("hours");
let min = document.getElementById("mins");
let d = new Date();

setInterval(()=>{
  let d = new Date();
  hrs.innerHTML = (d.getHours()<10?"0":"") + d.getHours();
  min.innerHTML = (d.getMinutes()<10?"0":"") + d.getMinutes();
  
},1000)
 

