/**
 * StudentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
 module.exports = {
    list: async (req, res) => {
        let token = req.headers.authorization;
        if(token){
            JwtService.verify(token,'admin', function (err, data) {
                if (err) {
                    console.log(err)
                    res.json({status: false, error: err ,msg:'Invalid token'});
                } else {
                    Students.find().exec((err, students) => {
                        res.json({status: true, data: students});
                    });
                }

            });
           
        }else{
            res.json({status:false,msg:"Authorization is required"})
        }
    },

    findBy_Id: async (req, res) => {
        let token = req.headers.authorization;
        if(token){
            JwtService.verify(token,'student', function (err, data) {
                if (err) {
                    console.log(err)
                    res.json({status: false, error: err ,msg:"token is Invalid"});
                } else {
                    Students.find({'email':req.body.email}).exec((err, students) => {
                        res.json({status: true, data: students});
                    });
                }

            });
        
        }else{
            res.json({status:false,msg:"Authorization is required"})
        }
    },

    signup: async (req, res) => {
    
        var allowedParameters = [
          "email", "password"
        ];
    
        var data = _.pick(req.body, allowedParameters);
        Students.create(data).exec((err, students) => {
            if (err) {
                res.json({status: false, msg: "Students could not be created", error: err})
            } else {
                res.json({status: true, msg: "Student Successfully added"})
            }
        });
    },
   

    login: async (req, res) => {
        Students.find({email: req.body.email}).exec((err, students) => {
            if (err) {
                res.json({status: false, error: err, msg: 'Invalid email or password'});
            } else {
                if(students[0]){
                    let status =  bcrypt.compareSync(req.body.password, students[0].password)
                    if(status){
                        res.json({status: true, token: JwtService.issue({email: req.body.email},'student'),msg:"Login Success"});
                    }else{ 
                        res.json({status: false, msg: "Invalid Password"}); 
                    }
                }else{
                    res.json({status:true,"msg":"invalid email"})
                }
                
            }
        });
    },

    update: async (req,res) => {
        let token = req.headers.authorization;
        if(token){
            // sails.log.info('I am an info-level message.');
            JwtService.verify(token, 'student',function (err, data) {
                if (err) {
                    status=false
                    res.json({status: false, error: err});
                } else {
                    status=true
                }
            });
            if(status){
                await Students.update({'email':req.body.email}).set({
                    'name':req.body.name,
                    'address':req.body.address
                }).fetch();
                res.json({status:true,"msg":"updated"})
            }else{
                res.json({status:false,"msg":"token expired"})
            }
        }else{
            res.json({"status":false,msg:"Authorization is required"})
        }
     }
    
};

