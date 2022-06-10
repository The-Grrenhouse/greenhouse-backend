const router = require('express').Router();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('./validation');

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body);  
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');
    
    //hash the password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
        avatar : req.body.avatar
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(500).send(err);
    }
});

router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body);  
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does not exist');
    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');
     
    res.send('boom baby')

    
    
});


module.exports = router;