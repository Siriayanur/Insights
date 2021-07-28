const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).send({ message: 'User doesnt exist' });
        }
        const isMatchPassword = await bcrypt.compare(password, existingUser.password)
        if (!isMatchPassword) {
            return res.status(403).send({ message: 'Wrong credentials : password' });
        }
        console.log('Came here ')
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
        console.log(existingUser, token);
        
        res.status(200).send({ result: existingUser, token });
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    try {
        const exisitingUser = await User.findOne({ email });
        console.log(exisitingUser);
        if (exisitingUser) {
            res.status(404).send({message : 'User already exist'});
        }
        if (password !== confirmPassword) {
            res.status(404).send({message : 'Passwords dont match'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        
        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        })
    
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });
        console.log(result,token);

        res.status(200).send({ result, token });
    } catch (e) {
        res.status(500).send(e);
    }
 
})
module.exports = router;