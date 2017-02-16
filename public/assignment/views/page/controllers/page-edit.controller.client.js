(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage=deletePage;
        vm.updatePage=updatePage;
        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(newPage) {
            var page=PageService.updatePage(vm.pageId,newPage);
            if(page==null){
                vm.error="Unable to update the Page";
            }
            else{
                vm.message="Page succesfully updated";
            }
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };

        function deletePage () {
            PageService.deletePage(vm.pageId);
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }
})();