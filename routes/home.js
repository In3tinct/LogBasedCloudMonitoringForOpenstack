var express = require('express');
var router = express.Router();
const stripAnsi = require('strip-ansi');
var request = require('request')

//Api for openstack nova, blockstorage etc.
var pkgcloud = require('pkgcloud'),
    _ = require('lodash');


var OSWrap = require('openstack-wrapper');
var keystone = new OSWrap.Keystone('http://130.65.159.143:5000/v3');


/*keystone.getToken('admin', 'sjsumaster2017', function(error, token){
    if(error)
    {
        console.error('an error occured', error);
    }
    else
    {
        console.log('A general token object has been retrived', token);
        //the token value (token.token) is required for project listing & getting project specific tokens
    }
});*/


// create our client with your openstack credentials
var novaClient = pkgcloud.compute.createClient({
    provider: 'openstack',
    username: 'admin',
    password: 'sjsumaster2017',
    region: 'RegionOne', //default for DevStack, might be different on other OpenStack distributions
    authUrl: 'http://130.65.159.143:5000'
    });



var blockStorageClient = pkgcloud.blockstorage.createClient({
    provider: 'openstack',
    username: 'admin',
    password: 'sjsumaster2017',
    region: 'RegionOne', //default for DevStack, might be different on other OpenStack distributions
    authUrl: 'http://130.65.159.143:5000'
});

giveCurlCommands();

var elasticsearch = require('elasticsearch');
var elasticsearchWatcher = require('elasticsearch-watcher');

/*var client = new elasticsearch.Client({
    plugins: [ elasticsearchWatcher ],
    host: 'http://130.65.159.143:9200',
    log: 'trace'
});*/

/*client.watcher.putWatch([{
    "input" : {
        "search" : {
            "request" : {
                "indices" : [ "novaindex-2017.09.24" ],
                "body" : {
                    "size" : 1,
                    "sort" : {
                        "timestamp" : { "order" : "desc"}
                    },
                    "query" : {
                        "term" : { "q" : "*DEBUG*"}
                    }
                }
            }
        }
    }
}, testWatcher])

function testWatcher(req,res){
    client.watcher.getWatch({ id: 42 })
        .then(function (resp) {

        });

}*/


//Pinging elastic search server
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


function totalVolumesUsed(){

    blockStorageClient.getVolumes(function (err, volumes) {
        if (err) {
            console.dir(err);
            return;
        }
        console.log(volumes);
    });

}



/* GET home page. */

function fetchInfoForHomePage(req,res){


    var MyDate = new Date();
    var isoDate = new Date(MyDate).toISOString();
    var MyDateString;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    MyDateString =year+'.'+('0' + month).slice(-2)+'.'+('0' + day).slice(-2);
    console.log(MyDateString);

    var index='novaindex-'+MyDateString;
    console.log(index);
    client.search({
        index: index,
        q: 'message:*spawned*',
        sort: '@timestamp:desc',
        size: '10',
        pretty: true
    }).then(function (body) {
        var hits=body.hits.hits;
        var infoMessageForHomePage=[];


        //Creating a json object with timestamp, loglevel and message
        var jsonObject={};
        for (var i=0; i<hits.length;i++){
            var strippedMessage= stripAnsi(hits[i]._source.message[1]);

            var loglevel=strippedMessage.substr(0,strippedMessage.indexOf(' '));
            var message=strippedMessage.substr(strippedMessage.indexOf(' ')+1);
            var timestamp=hits[i]._source.timestamp;

            //1) If a new instance is created
            if(loglevel==="INFO"){
                jsonObject={"timestamp":timestamp, "loglevel":loglevel, "message":message};
                infoMessageForHomePage.push(jsonObject);
                var instanceName= message.split("instance: ", 3)[1].split("]")[0];

                //Fetching the details of the servers(instances) to match the instance ID with the  IP address
                novaClient.getServers(function (err, servers) {
                    if (err) {
                        console.dir(err);
                        return;
                    }
                    for (var i=0;i<servers.length;i++){
                        if (servers[i].id==instanceName){
                            servers[i].addresses.private[1].addr;
                        }
                    }
                });
            }

        }

        //Since i was getting unicode and ansi code characters with the message i am striping those
        //so we can show only the ascii characters on the UI
        //console.log(stripAnsi(hits));
        console.log("Successful");
        res.send({"infoMessageForHomePage":infoMessageForHomePage});
    }, function (error) {
        console.trace(error.message);
    });


}

exports.fetchInfoForHomePage=fetchInfoForHomePage;


function fetchingMaxAllowedValues(){

    var postdata= {
        "auth": {
            "tenantName": "admin",
            "passwordCredentials": {
                "username": "admin",
                "password": "sjsumaster2017"
            }
        }
    };
    var options = {
        url: 'http://130.65.159.143:35357/v2.0/tokens/',
        method: 'POST',
        headers: {'content-type': 'application/json'},
        json: true,
        body: postdata
    };

    request(options, function (err, res, body) {
        if (err) {
            console.error('error posting json: ', err)
            throw err
        }
        var headers = res.headers
        var statusCode = res.statusCode
        console.log('headers: ', headers)
        console.log('statusCode: ', statusCode)
        console.log('body: ', body)
    })

}









function home(req,res){
    res.render("Home.ejs",{username:"abc"});
}


exports.home=home;