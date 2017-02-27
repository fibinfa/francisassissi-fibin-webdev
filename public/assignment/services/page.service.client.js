/**
 * Created by fibin on 10-02-2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
             "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function findPageById(pid) {
            return $http.get("/api/page/"+pid);
        }
        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }

        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page",page);
        }

        function updatePage(pageId,newPage) {
            return $http.put("/api/page/"+pageId, newPage);
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/"+websiteId+"/page");
        }
    }
})();