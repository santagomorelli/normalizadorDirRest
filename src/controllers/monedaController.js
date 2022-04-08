import { request, response } from 'express';
import soapRequest from 'easy-soap-request';
import fs from 'fs/promises';

class Moneda {

    constructor() {}

    get(req = request, res = response) {
        const countryISO = 'ARG';
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
              <web:sCountryISOCode>${countryISO}</web:sCountryISOCode>
           </web:CountryCurrency>
        </soap:Body>
     </soap:Envelope>`;

        // usage of module
        (async() => {
            const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
            const { headers, body, statusCode } = response;
            console.log(headers);
            console.log(body);
            console.log(statusCode);
        })();

    }
}

export const monedaController = new Moneda();