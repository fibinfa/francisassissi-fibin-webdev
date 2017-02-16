(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.createPage = createPage;


        function createPage (page) {
            PageService.createPage(vm.websiteId ,page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }
})();