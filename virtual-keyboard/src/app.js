import './scss/main.scss';
console.log('Hello, SASS');
console.log('Hello, HTML');


const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const keyboardText = $(".keyboard__text");
const keyboardToggle = $(".keyboard-toggle");
const keyboardButtonClose = $(".keyboard__button-close");
const keyboardKeys = $(".keyboard__keys");
const keyboardLanguage = $(".language");

const keyboardKey = $$(".key");
const keyboardSymbols = $$(".key:not([data-action])")

let capsLock = false;
let shift = false;


const initKeyboard = () => {
    keyboardToggle.addEventListener("click", () => {
        keyboardToggle.classList.add("hidden");
        keyboardKeys.classList.toggle("hidden");
    });
}


const showText = () => {
    keyboardSymbols.forEach(el => {
        el.addEventListener("mousedown", () => {
            console.log(el.textContent)
            keyboardText.textContent += el.textContent
        })
    })
};


const serviceButtons = () => {
    keyboardKeys.addEventListener("click", (event) => {
        const action = event.target.dataset.action || event.target.parentNode.dataset.action;
        switch (action) {
            case "clearAll":
                keyboardText.textContent = "";
                break;
            case "backspace":
                keyboardText.textContent = keyboardText.textContent.slice(0, -1);
                break;
            case "space":
                keyboardText.textContent += " ";
                break;
            case "enter":
                keyboardText.textContent += "\n";
                break;
        };
    })
};


const toggleLanguage = () => {
    keyboardLanguage.addEventListener("click", () => {
        switch (keyboardLanguage.textContent) {
            case "en":
                keyboardLanguage.textContent = "ru";
                break;
            case "ru":
                keyboardLanguage.textContent = "en";
                break;
        }
        activateLanguage();
        activateCapsLock();
        activateShift();
    })
};


const activateLanguage = () => {
    let lang = keyboardLanguage.textContent;
    keyboardKey.forEach(el => {
        if (el.dataset[lang]) {
            el.textContent = el.dataset[lang];
        }
    })
}


const toggleShift = () => {
    keyboardKeys.addEventListener("click", (event) => {
        const action = event.target.dataset.action || event.target.parentNode.dataset.action;
        switch (action) {
            case "shift":
                shift = !shift;
                break;
            case "capsLock":
                capsLock = !capsLock;
                break;
            default:
                if (shift) {
                    shift = !shift;
                }
        };
        console.log(capsLock, shift)
        activateCapsLock();
        activateShift();
    })
};


const activateShift = () => {
    if (shift) {
        let lang = keyboardLanguage.textContent;
        let param = 'shift' + lang.slice(0, 1).toUpperCase() + lang.slice(1);
        keyboardSymbols.forEach(el => {
            if (el.dataset[param]) el.textContent = el.dataset[param];
        })
    } else {
        keyboardSymbols.forEach(el => {
            if (el.dataset.nonShift) {
                el.textContent = el.dataset.nonShift;
            }
        })
    };
    indicatorShift();
};


const activateCapsLock = () => {
    if (shift && capsLock) {
        keyboardSymbols.forEach(el => {
            el.textContent = el.textContent.toLowerCase();
        })
    } else if (capsLock) {
        keyboardSymbols.forEach(el => {
            el.textContent = el.textContent.toUpperCase();
        })
    } else if (shift) {
        keyboardSymbols.forEach(el => {
            el.textContent = el.textContent.toUpperCase();
        })
    } else {
        keyboardSymbols.forEach(el => {
            el.textContent = el.textContent.toLowerCase();
        })
    };
    indicatorCapsLock();
};



const indicatorShift = () => {
    if (shift && capsLock) {
        keyboardKeys.querySelector(".shift-toggle").classList.add("keyboard-toggle-shift-reverse");
    } else if (shift) {
        keyboardKeys.querySelector(".shift-toggle").classList.add("shift-toggle-active");
    } else {
        keyboardKeys.querySelector(".shift-toggle").classList.remove("keyboard-toggle-shift-reverse");
        keyboardKeys.querySelector(".shift-toggle").classList.remove("shift-toggle-active");
    }
};

const indicatorCapsLock = () => {
    if (capsLock) {
        keyboardKeys.querySelector(".capsLock-toggle").classList.add("shift-toggle-active");
        keyboardKeys.querySelector(".keyboard__button-caps-up").classList.add("hidden");
        keyboardKeys.querySelector(".keyboard__button-caps-down").classList.remove("hidden");

    } else {
        keyboardKeys.querySelector(".capsLock-toggle").classList.remove("shift-toggle-active");
        keyboardKeys.querySelector(".keyboard__button-caps-up").classList.remove("hidden");
        keyboardKeys.querySelector(".keyboard__button-caps-down").classList.add("hidden");
    }
};


const hideKeyboard = () => {
    keyboardButtonClose.addEventListener("click", () => {
        keyboardToggle.classList.remove("hidden");
        keyboardToggle.classList.remove("keyboard-toggle-active");
        keyboardKeys.classList.add("hidden");

        document.addEventListener("keydown", (event) => {
            if (event.keyCode === 27) {
                keyboardKeys.classList.add("hidden");
            }
        })
    })
};


// Run
initKeyboard();
hideKeyboard();
showText();
serviceButtons();
toggleLanguage();
toggleShift();