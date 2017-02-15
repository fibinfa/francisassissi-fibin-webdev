(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite=deleteWebsite;
        vm.updateWebsite=updateWebsite;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(newWebsite) {
            var website=WebsiteService.updateWebsite(vm.websiteId,newWebsite);
            if(website==null){
                vm.error="Unable to update the website";
            }
            else{
                vm.message="Website succesfully updated";
            }
        };

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website");
        };
    }
})();