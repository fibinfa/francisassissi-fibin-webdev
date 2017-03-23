module.exports = function (app, model) {
    app.get("/api/user",findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.post("/api/user",createUser);
    app.delete("/api/user/:userId",deleteUser);


    function createUser(req, res) {
        var newUser = req.body;
        model.userModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(req, res);
        }
        else if(username){
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials (req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user){
                        res.json(user);
                    } else{
                        res.json(null);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )

    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )

    }

    function findUserById(req,res) {
        var userId = req.params.userId;
        model
            .userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            },
            function (error) {
                res.sendStatus(404);
            })

    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        model
            .userModel
            .updateUser(userId,newUser)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error)
                }
            );
    }


}