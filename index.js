/**
 * Created by David on 08/11/2015.
 */
exports.plantUML =  function(plantuml, outputPath, callback, baseUrl){
    requestImage(createUrl(plantuml, baseUrl), outputPath, callback);
};

var deflate = require('./lib/js-deflate.js'); //require('zlib').deflateSync;
var utf8 = require('utf8');
var base64ish = require('./lib/base64ish.js');

function createUrl(plantuml, baseUrl){
    if(baseUrl === undefined){
        baseUrl = "http://www.plantuml.com/plantuml/img/";
    }

    // TODO: strip @tags?
    plantuml = plantuml.replace('@startuml', '').replace('@enduml', '').trim();

    //console.log("PlantUML type: " + typeof plantuml + "\n" + plantuml);
    var utf8encoded = utf8.encode(plantuml);
    console.log("Source:\n" + plantuml);
    // deflate
    //var deflated = deflate(utf8encoded, {level: 9});
    var deflated = deflate(utf8encoded, 9);
    console.log("Deflated:\n" + deflated);
    // base64ish
    var base64 = base64ish(deflated.toString());
    //var base64 = new Buffer(deflated.toString()).toString('base64');
    //console.log("base64@\n" + base64);

    var url = baseUrl + base64;
    //console.log("PlantUML URL: " + url);
    return url;
}

function requestImage(url, outputPath, callback){
    var request = require('request');
    var fs = require('fs');
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200){
            fs.writeFile(outputPath, body, function(err){
                if(err){
                    throw err;
                }
                if(callback) {
                    callback();
                }
            });
        }
    });
}

// if the testing env flag is set, export the private functions so we can test them
if(process.env.testing){
    exports._createUrl = createUrl;
    exports._rquestImage = requestImage;
    exports._deflate = deflate;
}