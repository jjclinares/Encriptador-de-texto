/*seleccionar elementos HTML por su etiqueta, clase o ID.*/
const themeOne = document.querySelector('.cybertheme'); 
const head = document.querySelector('.logo');
const containerBox = document.querySelector('.container');
const textEncrypt = document.querySelector('.contenido');
const foot = document.querySelector('.pie__de_pagina');


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

function encriptar(texto) {
    if (typeof texto !== 'string' || !/^[a-z]+$/.test(texto)) {
        /*:^[a-z]+$: Coincide con cadenas que consisten únicamente en letras minúsculas sin acentos.
        /.test(texto): Comprueba si texto cumple con esta condición.
        !: Invierte el resultado. si texto contiene algo que no sea letras minúsculas sin acentos, el resultado será true. */
        alert('Por favor, digite solo letras minúsculas y sin acentos');
        return;
    } else {
        let textoEncriptado = texto
            .replace(/a/gi, 'ai') //Las barras / indican que se está utilizando una expresión regular
            .replace(/e/gi, 'enter') //g significa "global"
            .replace(/i/gi, 'imes')
            .replace(/o/gi, 'ober')
            .replace(/u/gi, 'ufat');
        mostrarResultado(textoEncriptado);
    }
}


function desencriptar(texto) {
    let textoDesencriptado = texto
        .replace(/ai/gi, 'a')
        .replace(/enter/gi, 'e')
        .replace(/imes/gi, 'i')
        .replace(/ober/gi, 'o')
        .replace(/ufat/gi, 'u');
    mostrarResultado(textoDesencriptado);
}



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


function copiarTexto() {
    navigator.clipboard.writeText(resultArea.textContent)
        .then(() => console.log('Texto copiado al portapapeles'))
        .catch(err => console.error('Error al copiar:', err));
}

copyButton.addEventListener('click', copiarTexto);