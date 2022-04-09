import soapRequest from 'easy-soap-request';
import convert from 'xml-js';

export async function convertiraISO(nombre) {
    const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
    const sampleHeaders = {
        'user-agent': 'sampleTest',
        'Content-Type': 'text/xml;charset=UTF-8',
        'soapAction': 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso',
    };
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo">
    <soapenv:Header/>
    <soapenv:Body>
       <web:CountryISOCode>
          <web:sCountryName>${nombre}</web:sCountryName>
       </web:CountryISOCode>
    </soapenv:Body>
 </soapenv:Envelope>`;

    (async() => {
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
        const { body } = response;
        console.log(body)
        const bodyJson = convert.xml2js(body, { compact: false });
        let nombrePais = bodyJson //.elements[0].elements[0].elements[0].elements[0].elements[1].elements[0].text;
        return nombrePais;
    })();

}