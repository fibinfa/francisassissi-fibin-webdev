(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
             WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }
        init();

        function createWebsite (website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                });
        };
    }
})();