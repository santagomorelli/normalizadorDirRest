import { request, response } from 'express';
import soapRequest from 'easy-soap-request';
import convert from 'xml-js';
import { convertiraISO } from './../middleware/convertirPaisaISO'
import { normalizarNombrePais } from './../middleware/normalizarNombrePais';

class Moneda {

    constructor() {}

    async get(req = request, res = response) {
        const paisNombre = req.body.paisNombre;
        const error = 'Envie el nombre o el codigo ISO del pais';
        let paisISOFinal = '';
        let a = 'hola';
        if (paisNombre) {
            const paisNombreNorm = normalizarNombrePais(paisNombre);
            console.log(paisNombreNorm);
            a = await convertiraISO(paisNombreNorm);
            paisISOFinal = a.toUpperCase();
        } else { res.status(400).json({ msg: 'no se ha recibido el nombre del pais' }) };
        const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
        const sampleHeaders = {
            'user-agent': 'sampleTest',
            'Content-Type': 'text/xml;charset=UTF-8',
            'soapAction': 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso',
        };
        const xml = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:web="http://www.oorsprong.org/websamples.countryinfo">
                     <soap:Header/>
                     <soap:Body>
                    <web:CountryCurrency>
                    <web:sCountryISOCode>${paisISOFinal}</web:sCountryISOCode>
                    </web:CountryCurrency>
                    </soap:Body>
                    </soap:Envelope>`;

        (async() => {
            const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
            const { body } = response;
            const bodyJson = convert.xml2js(body, { compact: false });
            const nombreMoneda = bodyJson.elements[0].elements[0].elements[0].elements[0].elements[1].elements[0].text;
            if (nombreMoneda == krone) {
                res.status(400).json({ msg: 'Ha ingresado incorrectamente el nombre del pais' })
            } else {
                res.json({ nombreMoneda });
            }
        })();

    }
}

export const monedaController = new Moneda();