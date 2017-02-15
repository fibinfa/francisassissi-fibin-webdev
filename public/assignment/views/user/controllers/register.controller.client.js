/**
 * Created by fibin on 10-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);
    
    function registerController(UserService,$location) {
        var vm=this;
        vm.createUser=createUser;
        function createUser(user){
            userId=UserService.createUser(user);
            $location.url("/user/"+userId);
        }

    }
})();