module.exports = function (app, usersRepository) {

    app.get('/users/signup', function (req, res) {
        res.render("signup.twig");
    })

    app.post('/users/signup', function (req, res) {
        const flash = { success: [], warnings: [], errors: [] };

        if (!req.body.username || !req.body.email || !req.body.password) {
            flash.warnings.push("Please complete all fields");
            req.session.flash = flash;
            return res.redirect("/users/signup");
        }

        // Password encrypt
        let securePassword = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');

        let user = {
            username: req.body.username,
            email: req.body.email,
            password: securePassword
        }
        usersRepository.insertUser(user).then(userId => {
            flash.success.push("New registrated user");
            req.session.flash = flash;
            res.redirect("/users/login");
        }).catch(error => {
            flash.errors.push("An error occurred while registering the user");
            req.session.flash = flash;
            res.redirect("/users/signup");
        })
    })

    app.get('/users/login', function (req, res) {
        res.render("login.twig");
    })

    app.post('/users/login', function (req, res) {
        const flash = { errors: [] };

        let securePassword = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        let filter = {
            username: req.body.username,
            password: securePassword
        }
        let options = {};
        usersRepository.findUser(filter, options).then(user => {
            if (user == null) {
                req.session.user = null;
                flash.errors.push("Incorrect username or password");
                req.session.flash = flash;
                res.redirect("/users/login");
            } else {
                req.session.user = user.username;
                res.redirect("/api/map");
            }
        }).catch(error => {
            req.session.user = null;
            flash.errors.push("An error occurred while searching for the user");
            req.session.flash = flash;
            res.redirect("/users/login");
        })
    })

    app.get('/users/logout', function (req, res) {
        const flash = { success: [] };
        if (req.session.user != null) {
            req.session.user = null;
            flash.success.push("The user has logged out successfully");
            req.session.flash = flash;
            res.redirect("/users/login");
        }
    })

};