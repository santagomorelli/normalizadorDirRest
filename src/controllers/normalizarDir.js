import axios from 'axios';
import { request, response, next } from 'express';

class Normalizador {
    constructor() {}

    async get(req = request, res = response, next) {

        const data = req.body;
        const direccion = `${data.calle}${data.altura}`
        const url = `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${direccion}&departamento=${data.departamento}&provincia=${data.provincia}`;
        const info = await axios
            //.get('https://apis.datos.gob.ar/georef/api/direcciones?direccion=Av.SantaFenro2602ndoC,entreSantaRosayColón&departamento=capital&provincia=cordoba')
            .get(url)
            .then((response) => {
                const info = response.data;
                const direcciones = info.direcciones;
                const lenght = direcciones.length;
                let nomenclaturas = [];
                for (let i = 0; i < lenght; i++) {
                    nomenclaturas = nomenclaturas + direcciones[i].nomenclatura
                }
                res.json(nomenclaturas);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}


export const normalizarDir = new Normalizador();