module.exports = function (app) {
    app.get("/api/user",findUser);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.post("/api/user",createUser);
    app.delete("/api/user/:userId",deleteUser);

    var users=
        [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" ,email: "alice@xyz.com" },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@xyz.com" },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia" ,email: "charly@xyz.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" ,email: "jannunzi@xyz.com" }
        ];

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime().toString();
        users.push(user);
        res.json(user);
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
        var user = users.find(function(user){
            return user.username == username &&
                    user.password == password;
        })
        if(user) {
            res.json(user);
        }
        else{
            res.json(null);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = users.find(function (u) {
            return u.username == username;
        })
        if(user) {
            res.json(user);
        } else{
            res.sendStatus(404);
        }
    }

    function findUserById(req,res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return userId == u._id;
        })
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        for(u in users){
            var user=users[u];
            if(user._id === userId){
                users[u].firstName=newUser.firstName;
                users[u].lastName=newUser.lastName;
                users[u].email=newUser.email;
                res.json(user);
                return;
            }
        }
        res.send(null);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for(var u in users) {
            if(users[u]._id === userId) {
                users.splice(u, 1);
            }
        }
        res.sendStatus(200);// send ok message
    }

}