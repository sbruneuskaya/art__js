// отправка данных на сервер через fetch(который вернет promise и его нужно будет обработать)
const postDate = async (url, data) => {
    // с помощью await в переменную res будет записан промис, который вернется от сервера,
    // если бы без async await, в res был бы андефайнд, потому что код бы пошелработать дальше не дождавшись ответа
    let res = await fetch(url, {
        method: "POST",
        body: data
    })

    // обработка промиса
    return await res.text()
}

// отправка данных на сервер через fetch(который вернет promise и его нужно будет обработать)
const getResource = async (url) => {
    // с помощью await в переменную res будет записан промис, который вернется от сервера,
    // если бы без async await, в res был бы андефайнд, потому что код бы пошелработать дальше не дождавшись ответа
    let res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    // обработка промиса
    return await res.json()
}

export {postDate, getResource};