
const express = require('express');
const UserModel = require('../models/usermodel');
const router = express.Router();
const otp = Math.floor(100000 + Math.random() * 90000);  
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

// User Registration

router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password, confirmpassword, mobileNumber, address } = req.body;

        // Check if password and confirm password match
        if (password !== confirmpassword) {
            return res.status(400).json({ success: false, message: 'Password and confirm password do not match' });
        }

        // Check if the email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        //       // Generate OTP

        // const otp = Math.floor(100000 + Math.random() * 90000);
      

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new UserModel({
            firstname,
            lastname,
            email,
            passwordHash: hashedPassword,
            confirmpasswordHash: hashedPassword, // Assuming you want to store this in the database
            mobileNumber,
            address
            
        });

        // Save the user to the database
        await user.save();

        res.json({ success: true, message: 'Account created successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        console.log('Login successful');
        const payload = {
            userId: user._id
        };
        // Implement JWT token generation and return it in the response
        // const token = ''; // Generate JWT token
        const token = jwt.sign(payload, "webBatch", { expiresIn: '3h' }); 

        res.json({ success: true,token: token, message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

// OTP Verification
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email });

        // Check if OTP matches
        if (!user || user.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        res.json({ success: true, message: 'OTP verification successful' });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ success: false, message: 'OTP verification failed' });
    }
});
// // GET method to retrieve user details by userid
// router.get('/user/:userid', async (req, res) => {
//     try {
//         const userId = req.params.userId;

//         // Find the user by userid
//         const user = await UserModel.findOne({ userId });

//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         res.json({ success: true, user });
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch user' });
//     }
// });
router.get('/users', authenticate, (req, res) => {
    const userId = req.userData.userId;
    UserModel.findById(userId)
        .then(result => {
            res.json({ success: true, data: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, message: "Server error" });
        });
});
router.get('/success', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json({ success: true, data: users, message: 'Successfully fetched users' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
