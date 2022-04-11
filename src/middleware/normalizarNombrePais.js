export function normalizarNombrePais(pais) {
    const particionado = pais.toLowerCase().split(' ');

    for (var i = 0; i < particionado.length; i++) {
        particionado[i] = particionado[i].charAt(0).toUpperCase() + particionado[i].substring(1);
    }
    return particionado.join(' ');
}