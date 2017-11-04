var ejs=require('ejs');
//var mysql= require('./mysql');
var passwordHash = require("password-hash");
//var session = require('express-session');
//var object_id="lo_id";
//var description="Logged on";

exports.checkLogin=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var json_response;
    var hashedpassword = "sha1$809c72c9$1$dcb844794b7169480f2d255dd8c68baf218cedd9";
    if(email!="admin" || !passwordHash.verify(req.body.password,hashedpassword)){
        json_response = {"statuscode": 401};
    }
    else{
        json_response = {"statuscode": 200};
    }

    res.send(json_response);
   // var sess= req.session;

    //var checkLogin='select password,first_name,last_name,user_id,last_login from user where email="'+req.body.email+'"';
   // console.log(checkLogin);
    // mysql.fetchData(checkLogin,function(err,result){
    //     if(err){
    //         console.log(err);
    //         var json_response={"error" : err, "statuscode":401};
    //         res.send(json_response);
    //     }
    //     else{
    //         sess.user=req.body.email;
    //         var fname = result[0].first_name;
    //         var lname=result[0].last_name;
    //         var id=result[0].user_id;
    //         var password=result[0].password;
    //         var last_login=result[0].last_login;
    //         console.log(password);
    //         sess.first_name=fname;
    //         req.session.user_id=id;
    //         sess.last_name=lname;
    //         sess.devanjal=last_login;
    //
    //         if(passwordHash.verify(req.body.password,password)) {
    //             var log_sql='insert into user_log(timestamp, user_id, object_id,description) values(now(),"'+req.session.user_id+'","'+object_id+'","'+description+'")';
    //
    //             mysql.fetchData(log_sql,function(err,result){
    //                 if(err){
    //                     console.log("Log Error"+err);
    //                 }else{
    //
    //                 }
    //             });
    //
    //             var last_time='select last_login from user where email="'+req.body.email+'"';
    //             var update_time='update user SET last_login=now() where email="'+req.body.email+'"';
    //
    //             mysql.fetchData(update_time,function (err,result) {
    //                 if(err){
    //                     console.log(err);
    //                 }
    //                 else{
    //
    //                     var time2= result;
    //                 }
    //             });
    //             //	}
    //             console.log(req.session.user_id);
    //             var json_response = {"result": result, "statuscode": 200,};
    //             //var json_response=result;
    //             res.send(json_response);
    //         }
    //         else{
    //             console.log("error");
    //         }
    //
    //     }});

};
exports.logout=function (req, res) {
    req.session.destroy();
    res.send("logout success!");
};
exports.login=function nova(req,res){
    res.render("login",{username:"abc"});
}
