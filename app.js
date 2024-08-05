let encriptado =[]
let desEncriptado =[]
let elementoHTML = document.querySelector(texto) /*seleccionar elementos HTML por su etiqueta, clase o ID.*/



function textoEncriptado() {
    let texto = prompt('Ingresa el texto que desees encriptar o desencriptar');
    return texto;
}

function encriptar(texto) {
    if (typeof texto !== 'string' || !/^[a-z]+$/.test(texto)) { 
        /*:^[a-z]+$: Coincide con cadenas que consisten únicamente en letras minúsculas sin acentos.
        /.test(texto): Comprueba si texto cumple con esta condición.
        !: Invierte el resultado. si texto contiene algo que no sea letras minúsculas sin acentos, el resultado será true. */
        console.log('Por favor, digite solo letras minúsculas y sin acentos');
        return;
    }else{
        let textoEncriptado = texto
            .replace(/a/g, 'ai') /*Las barras / indican que se está utilizando una expresión regular*/
            .replace(/e/g, 'enter') /*g significa "global"*/
            .replace(/i/g, 'imes') 
            .replace(/o/g, 'ober')
            .replace(/u/g, 'ufat');
        encriptado.push(textoEncriptado)
        console.log('El texto despues de Encriptado es:',textoEncriptado);
        return textoEncriptado;
    }
}



function desEncriptar(texto) {
    if (!encriptado.includes(texto) ) {
        console.log("Por favor, ingrese un texto que se encuentre en la lista de textos encriptados");
        return;
    }else{
        let textoDesencriptado = texto
        .replace(/ai/g, 'a')    
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
        desEncriptado.push(textoDesencriptado)
        console.log('El texto despues de DesEncriptado es:',textoDesencriptado);
        return textoDesencriptado;
    }
}
