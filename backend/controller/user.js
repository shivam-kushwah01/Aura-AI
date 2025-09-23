const User = require("../models/user");
const passport = require("passport");

module.exports.userSignup = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.status(201).json({
        message: `Hello ${username}, Welcome to Aura AI`,
        user: {
          id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email
        }
      });
    })
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: 'Signup failed',
      details: err.message
    });
  }
};



module.exports.userLogin = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || 'Invalid username or password'
      });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      console.log('Session after login:', req.session);
      res.status(200).json({
        success: true,
        message: `Hello ${user.username}, Welcome Back to Aura AI`,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    });
  })(req, res, next);
};

module.exports.me = (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.status(200).json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
      }
    });
  } else {
    res.status(200).json({ user: null });
  }
};


module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    // If you’re using express-session, also destroy the session:
    req.session.destroy((err) => {
      if (err) return next(err);

      // Clear the cookie if you’re using one
      res.clearCookie('connect.sid');

      // Respond with JSON instead of redirect
      res.status(200).json({
        success: true,
        message: 'You have been logged out'
      });
    });
  });
};
