import {getResource} from "../services/requests";


const showMoreStyles = (trigger, wrapper) => {
    // trigger---кнопка, на которую нужно нажать, чтобы подгрузились стили
    //     styles--те элементы, которые должны подгрузиться

    // let cards = document.querySelectorAll(styles)

    let btn = document.querySelector(trigger)
    // cards.forEach(el => {
    //     el.classList.add('animated', 'fadeInUp')
    // });
    //
    // btn.addEventListener('click', () => {
    //     cards.forEach(el => {
    //         el.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs')
    //         el.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1')
    //     });
    //
    //     btn.remove();
    // })

    // в addEventListener после 'click' нельзя использовать стрелочную функцию,
    // из-за this.remove()---потому что this в стрелочной не сработает, потому используется function
    btn.addEventListener('click', function () {
        // получение даных локально из проекта
        // getResource('assets/db.json')
        //     .then(res => createCards(res.styles))
        //     .catch(error=> console.log(error))


        // получение даных из базы данных (от сервера)
        getResource('http://localhost:3000/styles')
            // сервер нам возвращает массив и этот массив мы передаем в функцию createCards
            .then(res => createCards(res))
            .catch(error=> console.log(error))

        this.remove()
    })

    function createCards(response) {
        // response---это массив который пришел от сервера и теперь каждый элемент перебирается через форич
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div')
            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1')

            card.innerHTML = `
            <div class="styles-block">
                <img src=${src} alt="style">
                <h4>${title}</h4>
                <a href=${link}>Подробнее</a>
            </div>
            `
            document.querySelector(wrapper).appendChild(card)
        })
    }
}

export default showMoreStyles;