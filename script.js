'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////188. Implementing Smooth Scrolling
btnScrollTo.addEventListener('click', function (e) {
  // // find coordinates of section you want to scroll to
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y', window.pageXOffset, window.pageYOffset);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // // Scrolling // OLD SKOOL WAY
  // window.scrollTo(
  //   // Current position + current scroll
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // How to do in modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////192. Event Delegation: Implementing Page Navigation
// Page navigation

// This is very slow, you are making a seperate function(event listener) for each button
// If you had 1000 buttons it would affect your page
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // Prevents page from jumping to section
//     const id = this.getAttribute('href'); // Will return what the button is supposed to go to
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     // Same as above but using querySelector to select what section to move to
//   });
// });

// Much faster way
// 1. Add event listener to comon parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target); // find out where the event happened
  e.preventDefault();

  // Matching strategy (ie ignoring clicks that were not on the buttons)
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////194. Building a Tabbed Component
// Remember: forEach() is bad practice
// tabs.forEach(t => t.addEventListener('click', () => console.log('Tab')));

// Common parent '.operations__tab-container'
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // This will select the closest .operations__tab
  //See below: 193. DOM Traversing
  //console.log(clicked);

  // Ignore all clicks in the container that aren't on a button
  //Guard clause => a contidion that will return early if a condition is matched
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active')); // Remove active from all tabs

  // Active tab
  clicked.classList.add('operations__tab--active'); // Apply active to new active tab

  // Activate content area
  //console.log(clicked.dataset.tab);
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////186. Selecting, Creating, and Deleting Elements

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
//console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
//console.log(allButtons);

//console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We used cookies for imporved functionality';
message.innerHTML =
  'We used cookies for imporved functionality <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message);
//header.append(message);
//header.append(message.cloneNode(true));

//header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

///////////////////////////////////////////////195. Passing Arguments to Event Handlers
// Menu fade animation

const handleHover = function (e) {
  //console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // finds parent and then child instances from the parent ==> siblings
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// We want to use nav_links and logo ==> common parent is .nav
// .nav is selected at the top
// Passing "arguement" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// ///////////////////////////////////196. Implementing a Sticky Navigation: The Scroll Event
// // Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function (e) {
//   //console.log(this.window.scrollY);
//   // This will turn on when we reach the first section
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/////////////////////////////////////////197. A Better Way: The Intersection Observer API
// // Allows code to observe changes to the way a target element intersects another element
// // or how it intersects the viewport
// const obsCallback = function (entries, observer) {
//   //Callback function will be called each time the target element is intersecting the root element at the treshold we define
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null, // Observe target element intersecting entire viewport
//   //threshold: 0.1, // When 10% of the target is in view
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // Whenever our target is intersecting the viewport at the treshold(10%) => the callback function will be called(scrolling up or down)
// observer.observe(section1);

//const header = document,querySelector('.header') // header has already been selectd above
const navHeight = nav.getBoundingClientRect().height; // Find size of nav bar
//console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  if (entry.isIntersecting) nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // Add margin so nav will appeare
});
headerObserver.observe(header);

/////////////////////////////////////////////////////////198. Revealing Elements on Scroll
// Reveal each section as we aproach it
// Section will 'slide' into view as we aproach them
// Reveal section
//const allSections = document.querySelectorAll('.section'); // already done above

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // Now that section is active we dont need to look at it anymore
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // Section will be revieled when it is 15% visible
});

// Observe all sections at the same time
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

/////////////////////////////////////////////////////////////////199. Lazy Loading Images
// Images can be big and slow to load
// We will have two images, 1 low res, 1 high res
// The low reslolution image will load first will a blur
// When the high res has loaded fully we will display it
// This will allow the page to function even if the images are takign time to load
// ie bad internet connection / old mobile phone
const imgTargets = document.querySelectorAll('img[data-src]'); // Secect images with data-sct attributes
//console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;

  // Replace src with data-src => replace blurry image with high res image
  entry.target.src = entry.target.dataset.src;
  // listen for when image is loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMArgin: '200px', // This will have the images start loading before they come into view
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////////////////200. Building a Slider Component: Part 1
// Slides are currently all on top of each other
// slider component has 3 different slides
// Slides
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // To view the whole slider at once
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-1200px)';
  // slider.style.overflow = 'visible';

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activiateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activiateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    goToSlide(curSlide);
    activiateDot(curSlide);
  };

  // Functions to initilise
  const init = function () {
    goToSlide(0);
    createDots();
    activiateDot(0);
  };
  init();

  //Event Handlers
  // Go to next slide
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Keyboard event
  document.addEventListener('keydown', function (e) {
    //console.log(e);
    if (e.key == 'ArrowLeft') prevSlide();
    if (e.key == 'ArrowRight') nextSlide();
    //e.key === 'ArrowRight' && nextSlide() // Short circuit
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activiateDot(slide);
    }
  });
};
slider();

// Slides are all side by side and use a transform property in CSS

// /////////////////////////////////////////////////// 187. Styles, Attributes and Classes

// // Styles : CSS
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height); //empty string => cannot ascess from style.css
// console.log(message.style.color); //empty string
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).height); // how to ascess css
// console.log(getComputedStyle(message).color); // how to ascess css

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes: HTML
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// console.log(logo.designer); // Wont work as it is not a standard property //Non-standard
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Banklist');

// console.log(logo.src);
// console.log(logo.getAttribute('src')); // Absolute value

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href')); // Absolute value

// // Data  attribultes
// console.log(logo.dataset.versionNumber); // Access data stored i HTML code

// //Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // Dont use, will override all exsiting classes
// logo.className = 'jamie';

// ///////////////////////////////////////////189. Types of Events and Event Handlers
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   // mouseenter => whenever a mouse enters the area
//   alert('addEventListeneer: Great! You are reading the heading :D');
//   // After the alter is shown we remove the event listener
//   // We do this so it will only show up one time
//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);
// //Remove the event listener after 3secs
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // This is better than the function bleow
// // with addEventListener we can add multipal functions and they will all work
// // with onmouseenter the second one will override the first
// // This is better than the function bleow
// // with addEventListener we can also remove aan event listener if we dont need it anymore

// // // OLD SKOOL
// // h1.onmouseenter = function (e) {
// //   // mouseenter => whenever a mouse enters the area
// //   alert('onmouseenter: Great! You are reading the heading :D');
// // };

// ///////////////////////////////////////////////////////191. Event Propagation in Practice
// // rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColour = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColour());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColour();
//   console.log('LINK', e.target, e.currentTarget);

//   // Stop propagation
//   //e.stopPropagation();
// });

// // Due to bubbling, clicking .nav__link(child) will ascess .nav__links(parent)
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColour();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColour();
//   //The even is the same event even with bubbling
//   // .target => where the event happened (ie where the button was clicked)
//   // .currentTarget => where you are now (ie what parent you are in)
//   console.log('NAV', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

// ////////////////////////////////////////////////////////////////193. DOM Traversing

// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// // Selecting .highlight as it is a child of h1
// // if there are other .hightlight classes thay will not be selected as they are not a child of h1
// console.log(h1.childNodes); // Everything
// console.log(h1.children); // Only direct children
// h1.firstElementChild.style.color = 'white'; // Select only first element
// h1.lastElementChild.style.color = 'orangered'; // Select only last element

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// //.closest() If you want to find parent that isn't directly above
// // Selected clostest header to h1 and change the colour
// // 'var(--gradient-secondary)' is from the CSS file
// h1.closest('h1').style.background = 'var(--gradient-primary)';
// // If you select h1.closest('.h1') it will only find itself

// // Going sideways: siblings
// // JS will only let you see direct siblings (previous and next)
// console.log(h1.previousElementSibling); // Null as there is nothing there
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// // if you need all siblings, you can move up to the parent and see from there
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

////////////////////////////////////////////////////////////// 202. Lifecycle DOM Events
// DOM content loaded
// This will happen when the HTML is loaded, does NOT wait for images and other
// We can use this to execute code that should only be executed after the DOM is available.
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

// Load event
// When images and everything has been loaded
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// // Before load event => create just as a user is leaving a webpage
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

// Count IP Addresses

// Implement a function that receives two IPv4 addresses,
// and returns the number of addresses between them
// (including the first one, excluding the last one).

// All inputs will be valid IPv4 addresses in the form of strings.
// The last address will always be greater than the first one.
