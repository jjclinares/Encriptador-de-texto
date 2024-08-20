/*seleccionar elementos HTML por su etiqueta, clase o ID.*/

// Selección de Elementos HTML
const textArea = document.querySelector('#areaTexto');
const buttonEncrypt = document.querySelector('.encrypt');
const buttonDecrypt = document.querySelector('.decrypt');
const resultArea = document.querySelector('#result');
const copyButton = document.querySelector('.copy');
const selectTema = document.getElementById('header__tema');
const link = document.getElementById('theme-link');


// Obtiene el Texto del TextArea
function obtenerTexto() {
    let texto = textArea.value.trim();
    if (!texto) {
        alert('Por favor, ingresa un texto.');
        return null;
    }
    return texto;
}

// Muestra el Resultado en el TextArea de Resultado
function mostrarResultado(texto) {
    resultArea.textContent = texto;
}

// Encriptar texto iterando por carácter
function encriptar(texto) {
    if (typeof texto !== 'string' || !/^[a-z\s]+$/.test(texto)) {
        //  :^[a-z]+$: Coincide con cadenas que consisten únicamente en letras minúsculas sin acentos.
        //  \s:espacios.
        //  /.test(texto): Comprueba si texto cumple con esta condición.
        //  !: Invierte el resultado. si texto contiene algo que no sea letras minúsculas sin acentos,
        //  el resultado será true. 
        alert('Por favor, digite solo letras minúsculas y sin acentos');
        return;
    } else {
        let textoEncriptado = '';
        for (let char of texto) {
            switch (char) {
                case 'a':
                    textoEncriptado += 'ai';
                    break;
                case 'e':
                    textoEncriptado += 'enter';
                    break;
                case 'i':
                    textoEncriptado += 'imes';
                    break;
                case 'o':
                    textoEncriptado += 'ober';
                    break;
                case 'u':
                    textoEncriptado += 'ufat';
                    break;
                default:
                    textoEncriptado += char;
                    break;
            }
        }
    mostrarResultado(textoEncriptado);
    }
}

// Desencripta texto iterando por carácter
function desencriptar(texto) {
    let textoDesencriptado = '';
    for (let i = 0; i < texto.length; i++) {
        if (texto.startsWith('ai', i)) {
            textoDesencriptado += 'a';
            i += 1; // Saltar los caracteres ya procesados
        } else if (texto.startsWith('enter', i)) {
            textoDesencriptado += 'e';
            i += 4;
        } else if (texto.startsWith('imes', i)) {
            textoDesencriptado += 'i';
            i += 3;
        } else if (texto.startsWith('ober', i)) {
            textoDesencriptado += 'o';
            i += 3;
        } else if (texto.startsWith('ufat', i)) {
            textoDesencriptado += 'u';
            i += 3;
        } else {
            textoDesencriptado += texto[i];
        }
    }
    mostrarResultado(textoDesencriptado);
}

// Eventos de los Botones de Encriptar y Desencriptar
buttonEncrypt.addEventListener('click', () => {
    const texto = obtenerTexto();
    if (texto) {
        encriptar(texto);
    }
});

buttonDecrypt.addEventListener('click', () => {
    const texto = obtenerTexto();
    if (texto) {
        desencriptar(texto);
    }
});

// Copiar el texto al portapapeles
function copiarTexto() {
    navigator.clipboard.writeText(resultArea.textContent)
        .then(() => mostrarAlerta('Texto copiado al portapapeles'))
        .catch(err => console.log('Error al copiar:', err));
}
copyButton.addEventListener('click', copiarTexto);


// Usar el servidor LanguageTool
window.addEventListener('load', function() {
    const editor = new window.LanguageToolEmbed({
    container: document.getElementById('areaTexto'),
    apiUrl: 'https://api.languagetoolplus.com'
    });
editor.on('update', function(status) {
    const toolbar = document.querySelector('.lt-toolbar');
    if (status.errorCount > 0) {
        toolbar.classList.remove('status-icon--has-no-errors');
        toolbar.classList.add('status-icon--has-errors');
        toolbar.setAttribute('title', `${status.errorCount} errores encontrados`);
    } else {
        toolbar.classList.remove('status-icon--has-errors');
        toolbar.classList.add('status-icon--has-no-errors');
        toolbar.setAttribute('title', 'No se encontraron errores');
    }
    });
});

// Función para Cambiar de Tema (Claro/Oscuro)
function cambiarTema() {
    const temaSeleccionado = selectTema.value;
    
    if (temaSeleccionado === 'dark') {
        link.href = './styles/darkStyle.css'; 
        document.getElementById('videoBackground').querySelector('source').src = './assets/darkThemeVideo.mp4';
        localStorage.setItem('theme', 'dark'); // Guarda la preferencia en localStorage
    } else {
        link.href = './styles/style.css'; 
        document.getElementById('videoBackground').querySelector('source').src = './assets/lightThemeVideo.mp4'; 
        localStorage.setItem('theme', 'light'); // Guarda la preferencia en localStorage
    }
    
    document.getElementById('videoBackground').load(); // Recarga el video
}

// Inicializa el tema basado en la preferencia guardada o el tema predeterminado (light)
function inicializarTema() {
    const temaGuardado = localStorage.getItem('theme') || 'light';

    if (temaGuardado === 'dark') {
        link.href = './styles/darkStyle.css';
        document.getElementById('videoBackground').querySelector('source').src = './assets/darkThemeVideo.mp4';
        selectTema.value = 'dark';
    } else {
        link.href = './styles/style.css';
        document.getElementById('videoBackground').querySelector('source').src = './assets/lightThemeVideo.mp4';
        selectTema.value = 'light'; 
    }

    document.getElementById('videoBackground').load(); // Recarga el video
}

// Llama a la función para inicializar el tema cuando la página se carga
window.addEventListener('load', inicializarTema);
