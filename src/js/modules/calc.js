const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

    let sum = 0;

    const calcFunc = () => {
        // функция рассчета, которую даёт заказчик, сейчас берем размер холста, умножаем на
        // коэффициент материала и добавляю дополнительные опции, если нужно
        //Math.round()---округляем
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value))

        if (sizeBlock.value == "" || materialBlock.value == "") {
            resultBlock.textContent = 'Выберите размер и материал картины'
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7)
        } else {
            resultBlock.textContent = sum
        }
    }

    sizeBlock.addEventListener('change',calcFunc);
    materialBlock.addEventListener('change',calcFunc);
    optionsBlock.addEventListener('change',calcFunc);
    promocodeBlock.addEventListener('input',calcFunc);
};

export default calc;
