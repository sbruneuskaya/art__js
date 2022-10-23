const mask = (selector) => {
    let setCursorPosition = (pos, elem) => {
        // для начала устанавливаем фокус на элементе
        elem.focus()
        // .setSelectionRange() ---станавливает начальное и конечное положение выделения текста
        // в элементе вручную но старые браузеры этот метод не поддерживают потому пишем проверку если елемент
        // поддерживает этот метод, то пусть его  вызовет, если нет то .createTextRange(для интернет эксплоера)
        if (elem.setSelectionRange) {
            // (pos, pos)----если 2 раза указать один и тот же элемент, то мы просто поставим курсор в определённую позицию
            elem.setSelectionRange(pos, pos)
        }else if(elem.createTextRange){
            // createTextRange---тот же setSelectionRange, но для интернет эксплоера
            // let range---создаем диапазон который нужно выделить
            let range=elem.createTextRange()

            range.collapse(true) //объединяет границы диапазона
            range.moveEnd('character', pos)
            range.moveStart('character', pos)
            range.select() //установим курсор
        }

    }

    function createMask() {
        let matrix = '+375 (__) ___ __ __';
        let i = 0;
        let def = matrix.replace(/\D/g, '');
        let val = this.value.replace(/\D/g, '');


        // если пользователь начнет удалять +375, то мы ему это делать не разрешим
        if (def.length >= val.length) {
            val = def
        }

        // this.value----это то значение, которое ввел пользователь
        //с помощью matrix.replace()нужно перебрать все символы, которые находятся в матрице
        // при заполнении пользователем нижнее подчеркивание удаляется, а скобки остаются
        //следовательно нужно пройти по каждому элементу матрицы и там где нужно заменить значение на определенное вэлью
        // а там где не нужно оставить то значение, которое уже есть(например скобочки) и нижнее подчёркивание,
        // которое еще не заполнено


        // передаем вторым аргументом функцию, которая выполнится для каждого символа matrix
        // /./g-----пегулярное выражение, которое ищет каждый символ
        this.value = matrix.replace(/./g, function (a) {
            // формирую строку, которою покажем пользователю

            // проверяем каждый символ является ли он тем элементом, который входит в определенный диапозон
            // /[_\d]/---------цифры класс d--цифры
            // /[_\d]/.test(a)--------.test(a)--метод регулярного выражения,
            // который проверяет введенный символ на то цифра ли он и вернет нам либо true либо false
            // charAt()----возвращает указанный символ из строки
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        })

        // event.type==='blur'-----пользователь перестал что-то вводить
        // если пользователь ничего не ввел и убрал курсор, то нужно очестить форму,
        // если нажал на инпут с маской. то нужно установить курсор в определенное положение
        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = ''
            }
        } else {

            // this---ссылка на тот элемент, который сейчас в работе
            // this.value.length---колличество символов, которое есть сейчас в инпуте
            setCursorPosition(this.value.length, this)
            {

            }
        }
    }

    let inputs = document.querySelectorAll(selector)

    inputs.forEach(el=>{
        el.addEventListener('input', createMask);
        el.addEventListener('focus', createMask);
        el.addEventListener('blur', createMask);
    })
}

export default mask;