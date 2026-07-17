// Envuelve cualquier contenido dentro de un contenedor de página simple.
// "children" es el texto HTML (string) que va dentro.
export function PageLayout(children) {

    return `<div class="page">${children}</div>`;

}
