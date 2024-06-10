const form = document.querySelector('#form');
const input = document.querySelector('#input-city');
const apiKey = '84a77d98ccd748b494a30356241006';
const header = document.querySelector('.header');

// Отправка формы 

form.onsubmit = function (e) {
    // Отменяем отправку формы
    e.preventDefault();

    // Береме значение из инпута и обрезаем пробелы
    let city = input.value.trim();
    //Адрес запроса 
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    // Выполняем запрос
    fetch(url)
    .then((response) =>{
        return response.json();
    })
    .then((data) => {
        console.log(data);

        // Проверка на ошибку 
        if (data.error) {
        //Удаляем предыдущие карточки 
        const prevCard = document.querySelector('.card');
        if (prevCard) prevCard.remove();
            
        // Если ошибка, выводим ее
        const html = `<div class='card'>${data.error.message}</div>`;


        header.insertAdjacentHTML('afterend',html); 

        } else {
        //Удаляем предыдущие карточки 
        const prevCard = document.querySelector('.card');
        if (prevCard) prevCard.remove();
    // Разметка для карточки 
        const html = `<div class="card">
            <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>  
            <div class="card-weather">
                <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                <img class="card-img" src="./img/example.png" alt="weather">
            </div>
            <div class="card-description">${data.current.condition.text}</div>  
        </div>;`    
        // Отображаем карточку на странице
        header.insertAdjacentHTML('afterend',html); 
        }

    // Отображаем полученные данные в карточке
    });
}