import axios from 'axios';
import { request, response, next } from 'express';
import haversine from 'haversine-distance';

class Normalizador {
    constructor() {}

    async get(req = request, res = response, next) {

        const data = req.body;
        const direccion = `${data.calle}${data.altura}`
        const url = `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${direccion}&provincia=${data.provincia}&departamento=${data.departamento}`;
        await axios
            .get(url)
            .then((response) => {
                const info = response.data;
                const direcciones = info.direcciones;
                const cantidad = info.cantidad;
                if (cantidad == 0) { res.json({ msg: 'Calle no encontrada' }) } else if (cantidad == 1) {
                    const data = direcciones[0];
                    res.json(data.nomenclatura)
                } else {
                    let nomenclaturas = [];
                    for (let i = 0; i < cantidad; i++) {
                        nomenclaturas = nomenclaturas + direcciones[i].localidad_censal.nombre
                    }
                    res.json(nomenclaturas);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async obelisco(req = request, res = response) {

        let nuevaLat = 0;
        let nuevaLong = 0;
        const obelisco = { latitude: -34.6037389, longitude: -58.3815704 };

        const direccionNormalizada = req.body.direccionNorm;
        const direccionParticionada = direccionNormalizada.split(',');
        console.log(direccionParticionada);
        const url = `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${direccionParticionada[0]}&departamento=${direccionParticionada[1]}&provincia=${direccionParticionada[2]}`;
        console.log(url);
        await axios
            .get(url)
            .then((response) => {
                const info = response.data;
                const cantidad = info.cantidad;
                if (cantidad == 0) { res.json({ msg: 'No conozco esa direcciòn' }) } else {
                    const direcciones = info.direcciones[0];
                    nuevaLat = direcciones.ubicacion.lat;
                    nuevaLong = direcciones.ubicacion.lon;
                }
            })
            .catch((error) => {
                console.log(error);
            })

        const b = { latitude: nuevaLat, longitude: nuevaLong };

        const distance = haversine(obelisco, b);

        if (distance <= 1000000) { res.json({ msg: 'Estas a menos de 5 Kilòmetros del Obelisco' }) } else {
            res.json({ msg: 'Estas lejos del Obelisco' })
        }
    }
}

export const normalizarDir = new Normalizador();