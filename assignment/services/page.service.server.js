module.exports = function (app) {
    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages =
        [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page.websiteId = websiteId;
        page._id = (new Date()).getTime().toString();
        pages.push(page);
        res.sendStatus(200)
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var pageList = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                pageList.push(pages[p]);
            }
        }
        res.json(pageList);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        var page = pages.find(function (page) {
            return page._id == pageId;
        });
        res.json(page);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        var page = pages.find(function (page) {
            return page._id == pageId
        });
        if(page) {
            page.name = newPage.name;
            page.description = newPage.description;
            res.json(page);
        }
        else{
            res.json(null);
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages.splice(p, 1);
            }
        }
        res.sendStatus(200);
    }
}