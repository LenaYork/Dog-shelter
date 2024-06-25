if (containerWidth < 767) {
    mobileLinks.style.display = "flex";
}
function toggleMobileMenu(event) {
    mobileMenu.classList.toggle("rotate");
    mobileLinks.classList.toggle('open');
    mobileLinks.classList.toggle('closed');
    fadeWrapper.classList.toggle("fade-wrapper");
    if (mobileLinks.classList.contains('open')) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "scroll";
    }
    event.stopPropagation();
}

function removeMobileLinks(event) {
    if (event.target.classList.contains("header-nav-link")) {
        mobileLinks.classList.remove('open');
        mobileMenu.classList.remove('rotate');
        fadeWrapper.classList.remove("fade-wrapper");
        document.body.style.overflowY = "scroll";
    }
    event.stopPropagation();
}

function closeMobileMenu(event) {
    const isClickInside = mobileLinks.contains(event.target);
    if (!isClickInside && mobileLinks.classList.contains("open")) {
        mobileLinks.classList.remove('open');
        mobileMenu.classList.remove('rotate');
        fadeWrapper.classList.remove("fade-wrapper");
        document.body.style.overflowY = "scroll";
    }
}


mobileMenu.addEventListener("click", toggleMobileMenu);

mobileLinks.addEventListener("click", removeMobileLinks);


// close menu when click outside the mobile menu
document.addEventListener('click', closeMobileMenu);


window.addEventListener('beforeunload', function () {
    mobileMenu.removeEventListener('click', toggleMobileMenu);
    mobileLinks.removeEventListener('click', removeMobileLinks);
    document.removeEventListener('click', closeMobileMenu);

});