const sliders = (slides, dir, prev, next) => {
    // текущий слайд
    let slideIndex = 1;
    let paused = false;
    const items = document.querySelectorAll(slides)

    // отвечает за перемещение слайд-индекса и самого слайдера соответственно
    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none'
        })

        items[slideIndex - 1].style.display = 'block'
    }

    showSlides(slideIndex)

    function changeSlide(n) {
        showSlides(slideIndex += n)
    }


    // prevBtn и nextBtn поместили в try, чтобы на случай, если их нет, то не было ошибок
    try {
        const prevBtn = document.querySelector(prev)
        const nextBtn = document.querySelector(next)

        prevBtn.addEventListener('click', () => {
            changeSlide(-1)
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        })

        nextBtn.addEventListener('click', () => {
            changeSlide(1)
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        })
    } catch (e) {

    }

    // если пользователь навел мышкой на слайд, то он сетинтервал не должен срабатывать(автоплей)
    // для этого переменной paused нужно передать значение уникального идентификатора, который возвращает setInterval
    function activatedAnimation(){
        if (dir === 'vertical') {
           paused= setInterval(function () {
                changeSlide(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000)
        } else {
            paused=setInterval(function () {
                changeSlide(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000)
        }
    }

    activatedAnimation()

    items[0].parentNode.addEventListener('mouseenter', ()=>{
        clearInterval(paused)
    })

    items[0].parentNode.addEventListener('mouseleave', ()=>{
        activatedAnimation()
    })

}

export default sliders;