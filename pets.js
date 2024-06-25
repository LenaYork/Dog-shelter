function generateRandomNum() {
    const randomNum = Math.floor(Math.random()  * (PETS.length - 1 + 1) );
    console.log("randomNumber", randomNum)
    return randomNum;
}

generateRandomNum();

let cardsNum;
let pagesNum;

function setCardsNum(width) { // rename
    if (width >= 1280) {
        cardsNum = 8; //8 cards
        pagesNum = 6; // 6 pages
    } 
    if (width >= 768 && width < 1280) {
        cardsNum = 6; //6 cards
        pagesNum = 8; 
    } 
    if (width < 768) {
        cardsNum = 3; //3 cards
        pagesNum = 16;
    }
    // return cardsNum;
}

setCardsNum(containerWidth);

let petsSet = [];

function createPetsSet() {
    for (let i = 0; i < 6; i++) {
        petsSet.push(...shuffle(PETS))
    }
    console.log("48", petsSet);
}

createPetsSet();

function shuffle(array) {
    const shuffledArray = [...array];
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray;
}

// console.log(PETS)
// console.log(shuffle(PETS))

function createCard(name, image) {
    const card = document.createElement("div");
    card.classList.add("friend-item");

    const cardImage = document.createElement("img");
    cardImage.setAttribute("alt", name);
    cardImage.setAttribute("src", image);
    
    const cardText = document.createElement("p");
    cardText.classList.add("pet-name");
    cardText.innerHTML = name;

    const cardButton = document.createElement("button");
    cardButton.classList.add("button", "pet-button");
    cardButton.innerHTML = "Learn more";

    card.append(cardImage, cardText, cardButton);
    return card;
}

function displayCardsSet(numOfCards, page) {
    clearPetsContainer();
    const numberOfCards = numOfCards || cardsNum;
    const currentPage = page || 1;
    petsSet.slice(
        numberOfCards*(currentPage-1), numberOfCards*currentPage
    ).forEach(card => container.appendChild(createCard(card.name, card.img)));
}

displayCardsSet();

function clearPetsContainer() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

let currentContainerWidth = document.body.offsetWidth;

window.addEventListener(`resize`, () => {
    currentContainerWidth = document.body.offsetWidth;

    if (currentContainerWidth >= 1280) {
        if (containerWidth < 1280) {
            setCardsNum(currentContainerWidth);
            displayCardsSet(8, currentPage);
            mobileLinks.style.display = "none";
        }
    } else if (currentContainerWidth >= 768) {
        if (containerWidth <= 767 || containerWidth >= 1280) {
            setCardsNum(currentContainerWidth);
            displayCardsSet(6, currentPage);
            mobileLinks.style.display = "none";
        }
    } else if (currentContainerWidth >= 320) {
        if (containerWidth >= 720) {
            setCardsNum(currentContainerWidth);
            displayCardsSet(3, currentPage);
            mobileLinks.style.display = "flex";
        }
    }

    containerWidth = currentContainerWidth;
});

function enablePrevArrows() {
    firstPageArrow.classList.add("active-pets-arrow");
    firstPageArrow.classList.remove("disabled-pets-arrow");
    prevPageArrow.classList.add("active-pets-arrow");
    prevPageArrow.classList.remove("disabled-pets-arrow");
}

function enableNextArrows() {
    nextPageArrow.classList.add("active-pets-arrow");
    nextPageArrow.classList.remove("disabled-pets-arrow");
    lastPageArrow.classList.add("active-pets-arrow");
    lastPageArrow.classList.remove("disabled-pets-arrow");
}

function disableNextArrows() {
    nextPageArrow.classList.add("disabled-pets-arrow");
    nextPageArrow.classList.remove("active-pets-arrow");
    lastPageArrow.classList.add("disabled-pets-arrow");
    lastPageArrow.classList.remove("active-pets-arrow");
}

function disablePrevArrows() {
    firstPageArrow.classList.add("disabled-pets-arrow");
    firstPageArrow.classList.remove("active-pets-arrow");
    prevPageArrow.classList.add("disabled-pets-arrow");
    prevPageArrow.classList.remove("active-pets-arrow");
}

let currentPage = 1;


nextPageArrow.addEventListener("click", (event) => {
    if (!event.target.classList.contains("disabled-pets-arrow")) {
        console.log("next!");
        currentPage += 1;
        currentPageDiv.innerHTML = currentPage;

        displayCardsSet(cardsNum, currentPage);

        if (currentPage > 1) {
            enablePrevArrows();
        }

        if (currentPage === pagesNum) {
            disableNextArrows();

            enablePrevArrows();
        }
    }
    else console.log("disabled!")
})


prevPageArrow.addEventListener("click", (event) => {
    if (!event.target.classList.contains("disabled-pets-arrow")) {
        console.log("prev!");
        currentPage -= 1;
        currentPageDiv.innerHTML = currentPage;

        displayCardsSet(cardsNum, currentPage);

        if (currentPage < pagesNum) {
            enableNextArrows();
        }


        if (currentPage === 1) {
            enableNextArrows();
            disablePrevArrows();
        }
    }
})

lastPageArrow.addEventListener("click", (event) => {
    if (!event.target.classList.contains("disabled-pets-arrow")) {
        currentPage = pagesNum;
        currentPageDiv.innerHTML = currentPage;

        displayCardsSet(cardsNum, currentPage);

        enablePrevArrows();
        disableNextArrows();
    }
})

firstPageArrow.addEventListener("click", (event) => {
    if (!event.target.classList.contains("disabled-pets-arrow")) {
        currentPage = 1;
        currentPageDiv.innerHTML = currentPage;

        displayCardsSet(cardsNum, currentPage);

        enableNextArrows();
        disablePrevArrows();
    }
})


document.querySelector('.pets-arrow').addEventListener('dblclick', event => {
        event.preventDefault();
});


//mobile-menu
// const mobileMenu = document.querySelector("#mobile-menu");
// const fadeWrapper = document.querySelector("#fade-wrapper");

// if (containerWidth < 768) {
//     mobileLinks.style.display = "flex";
// }
// mobileMenu.addEventListener("click", function(event) {
//     mobileMenu.classList.toggle("rotate");
//     mobileLinks.classList.toggle('open');
//     mobileLinks.classList.toggle('closed');
//     fadeWrapper.classList.toggle("fade-wrapper");
//     console.log("в бургере", mobileLinks.classList)
//     if (mobileLinks.classList.contains('open')) {
//         document.body.style.overflowY = "hidden";
//     } else {
//         document.body.style.overflowY = "scroll";
//     }
//     event.stopPropagation();

// });

// mobileLinks.addEventListener("click", (event) => {
//     if (event.target.classList.contains("header-nav-link")) {
//         mobileLinks.classList.remove('open');
//         mobileMenu.classList.remove('rotate');
//         fadeWrapper.classList.remove("fade-wrapper");
//         document.body.style.overflowY = "scroll";
//     }
//     event.stopPropagation();
// } )

// // Закрытие меню при клике за пределами шторки
// document.addEventListener('click', function(event) {
//     const isClickInside = mobileLinks.contains(event.target);
//     console.log("!!!!!", mobileLinks.classList.contains("open"))
//     if (!isClickInside && mobileLinks.classList.contains("open")) {
//         mobileLinks.classList.remove('open');
//         mobileMenu.classList.remove('rotate');
//         fadeWrapper.classList.remove("fade-wrapper");
//         document.body.style.overflowY = "scroll";
//     }
// });