const drop = () => {
    //    dragenter---объект над droparea
    //    dragleave---объект за пределами droparea
    //    dragover---объект зависает над droparea
    //    drop---пользователь отпустил мышку и объект упал в droparea

    const fileInput = document.querySelectorAll('[name="upload"]');
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInput.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false)
        })
    })

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid red'
        item.closest('.file_upload').style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
    }

    function unHighlight(item) {
        item.closest('.file_upload').style.border = 'none'

        if(item.closest('.calc_form')){
            item.closest('.file_upload').style.backgroundColor = '#fff'
        }else{
            item.closest('.file_upload').style.backgroundColor = '#ededed'
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInput.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false)
        })
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInput.forEach(input => {
            input.addEventListener(eventName, () => unHighlight(input), false)
        })
    });

    fileInput.forEach(input=>{
        input.addEventListener('drop', (e)=>{
            input.files=e.dataTransfer.files;

            let dots;
            const elemArr = input.files[0].name.split('.');
            // 'nameImage.jpg'=>['nameImage', 'jpg']-----так разобьет сплит
            elemArr[0].length > 6 ? dots = '...' : dots = '.';
            let nameElem = elemArr[0].substring(0, 6) + dots + elemArr[1];

            //    в предыдущий див записываем имя получившееся (в див выше инпута)
            input.previousElementSibling.textContent = nameElem
        })
    } )
}

export default drop;