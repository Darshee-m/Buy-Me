//js

//For Register Page
const registerView = (req, res) => {
    res.render("../views/static/register", {
    } );
};

// For Login Page
const loginView = (req, res) => {
    res.render("../views/static/login", {
    } );
};
module.exports =  {
    registerView,
    loginView
};