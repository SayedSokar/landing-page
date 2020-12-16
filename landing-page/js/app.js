/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6+
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sectionData = document.querySelectorAll('section')
const navbarList = document.getElementById('navbar__list')
const fragment = document.createDocumentFragment(); 

//-------------------End of Glob Defination

//---------------------------- Helper Functions-----------------------
function createMenuItem(itemTxt, elementType, attName, attValue,attName1, attValue1) {
    let newElement = document.createElement(elementType);
    newElement.innerText = itemTxt;
    newElement.setAttribute(attName, attValue)
    newElement.setAttribute(attName1, attValue1)
    return newElement;
};
//--------------------------- scroll in View Smooth function-----------
function linkClicked(evt) {
  const grepId = evt.target.dataset.block;
  document.getElementById(grepId).scrollIntoView({ behavior: 'smooth'}, true);
}

//--------------------------getBoundingClientrect function-------------
function isInViewport(el) {
const rect = el.getBoundingClientRect();
     return (
         rect.top >= 0 &&
         rect.left >= 0 &&
         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
         rect.right <= (window.innerWidth || document.documentElement.clientWidth)

     );
 }
//------------------------------- end of Helper Function----------

//---------------------Build the nav Menu Items-------------------
for ( sec of sectionData) { 
    let itemTxt = sec.dataset.nav; 
    let SectionId = `${sec.getAttribute('id')}`
    let newLi = createMenuItem(itemTxt, 'li', 'class', 'menu__link', 'data-block', SectionId)
    fragment.appendChild(newLi);
};
navbarList.appendChild(fragment);
//--------------- end of Menu Item Builder-------------------------

document.querySelectorAll('.menu__link').forEach((elem) => {
  elem.addEventListener('click', linkClicked);
});


//----------------- View Port Check and highlight -------------------------------
document.addEventListener('scroll', (evt) => {
    const activeSection = document.querySelectorAll('section').forEach((elem) => {

        if (isInViewport(elem)) {
            elem.classList.add("active-class")
            const getMenuItemId = document.querySelector('#' + elem.getAttribute('Id')).id
            document.querySelector(`li[data-block=${getMenuItemId}]`).classList.add("active-class");

        } else {

            elem.classList.remove("active-class")
            const getMenuItemId = document.querySelector('#' + elem.getAttribute('Id')).id
            document.querySelector(`li[data-block=${getMenuItemId}]`).classList.remove("active-class");
        }

    });
});
    
///----------------------- end of code----------------------