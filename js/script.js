/* API / MAP */

var map = L.map('map').setView([0, 0], 3);
var marker = L.circle([0, 0], 150000, {
  color: 'white',
}).addTo(map);

L.tileLayer('http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
}).addTo(map);

setInterval(function () {
  
  fetch('https://api.wheretheiss.at/v1/satellites/25544').then(response => {
    return response.json();
  }).then(data => {

    var newLatLng = new L.LatLng(data.latitude, data.longitude);
    marker.setLatLng(newLatLng);
    map.setView(newLatLng);

    document.getElementById('latitude').innerHTML = data.latitude;
    document.getElementById('longitude').innerHTML = data.longitude;
    document.getElementById('velocity').innerHTML = data.velocity;

  });

}, 2000);

/* SLIDER BANNER */

var swiper = new Swiper(".swiper_banner", {
  direction: "vertical",
  autoplay: {
    delay: 5000,
  }
});

/* SLIDER NEXT MISSIONS */

var swiper_missions = new Swiper(".swiper_missions", {
  slidesPerView: 1.5,
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1024: {
      slidesPerView: 2.2,
      spaceBetween: 15,
    },
  },
});

/* MENU */

function menu() {
  let menu = document.getElementById('menu_nav');
  let btn = document.getElementById('menu_btn');

  if(btn.classList.contains('menu_close')) {
    menu.style.display = 'block';
    btn.classList.remove('menu_close');
    btn.classList.add('menu_open');
  } else {
    menu.style.display = 'none';
    btn.classList.remove('menu_open');
    btn.classList.add('menu_close');
  }
}

/* NUMBER INCREMENT */

window.addEventListener('scroll', function() {
	var element = document.querySelector('.specifications_figures');
	var position = element.getBoundingClientRect();

	if(position.top >= 0 && position.bottom <= window.innerHeight) {

    const counters = document.querySelectorAll('.counter');

    for(let n of counters) {
      const updateCount = () => {
        const target = + n.getAttribute('data-target');
        const count = + n.innerText;
        const speed = 5000;
        const inc = target / speed; 
        if(count < target) {
          n.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 200);
        } else {
          n.innerText = target;
        }
      }
      updateCount();
    }
	}
});
