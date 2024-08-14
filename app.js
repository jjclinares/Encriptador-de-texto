/*seleccionar elementos HTML por su etiqueta, clase o ID.*/

    const textArea = document.querySelector('#areaTexto');
    const buttonEncrypt = document.querySelector('.encrypt');
    const buttonDecrypt = document.querySelector('.decrypt');
    const resultArea = document.querySelector('.result');
    const copyButton = document.querySelector('.copy');




    function obtenerTexto() {
        let texto = textArea.value.trim();
        if (!texto) {
            alert('Por favor, ingresa un texto.');
            return null;
        }
        return texto;
    }


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



    // Desencripta el texto iterando por cada carácter
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


    // Eventos de los botones

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
            .then(() => console.log('Texto copiado al portapapeles'))
            .catch(err => console.error('Error al copiar:', err));
    }

copyButton.addEventListener('click', copiarTexto);



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
