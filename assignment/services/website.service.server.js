module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);



    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (sites) {
                    res.json(sites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }
    
    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        model.websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }
    
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model.websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            )

    }
    
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error)
                }
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        model.websiteModel
            .updateWebsite(websiteId,newWebsite)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

}