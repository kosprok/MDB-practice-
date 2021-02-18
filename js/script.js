'use strict';

// для того щоб наш JS код виконувався правильно, 
// спочатку має прогрузитись вся DOM структура сторінки (ХТМЛ), і тільки після цього запускаються скрипти.
// для цього ми навішуєм цей лістенер DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Ліга Справедливості",
            "Ла-ла ленд",
            "Одержимість",
            "Скотт Пілігрим проти..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img');
    const bg = document.querySelector('.promo__bg');
    const genre = bg.querySelector('.promo__genre');
    const movieList = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('form.add');
    const addInput = addForm.querySelector('.adding__input');
    const checkbox = addForm.querySelector('[type="checkbox"]');

    // 6) Страница не должна перезагружаться.
    //    Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - новый фильм добавляется в список. 
    //    Новый фильм должен добавляться в movieDB.movies.
    //    Для получения доступа к значению input - обращаемся к нему как input.value;
    //    Вкінці, після відправки форми, нам потрібно також щоб форма автоматично очистилась.
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favourite = checkbox.checked;

        // для того щоб форма не відправлялась пустою, обгортаєм нижні строчки в умову
        if (newFilm) {

            // 7) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 20)}...`;

            }

            // 9) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: "Добавляем любимый фильм"
            if (favourite) {
                console.log('Додаємо улюблений фільм');
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList);   
        }

        event.target.reset();

    });
    // також частково модифікуєм (уніфікуєм) функцію з п.5 щоб все працювало тут
    
    // 1) Удалить все рекламные блоки со страницы (правая часть сайта)
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };
  
    // 2) Изменить жанр фильма, поменять "комедия" на "драма"
    const makeChanges = () => {
        genre.textContent = 'драма';
    
        // 3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
        bg.style.backgroundImage = `url('img/bg.jpg')`;
    };
        
    // 4) Список фильмов на странице сформировать на основании данных из этого JS файла.
    // 5) Добавить нумерацию выведенных фильмов
    // 4 + 10) Отсортировать их по алфавиту
    const sortArr = (arr) => {
        arr.sort();
    };

    // для повторного використання в 6 пункті, обертаєм в функцію createMovieList і трохи модифікуєм для уніфікації (33 урок)
    function createMovieList(films, parent) {
        parent.innerHTML = "";
        // 10) для того щоб коректно працювало сортування після видалення/додав фільмів приписуєм ще додатково тут фукц.
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML = movieList.innerHTML + `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        // 8) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                // після видалення 1+ фільму, для того щоб цифри в списку правильно відображалисьт по порядку ще раз визиваєм цю ж функцію (рекурсія)
                createMovieList(films, parent);
            });
        });




    }



    deleteAdv(adv);
    makeChanges();
    // при першій загрузці сторнки потрібно викликати цю фунцію щоб зразу все працювало
    createMovieList(movieDB.movies, movieList);

});