/**
 * Created by David on 28/11/2015.
 */
process.env.testing = true;
var plantUML = require('../index.js');
var expect = require('chai').expect;

var pregeneratedDeflatedSring = 'm;0ûâ±¼G±Ð¸bÐl$ÁÛbi7ÌL¡K ªjYÙl°räDª]@/ÂF&VõÌ}Çq';
// generated using the online tool
var pregeneratedEncodedString = 'ROex2e0m40NxdEAnbGQyWfs5Hn2nqBXYq6ma7y7RYs9fDynCeKkWgcgGMTbii7BaHAfTG2_2HfmS9X-Pa5OMzSnznt40fHm4Nhx1felUIY4BZ7Tkb9aKxv5_T2EpNHvVwF86';
var plantUmlUrl = 'http://www.plantuml.com/plantuml/img/';

var fs = require("fs");
var puml = fs.readFileSync('test/activityUML.puml').toString();

describe("PlantUML", function(){
    it("Should export createUrl when in test mode", function(){
        expect(plantUML._createUrl).to.not.equal(undefined);
    });
    describe("#createURL", function(){
        //it("Should correctly encode the string", function(){
        //   expect()
        //});
        it("Should correctly deflate the string", function(){
            expect(plantUML._deflate(puml)).to.equal(pregeneratedDeflatedSring);
        });
        it("Should create a valid URL", function(){
            expect(plantUML._createUrl(puml)).to.equal(plantUmlUrl + pregeneratedEncodedString);
        });
        it("Should use a base URL if one is passed", function(){
            var baseUrl = 'http://www.example.com/img/';
            expect(plantUML._createUrl(puml, baseUrl)).to.equal(baseUrl + pregeneratedEncodedString)
        });
    });
});


