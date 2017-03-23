module.exports = function () {

    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server.js')();
    var PageModel = mongoose.model('PageModel', PageSchema);
    var model={};

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        setModel: setModel,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        findAllWidgetsForPage: findAllWidgetsForPage
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllWidgetsForPage(pageId) {
        return PageModel
            .findById(pageId)
            .populate("widgets")
            .exec();
    }

    function deletePage(pageId) {
        return PageModel.remove(
            {
                _id : pageId
            }
        );
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }


    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }


    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(
                function (pageObj) {
                    model.websiteModel
                        .findWebsiteById(websiteId)
                        .then(function (website) {
                            website.pages.push(pageObj);
                            pageObj._website = website._id;
                            pageObj.save();
                            return website.save();
                        })
                }
            )
    }


    function updatePage(pageId,newPage) {
        return PageModel.update(
            {_id:pageId},
            {
                name: newPage.name,
                description: newPage.description,
                title: newPage.title
            }
        );
    }

};