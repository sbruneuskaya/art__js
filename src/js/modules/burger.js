const burger = (menu, burgerSelector) => {
    const menuElem = document.querySelector(menu),
        burgerElem = document.querySelector(burgerSelector);

    menuElem.style.display = 'none';
    burgerElem.addEventListener('click', () => {
    // .availWidth---возвращает ширину экрана пользователя служащую непосредственно для вывода информации
        // (т.е. ширина без размера таких элементов браузера как панель задач, полоса прокрутки и т.д.).
        if (menuElem.style.display == 'none' && window.screen.availWidth<993) {
            menuElem.style.display = 'block';
        }else{
            menuElem.style.display='none';
        }


        // 'resize'------отслеживание события, когда пользователь меняет ширину окна браузера
        window.addEventListener('resize', ()=>{
            if(window.screen.availWidth>992){
                menuElem.style.display='none';
            }
        })
    })
}

export default burger;