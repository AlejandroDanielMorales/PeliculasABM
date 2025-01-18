const movies = [
    {
        id: 1,
        title: 'The Godfather',
        genre: 'Drama',
        date: new Date(1972, 0, 1), // Año, mes (0 = Enero), día
        score: 5,
        image: 'https://play-lh.googleusercontent.com/ZucjGxDqQ-cHIN-8YA1HgZx7dFhXkfnz73SrdRPmOOHEax08sngqZMR_jMKq0sZuv5P7-T2Z2aHJ1uGQiys'
    },
    {
        id: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        date: new Date(1994, 0, 1),
        score: 2,
        image: 'https://i5.walmartimages.com/asr/5003a7b8-81c5-4803-beee-df5417f06bbe.1f75ffb05ff4e640f976691214312d6a.jpeg'
    },
    {
        id: 3,
        title: 'The Dark Knight',
        genre: 'Action',
        date: new Date(2008, 0, 1),
        score: 4,
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg'
    },
    {
        id: 1003,
        title: 'The Gladiator',
        genre: 'Action',
        date: new Date(2000, 0, 1),
        score: 4,
        image: 'https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_.jpg'
    },
    {
        id: 1004,
        title: 'Inception',
        genre: 'Action',
        date: new Date(2010, 0, 1),
        score: 5,
        image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'
    },
    {
        id: 1005,
        title: 'Django Unchained',
        genre: 'Western',
        date: new Date(2012, 0, 1),
        score: 3,
        image: 'https://pics.filmaffinity.com/Django_desencadenado-956246347-large.jpg'
    },
    {
        id: 1006,
        title: 'World War Z',
        genre: 'Horror',
        date: new Date(2013, 0, 1),
        score: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfbdyQYt18ILy67f55TBL9KiPk_42jViTY-3ZE9_RwhVA3vQ8hE0lCzHxNKTP3NWLm1l0&usqp=CAU'
    }
];
let isEditando = null;

// Inicializar la tabla con las películas iniciales
updateMovieTable(movies);

// Manejar el envío del formulario de registro de películas
document.getElementById('movieForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = event.target.elements;

    if (!isEditando) {
        // Si no estamos editando, agregar una nueva película
        const movie = {
            id: new Date().getTime(), // Usamos un id único basado en el tiempo
            title: formData.title.value,
            image: formData.image.value,
            genre: formData.genre.value,
            date: new Date(formData.releaseDate.value),
            score: formData.rating.value
        };

        movies.push(movie); // Agregar la nueva película al array

    } else {
        // Si estamos editando, actualizamos la película existente
        const movie = {
            id: isEditando, // Usamos el id de la película para mantenerlo constante
            title: formData.title.value,
            image: formData.image.value,
            genre: formData.genre.value,
            date: new Date(formData.releaseDate.value),
            score: formData.rating.value
        };

        // Encuentra el índice de la película y actualiza solo esa película
        const movieIndex = movies.findIndex(movie => movie.id === isEditando);
        movies[movieIndex] = { ...movies[movieIndex], ...movie }; // Actualiza el objeto sin reemplazar todo el array
        isEditando = null; // Reseteamos el estado de edición
        const btnForm = document.getElementById("btnForm");
        btnForm.innerText = "Registrar película";
    }

    updateMovieTable(movies); // Actualiza la tabla con las películas
    event.target.reset(); // Resetea el formulario después del submit
});
// Actualizar la tabla con las películas proporcionadas

const openButtons = document.querySelectorAll('.open-btn'); // Selecciona todos los botones
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close-btn');
const modalBody = document.querySelector('.modal-body');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'flex';

        setTimeout(() => {
            modal.classList.add('show');
        }, 10); // Corto retraso para que la clase se aplique después de que el modal sea visible
    });
});

// Ocultar el modal quitando la clase "show"
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400); // El tiempo debe coincidir con la duración de la transición
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    }
});
function updateMovieTable(peliculas) {
    const tableBody = document.getElementById('movieTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de actualizar

    peliculas.forEach(movie => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="${movie.image}" alt="${movie.title}" style="width: 100px;"/></td>
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.date.toISOString().split('T')[0]}</td>
            <td>${movie.rating || movie.score}</td>
            <td class="acciones">
                <button class="edit-btn" style="background: none; border: none; cursor: pointer;" onclick="editarPelicula(${movie.id})">
                    <i class="fa fa-pencil" style="color: blue; font-size: 18px;"></i>
                </button>

                <button class="open-btn" style="background: none; border: none; cursor: pointer;" onclick="mostrarDetalle(${movie.id})">
                    <i class="fa fa-eye" style="color: green; font-size: 18px;"></i>
                </button>
                <button class="delete-btn" style="background: none; border: none; cursor: pointer;" onclick="borrarPelicula(${movie.id})">
                    <i class="fa fa-trash" style="color: red; font-size: 18px;"></i>
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
    
const openButtons = document.querySelectorAll('.open-btn'); // Selecciona todos los botones
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close-btn');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'flex';

        setTimeout(() => {
            modal.classList.add('show');
        }, 10); // Corto retraso para que la clase se aplique después de que el modal sea visible
    });
});

// Ocultar el modal quitando la clase "show"
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400); // El tiempo debe coincidir con la duración de la transición
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    }
});
   
}

function mostrarDetalle(peliculaId) {

    const movie = movies.find(pelicula => peliculaId === pelicula.id);
    modalBody.innerHTML = '';
    modalBody.innerHTML = ` <div><img src="${movie.image}" alt="${movie.title}" style="width: 100px;"/></div>
            <label>${movie.title}</label>
            <strong>${movie.genre}</strong>
            <h2>${movie.date.toISOString().split('T')[0] }</h2>
            <h3>${movie.rating || movie.score}</h3>`;

}



function borrarPelicula(peliculaId) {
    console.log(peliculaId)

    const index = movies.findIndex(pelicula => peliculaId === pelicula.id)

    const isConfirm = confirm("Desea borrar la pelicula?");
    const formData = document.getElementById('movieForm');

    if (isConfirm) {
        movies.splice(index, 1)
        updateMovieTable(movies)
    }
    formData.reset();

}
// Manejar la búsqueda de películas
document.getElementById('resource-bar').addEventListener('input', function (event) {
    event.preventDefault();

    const searchText = document.getElementById('prompt').value.toLowerCase();

    const filteredMovies = movies.filter((movie) => {
        movie.title.toLowerCase().includes(searchText) || movie.genre.toLowerCase().includes(searchText)
    }
    );

    updateMovieTable(filteredMovies);
});

// Referenciar los botones de ordenación
const ascTableNameBtn = document.querySelector('.ascBtn');
const descTableNameBtn = document.querySelector('.descBtn');

// Función para ordenar de forma ascendente
ascTableNameBtn.addEventListener('click', () => {
    const sortedMovies = [...movies].sort((a, b) => a.score - b.score); // Ordena por score ascendente
    updateMovieTable(sortedMovies); // Actualiza la tabla con las películas ordenadas
});

// Función para ordenar de forma descendente
descTableNameBtn.addEventListener('click', () => {
    const sortedMovies = [...movies].sort((a, b) => b.score - a.score); // Ordena por score descendente
    updateMovieTable(sortedMovies); // Actualiza la tabla con las películas ordenadas
});
function editarPelicula(id) {
    const btnForm = document.getElementById("btnForm");
    btnForm.innerText = "Editar";

    // Buscar la película a editar
    const pelicula = movies.find(peli => peli.id === id);
    isEditando = id; // Asignar el id de la película que se está editando

    const formData = document.getElementById('movieForm');

    // Llenar el formulario con los datos de la película
    formData.title.value = pelicula.title;
    formData.genre.value = pelicula.genre;
    formData.image.value = pelicula.image;
    formData.releaseDate.value = pelicula.date.toISOString().split('T')[0]; // Asegúrate de convertir la fecha correctamente
    formData.rating.value = pelicula.score;

}
