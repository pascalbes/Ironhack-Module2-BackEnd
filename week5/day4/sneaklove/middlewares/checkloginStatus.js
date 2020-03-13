module.exports = function checkloginStatus(req, res, next) {
    req.session.currentUser ? next() : res.redirect("/auth/signin");
  
  
    // // A MODIFIER POUR LA CONFIGURATION DU LOGIN
    //  req.session.currentUser : null; 
    // // access this value @ {{user}} or {{user.prop}} in .hbs
    // res.locals.isLoggedIn = Boolean(req.session.currentUser);
    // // access this value @ {{isLoggedIn}} in .hbs
    // next(); // continue to the requested route
  }
  