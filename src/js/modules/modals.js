const modals = () => {
    // triggerSelector---то, куда кликаем
    // modalSelector---модальное окно
    // closeSelector---закрыть модальное окно
    // destroy---при вызове уничтожает свой триггер (удаляет саму кнопку клика со страницы)

    // переменная btnPressed, задача которой следить была ли нажать хоть какая-нибудь кнопка на странице
    let btnPressed = false;

    function bindModals(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault()
                }

                btnPressed = true;

                if (destroy) {
                    item.remove()
                }


                // закрываем все модалки
                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn')
                })

                modal.style.display = 'block'
                document.body.style.overflow = 'hidden'
                document.body.style.marginRight = `${scroll}px`;
            })
        })

        close.addEventListener('click', () => {
            // закрываем все модалки
            windows.forEach(item => {
                item.style.display = 'none'
            })

            modal.style.display = 'none'
            document.body.style.overflow = ''
            document.body.style.marginRight = `0px`;
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {

                // закрываем все модалки
                windows.forEach(item => {
                    item.style.display = 'none'
                })

                modal.style.display = 'none'
                document.body.style.overflow = ""
                document.body.style.marginRight = `0px`;
            }
        })

    }

    // показывать модалку через какое-то премя и только если другие модалки не открыты
    function showModalByTime(selector, time) {
        setTimeout(function () {

            // сейчас переменная display---undefined и следовательно false
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {

                // getComputedStyle------получает все стили примененные для элемента со всех классов и т.д.
                if (getComputedStyle(item).display !== 'none') {
                    // здесь переменная display уже true
                    display = 'block'
                }
            })

            // если переменная display осталась false, т.е. в первый if условие не попало

            if (!display) {
                document.querySelector(selector).style.display = 'block'
                document.body.style.overflow = 'hidden'
                let scroll = calcScroll()
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }


    // скрипт при открытии модального окна, чтобы контент не прыгал
    function calcScroll() {
        let div = document.createElement('div')

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden'

        document.body.appendChild(div)

        // div.offsetWidth---получаем полную ширину с бордерами и всеми входящими величинами
        // div.clientWidth----включает только падинг и контент и не включается прокрутка
        //  т.е. если мы от полной ширины с прокруткой отнимем ширину без прокрутки, то получим саму прокрутку scrollWidth----ширина прокрутки
        let scrollWidth = div.offsetWidth - div.clientWidth
        div.remove();

        return scrollWidth;

    }


    function openByScroll(selector) {
        // selector-----то, что будем показывать, если произойдет определенное условие

        // определяем сколько пикселей пользователь уже отлистал  с помощью события 'scroll'
        window.addEventListener('scroll', () => {
            // если пользователь не кликнул ни на одну кнопку (!btnPressed) и долистал страницу до конца
            // window.pageYOffset---верхний отступ, то, сколько пользователь отлистал сверху
            // document.documentElement.clientHeight-------------тоот контент, который сейчас виден пользователю
            //document.documentElement.scrollHeight-------полная высота страницы

            // scrollHeight---переменная нужна для поддержки старых браузеров, она возьмет наиболешее значение
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                // принудительно создаём клик
                document.querySelector(selector).click()
            }
        })
    }

    bindModals('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true)
    openByScroll('.fixed-gift')

    // showModalByTime('.popup-consultation', 5000)
}

export default modals;