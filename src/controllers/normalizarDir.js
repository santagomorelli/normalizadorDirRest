import axios from 'axios';
import { request, response, next } from 'express';

class Normalizador {
    constructor() {}

    async get(req = request, res = response, next) {

        const data = req.body;
        const direccion = `${data.calle}${data.altura}`
        const url = `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${direccion}&departamento=${data.departamento}&provincia=${data.provincia}`;
        await axios
            .get(url)
            .then((response) => {
                const info = response.data;
                const direcciones = info.direcciones;
                console.log(direcciones);
                const lenght = direcciones.length;
                if (lenght < 2) { res.json(direcciones.nomenclatura) } else {
                    let nomenclaturas = [];
                    for (let i = 0; i < lenght; i++) {
                        nomenclaturas = nomenclaturas + direcciones[i].localidad_censal.nombre
                    }
                    res.json(nomenclaturas);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}


export const normalizarDir = new Normalizador();