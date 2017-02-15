/**
 * Created by fibin on 10-02-2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController);
    function profileController($routeParams,$location,UserService) {
        var vm=this;
        var userId=$routeParams['uid'];
        vm.update=update;
        vm.deleteUser=deleteUser;
            function update(newUser) {
            var user=UserService.updateUser(userId,newUser);
            if(user==null){
                vm.error="Unable to update the user";
            }
            else{
                vm.message="User succesfully updated";
            }
        }
            function deleteUser() {
                UserService.deleteUser(userId);
                $location.url("/login");
            }
        var user=UserService.findUserById(userId);
        vm.user=angular.copy(user);


    }
})();