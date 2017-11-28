var express = require('express');
var router = express.Router();
const stripAnsi = require('strip-ansi');
var Sync = require('sync');

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'http://130.65.159.143:9200',
    log: 'trace'
});

client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});


function fetchHorizonip(req,res){

    Sync(function() {
        var MyDate = new Date();
        var isoDate = new Date(MyDate).toISOString();
        var MyDateString;

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        MyDateString =year+'.'+('0' + month).slice(-2)+'.'+('0' + day).slice(-2);
        console.log(MyDateString);

        var index='horizonindex-'+MyDateString;

        //var resultForErrorsTable=fetchTracecLogsForNeutron.sync(null,index);
        var lastTenLogin=[];
        console.log(index);
        client.search({
            index: index,
            q: '*23cd5c37c7e44d068fe1601d1635473b',
            sort: '@timestamp:desc',
            size: '10',
            pretty: true
        }).then(function (body) {
            var hits=body.hits.hits;

            var jsonObject={};
            for (var i=0; i<hits.length;i++) {
                var strippedMessage = hits[i]._source.message;
                var ip = strippedMessage.substr(0, strippedMessage.indexOf(' '));

                var index1 = strippedMessage.indexOf(' ') + 5;
                var index2 = strippedMessage.indexOf(']') - index1;
                var timestamp = strippedMessage.substr(index1, index2);
                timestamp = timestamp.substr(timestamp.indexOf('[') + 1);

                jsonObject = {"timestamp": timestamp, "ip": ip};
                lastTenLogin.push(jsonObject);
            }
            res.send({"lastTenLogin":lastTenLogin});
        }, function (error) {
            console.trace(error.message);
        });

    });
}

exports.fetchHorizonip=fetchHorizonip;


function ip(req,res){

    if(req.session.user) {
        res.render("IpTrack.ejs", {username: "abc"});
    }
    else{
        res.redirect("/login");
    }
}


exports.ip=ip;