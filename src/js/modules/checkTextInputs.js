// проверяем, чтобы введенный текст в определенных инпутах был на русском языке

const checkTextInputs=(selector)=>{
const textInputs=document.querySelectorAll(selector)

    textInputs.forEach(el=>{
        // 'keypress'---когда пользователь нажал на определенную клавишу
        el.addEventListener('keypress',function (e){
            // e.key--- значение той клавиши, которую нажал пользователь,
            // считываем введенный символ и с помощью .match() проверяем на соответствие
            // ^---помещаем в начало строки
            // а-яё----берём русский алфавит
            // 0-9---чтобы пользователь мог вводить какие-то цифры
            // ig---поиск во всей строке без привязки к регистру
            if(e.key.match(/[^а-яё 0-9]/ig)){
                e.preventDefault()
            }
        })
    })
}

export default checkTextInputs;