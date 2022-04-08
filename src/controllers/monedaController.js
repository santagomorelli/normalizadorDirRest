import { request, response } from 'express';
import soapRequest from 'easy-soap-request';
import fs from 'fs/promises';

class Moneda {

    constructor() {}

    get() {
        const url = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php';
        const sampleHeaders = {
            'user-agent': 'sampleTest',
            'Content-Type': 'text/xml;charset=UTF-8',
            'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
        };
        const xml = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ndf="https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl">
        <soapenv:Header/>
        <soapenv:Body>
           <ndf:LatLonListZipCode soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
              <zipCodeList xsi:type="dwml:zipCodeListType" xmlns:dwml="https://graphical.weather.gov/xml/DWMLgen/schema/DWML.xsd">75001</zipCodeList>
           </ndf:LatLonListZipCode>
        </soapenv:Body>
     </soapenv:Envelope>`;

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