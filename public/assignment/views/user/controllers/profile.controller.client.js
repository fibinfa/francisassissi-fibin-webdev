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

        function init(){
            var promise = UserService.findUserById(userId);
            promise.success(function (user) {
                vm.user=angular.copy(user);
            });
        }
        init();

        function update(newUser) {
            UserService
                .updateUser(userId,newUser)
                .success(function (user) {
                    if(user==null){
                        vm.error="Unable to update the user";
                    }
                    else{
                        vm.message="User succesfully updated";
                    }
                });
        }

        function deleteUser() {
                UserService
                    .deleteUser(userId)
                    .success(function () {
                        $location.url("/login");
                    });
            }
    }
})();