import {postDate} from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
        // использую для очистки инпутов после отправки на сервер
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');


    // для оповещения пользователя об отправке формы
    const message = {
        loading: 'загрузка',
        success: "спасибо! скоро с Вами свяжется нам менеджер!",
        error: "что-то пошло не так",
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'

    }

    const path = {
        designer: 'http://sveta_server',
        question: 'http://sveta_server'
    }


    const clearInputs = () => {
        inputs.forEach(el => {
            el.value = "Файл не выбран"
        })

        upload.forEach(item=>{
            item.previousElementSibling.textContent = ""
        })
    }

    // реализация вывода текста, о том, что что-то загружено, когда пользователь загрузил изображение
    //обработчик события ---'input'---сработает, когда пользователь поместит что-то в поле input(выберет файл)
    upload.forEach(item => {
        item.addEventListener('input', () => {
            // реализация обрезки имени файла, если имя файла больше 7-ми символов, то имя будет обрезаться и прибавлять ...
            let dots;
            const elemArr = item.files[0].name.split('.');
            // 'nameImage.jpg'=>['nameImage', 'jpg']-----так разобьет сплит
            elemArr[0].length > 6 ? dots = '...' : dots = '.';
            let nameElem = elemArr[0].substring(0, 6) + dots + elemArr[1];

            //    в предыдущий див записываем имя получившееся (в див выше инпута)
            item.previousElementSibling.textContent = nameElem
        })
    })

    // перебираем все формы
    form.forEach(item => {
        item.addEventListener("submit", (e) => {
            e.preventDefault()

            // создаем блок в котором будем показывать сообщение в зависимости от статуса
            let statusForm = document.createElement('div');
            statusForm.classList.add('status')
            item.parentNode.appendChild(statusForm)

            item.classList.add('animated', 'fadeOutUp')

            setTimeout(() => {
                item.style.display = 'none'
            }, 400)

            let statusImg = document.createElement('img')
            statusImg.setAttribute('src', message.spinner)
            statusImg.classList.add('animated', 'fadeInUp')
            statusForm.appendChild(statusImg)

            let textMessage = document.createElement('div')
            textMessage.textContent = message.loading
            statusForm.appendChild(textMessage)

            // собираю все данные которые есть в форме, это и будет тело запроса
            const formDate = new FormData(item)

            let api;

            // .closest()--------этот метод попробует найти определенный блок по селектору у себя выше по иерархии
            //     и если он есть, то вернёт блок, если нет-вернут false
            // и следовательно, если модалка содержит картинку, то отправляем на path.designer, если нет то на path.question
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question


            // отправляем запрос на сервер по адресу 'assets/server.php' с данными которые хранятся в formDate
            postDate(api, formDate)
                // сейчас вернулся какой-то текст return await res.text()
                .then(res => {
                    console.log(res)

                    statusImg.setAttribute('src', message.ok)
                    textMessage.textContent = message.success
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail)
                    textMessage.textContent = message.error
                })
                // finally выполнится независимо от результата, нужен для очистки инпутов + удалить статус-сообщение через какой-то время
                .finally(() => {
                    clearInputs()
                    setTimeout(() => {
                        statusForm.remove()
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp')
                        item.classList.add('fadeInUp')
                    }, 6000)
                })
        })
    })
}

export default forms;