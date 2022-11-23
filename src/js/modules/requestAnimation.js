// скролл с requestAnimationFrame()

const requestAnimation = (upSelector) => {
    const upElem = document.querySelector(upSelector)
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn')
            upElem.classList.remove('fadeOut')
        } else {
            upElem.classList.add('fadeOut')
            upElem.classList.remove('fadeIn')
        }
    })

    // ищу все ссылки которые начинаются с #(локальные)
    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;

    links.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault()

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0
                        ? Math.max(widthTop - progress / speed, widthTop + toBlock)
                        : Math.min(widthTop + progress / speed, widthTop + toBlock))

                document.documentElement.scrollTo(0, r);

                if(r != widthTop+toBlock){
                    requestAnimationFrame(step)
                }else{
                    location.hash=hash;
                }
            }
        })
    })
}

export default requestAnimation;