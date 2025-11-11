// Registration
exports.register = async (req, res, next) => {
    try {
        // code

       res.send({ message: 'Registration successful' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Registration failed' });
    }
};

// Login
exports.login = async(req, res, next) => {
    try {
        //code

        res.send({ message: 'Login successful' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Login failed' });
    }
};

// Fetch current User
exports.currentUser = async(req, res, next) => {
    try {
        // code

        res.send({ message: 'Current User fetched successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to fetch current User' });
    }
};

// Fetch current Admin
exports.currentAdmin = async(req, res, next) => {
    try {
        // code

        res.json({ message: 'Current Admin fetched successfully' });
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Failed to fetch current Admin' });
    }
};