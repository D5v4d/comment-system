"use strict";
class SendingComment {
    storage;
    textarea;
    constructor(storage) {
        this.storage = storage;
        this.textarea = this.storage.element.textarea;
        this.maxSymbol();
        this.texteriaHeight();
    }
    maxSymbol() {
        this.textarea.onkeyup = () => {
            let btn = document.querySelector(".btn__comment");
            let quantity = document.querySelector(".quantity__characters");
            let quantitysumbol = this.textarea.value.length;
            if (quantitysumbol) {
                if (quantitysumbol > 0) {
                    quantity.innerHTML = `${quantitysumbol}/1000`;
                    if (quantitysumbol > 1000) {
                        quantity.style.color = "red";
                    }
                    else {
                        quantity.style.color = "";
                    }
                }
                else {
                    quantity.innerHTML = "Макс. 1000 символов";
                    quantity.style.color = "";
                }
                if (quantitysumbol > 0 && quantitysumbol <= 1000) {
                    btn.classList.add(`active`);
                }
                else {
                    btn.classList.remove(`active`);
                }
            }
        };
    }
    texteriaHeight() {
        if (this.textarea)
            this.textarea.addEventListener("input", function () {
                this.style.height = `0`;
                this.style.height = `${this.scrollHeight}px`;
            });
    }
}
