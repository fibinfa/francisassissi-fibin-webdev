
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "updateWebsite": updateWebsite
        };
        return api;

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website",website);
        }

        function updateWebsite(websiteId,newWebsite) {
            return $http.put("/api/website/"+websiteId,newWebsite);
        }

        function findWebsitesByUser(userId) {
           return $http.get("/api/user/"+userId+"/website");
        }
    }
})();