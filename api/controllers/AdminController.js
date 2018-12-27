/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const request = require('request');
const bcrypt = require('bcrypt');
module.exports = {
    signup: async (req, res) => {
    
        var allowedParameters = [
          "email", "password"
        ];
        
        var data = _.pick(req.body, allowedParameters);
        await Admin.create(data).exec((err, admins) => {
            console.log(allowedParameters)
            if (err) {
                res.json({status: false, msg: "admins could not be created", error: err})
            } else {
                res.json({status: true, msg: "admins created successfully"})
            }
        });
    },
    
    login: async (req, res) => {
        Admin.find({'email': req.body.email}).exec((err, admins) => {
            if (err) {
                res.json({status: false, error: err, msg: 'Invalid email or password'});
            } else {
                if(admins[0]){
                    console.log(admins)
                    let status = bcrypt.compareSync(req.body.password,  admins[0].password);
                    if(status){
                        res.json({status: true, token: JwtService.issue({email: req.body.email},'admin'),msg:"login Sucess"});
                    }else{ 
                        res.json({status: false, msg: "Invalid Password"}); 
                    }
                }else {
                    res.json({status:true,msg:"Invalid Email"})
                }
                
            }
        });
    },
    get:async (req,res)=>{
        request('http://dummy.restapiexample.com/api/v1/employee/1', function (error, response, body) {
                res.json(body);
        });

    }

};

