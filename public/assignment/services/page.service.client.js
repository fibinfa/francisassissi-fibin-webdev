/**
 * Created by fibin on 10-02-2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api = {
            "createPage": createPage,
             "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function findPageById(pid) {
            for(var p in pages) {
                if(pages[p]._id === pid) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }
        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                }
            }
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime().toString();
            pages.push(page);
        }

        function updatePage(pageId,newPage) {
            for(var p in pages){
                var page=pages[p];
                if(page._id === pageId){
                    page.name=newPage.name;
                    page.description=newPage.description;
                    return page;
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            var pageList = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    pageList.push(pages[p]);
                }
            }
            return pageList;
        }
    }
})();