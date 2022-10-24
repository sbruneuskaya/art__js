const filter = () => {
    // получаем блок-родитель табов со всеми кнопками
    const menu = document.querySelector('.portfolio-menu'),
        itemsLi = menu.querySelectorAll('li'),
        btnAll = menu.querySelector('.all'),
        btnLovers = menu.querySelector('.lovers'),
        btnChef = menu.querySelector('.chef'),
        btnGirl = menu.querySelector('.girl'),
        btnCuy = menu.querySelector('.guy'),
        btnGrandmother = menu.querySelector('.grandmother'),
        btnGranddad = menu.querySelector('.granddad'),
        // получаем блок-родитель контента, который должен отображаться
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        markLovers = wrapper.querySelectorAll('.lovers'),
        markChef = wrapper.querySelectorAll('.chef'),
        markGirl = wrapper.querySelectorAll('.girl'),
        markCuy = wrapper.querySelectorAll('.guy'),
        no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        // markType----передаем коллекцию каких-то элементов, те, что
        // получили через querySelectorAll, и тот параметр по которому идет фильтр

        markAll.forEach(el => {
            el.style.display = 'none';
            el.classList.remove('animated', 'fadeIn')
        })

        no.style.display = 'none'
        no.classList.remove('animated', 'fadeIn')


        //    если мы не передаем markType, то показываем no=document.querySelector('.portfolio-no');----со
        //    строчкой, мы еще не делали таких картин

        if (markType) {
            markType.forEach(el => {
                el.style.display = 'block';
                el.classList.add('animated', 'fadeIn')
            })

            //    если мы не передаем markType, то показываем no=document.querySelector('.portfolio-no');----со
            //    строчкой, мы еще не делали таких картин
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn')
        }
    }

    btnAll.addEventListener('click', () => {
        typeFilter(markAll)
    })

    btnLovers.addEventListener('click', () => {
        typeFilter(markLovers)
    })

    btnChef.addEventListener('click', () => {
        typeFilter(markChef)
    })

    btnGirl.addEventListener('click', () => {
        typeFilter(markGirl)
    })

    btnCuy.addEventListener('click', () => {
        typeFilter(markCuy)
    })

    btnGrandmother.addEventListener('click', () => {
        typeFilter()
    })

    btnGranddad.addEventListener('click', () => {
        typeFilter()
    })

    // на всё меню назначаем обработчик событий(делегирование)
    menu.addEventListener('click', (e) => {
        // let target---тот элемент на котором будет происходить событие и на который кликнули
        let target = e.target

        // далее как и во всех делегированиях устанавливаем условие, проверяем, что таргет вообще существует
        // и определенное условие, в данном случае проверяем что таргет вообще лист айтема
        if(target && target.tagName=="LI"){
            itemsLi.forEach(el=>{
                el.classList.remove('active')
            })

            target.classList.add('active')
        }
    })
}

export default filter;