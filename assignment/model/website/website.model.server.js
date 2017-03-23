module.exports = function () {

    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
    var model={};

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        setModel: setModel,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findAllPagesForWebsite: findAllPagesForWebsite
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllPagesForWebsite(websiteId) {
        return WebsiteModel
            .findById(websiteId)
            .populate("pages")
            .exec();
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove(
            {
                _id : websiteId
            }
        );
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }


    function findAllWebsitesForUser(userId) {
        return model.userModel.findAllWebsitesForUser(userId);
    }

    function createWebsiteForUser(userId, website) {
        return WebsiteModel
            .create(website)
            .then(
                function (websiteObj) {
                   model.userModel
                       .findUserById(userId)
                       .then(function (user) {
                           user.websites.push(websiteObj);
                           websiteObj._user = user._id;
                           websiteObj.save();
                           return user.save();
                       })
                }
            )
    }


    function updateWebsite(websiteId,newWebsite) {
        return WebsiteModel.update(
            {_id:websiteId},
            {
                name: newWebsite.name,
                description: newWebsite.description
            }
        );
    }

};