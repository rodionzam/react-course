function cards() {
    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // ПЕРВЫЙ ВАРИАНТ

    // class MenuCard {
    //     constructor(src, alt, title, description, price, parentSelector, ...classes) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.description = description;
    //         this.price = price;
    //         this.classes = classes;
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 62;
    //         this.changeToRUB();
    //     }
    //
    //     changeToRUB() {
    //         this.price = this.price * this.transfer;
    //     }
    //
    //     render() {
    //         const element = document.createElement('div');
    //
    //         if (this.classes.length === 0) {
    //             this.classes = "menu__item";
    //             element.classList.add(this.classes);
    //         } else {
    //             this.classes.forEach(className => element.classList.add(className));
    //         }
    //
    //         element.innerHTML = `
    //             <img src=${this.src} alt=${this.alt}>
    //             <h3 class="menu__item-subtitle">${this.title}</h3>
    //             <div class="menu__item-descr">${this.description}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
    //             </div>
    //         `;
    //         this.parent.append(element);
    //     }
    // }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });


    // ВТОРОЙ ВАРИАНТ

    getResource('http://localhost:3000/menu')
        .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div'),
                newPrice = price * 62;

            element.classList.add('menu__item');

            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${newPrice}</span> руб/день</div>
                </div>
            `;

            document.querySelector('.menu .container').append(element);
        });
    }
}

module.exports = cards;