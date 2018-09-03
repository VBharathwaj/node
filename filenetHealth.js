var request = require('request');
var EventEmitter = require('events');
var emitter =  new EventEmitter();

var urls = [
    'http://nsmceprd.chec.local:9081/FileNet/Engine',
    'http://crfncelnxprd01.chec.local:9081/FileNet/Engine',
    'http://crfncelnxprd02.chec.local:9081/FileNet/Engine',
    'http://crfncelnxprd03.chec.local:9081/FileNet/Engine',
    'http://crfncelnxprd04.chec.local:9081/FileNet/Engine',
    'http://nsmceprd.chec.local:9081/P8CE/Health',
    'http://crfncelnxprd01.chec.local:9081/P8CE/Health',
    'http://crfncelnxprd02.chec.local:9081/P8CE/Health',
    'http://crfncelnxprd03.chec.local:9081/P8CE/Health',
    'http://crfncelnxprd04.chec.local:9081/P8CE/Health',
    'http://nsmceprd.chec.local:9081/wsi/FNCEWS40MTOM',
    'http://crfncelnxprd01.chec.local:9081/wsi/FNCEWS40MTOM',
    'http://crfncelnxprd02.chec.local:9081/wsi/FNCEWS40MTOM',
    'http://crfncelnxprd03.chec.local:9081/wsi/FNCEWS40MTOM',
    'http://crfncelnxprd04.chec.local:9081/wsi/FNCEWS40MTOM',
    'http://nsmceprd.chec.local:9081/wsi/ProcessEngineWS',
    'http://crfncelnxprd01.chec.local:9081/wsi/ProcessEngineWS',
    'http://crfncelnxprd02.chec.local:9081/wsi/ProcessEngineWS',
    'http://crfncelnxprd03.chec.local:9081/wsi/ProcessEngineWS',
    'http://crfncelnxprd04.chec.local:9081/wsi/ProcessEngineWS',
    'http://nsmaeprd:9082/NSMWorkplace/WcmSignIn.jsp?targetBase=http%3A%2F%2Fnsmaeprd%3A9082%2FNSMWorkplace&originPort=9082&originIp=172.24.172.70&targetUrl=WcmDefault.jsp',
    'http://crfnaelnxprd01:9082/NSMWorkplace/WcmSignIn.jsp?targetBase=http%3A%2F%2Fcrfnaelnxprd01%3A9082%2FNSMWorkplace&originPort=9082&originIp=10.64.173.136&targetUrl=WcmDefault.jsp',
    'http://crfnaelnxprd02:9082/NSMWorkplace/WcmSignIn.jsp?targetBase=http%3A%2F%2Fcrfnaelnxprd02%3A9082%2FNSMWorkplace&originPort=9082&originIp=10.64.173.137&targetUrl=WcmDefault.jsp',
    'http://crfnaelnxprd03:9082/NSMWorkplace/WcmSignIn.jsp?targetBase=http%3A%2F%2Fcrfnaelnxprd03%3A9082%2FNSMWorkplace&originPort=9082&originIp=10.64.175.125&targetUrl=WcmDefault.jsp',
    'http://crfnaelnxprd04:9082/NSMWorkplace/WcmSignIn.jsp?targetBase=http%3A%2F%2Fcrfnaelnxprd04%3A9082%2FNSMWorkplace&originPort=9082&originIp=10.64.175.126&targetUrl=WcmDefault.jsp'     
];

var responses = [];

emitter.on('storeResponse', (arg) => {
    var response = {};
    response.url = arg.url;
    response.responseCode = arg.response;
    responses.push(response);
    console.log(responses);
});

urls.forEach(url => {
    request({ url: url, json: true }, (error, response, body) => {
        if(!error){
            emitter.emit('storeResponse', {url: url, response: response.statusCode});
        }
    });
});





