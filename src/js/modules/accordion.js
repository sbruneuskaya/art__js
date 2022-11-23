const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(item=>{
        item.addEventListener('click', function (){
            this.classList.toggle('active-style')
            this.nextElementSibling.classList.toggle('active-content')

            if (this.classList.contains('active-style')){

                // scrollHeight----показывает высоту контента, который содержится внутри элемента
                //80--padding
                this.nextElementSibling.style.maxHeight=this.nextElementSibling.scrollHeight + 80 + 'px'
            }else{
                this.nextElementSibling.style.maxHeight='0px'
            }
        })
    })


    // для работы со стилями
        // blocks = document.querySelectorAll(itemsSelector);

    // blocks.forEach(el=>{
    //     el.classList.add('animated', 'fadeInDown')
    // })
    //
    // btns.forEach(item=>{
    //     item.addEventListener('click', function (){
    //         // если у элемента на который нажал пользователь нет класса активности
    //         if(!this.classList.contains('active')){
    //             btns.forEach(item=>{
    //                 item.classList.remove('active', 'active-style')
    //             })
    //             this.classList.add('active', 'active-style')
    //         }
    //     })
    // })
}

export default accordion;