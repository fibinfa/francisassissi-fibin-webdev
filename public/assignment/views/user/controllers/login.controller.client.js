/**
 * Created by fibin on 10-02-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);
    
    function loginController(UserService,$location) {
        var vm=this;
        vm.login=login;
        function login(user){
            var promise = UserService
                .findUserByCredentials(user.username,user.password);
            promise.success(function (loginUser) {
                console.log(loginUser);
                if(loginUser !=null){
                    $location.url('/user/'+loginUser._id)
                }
                else{
                    vm.error="User not found";
                }
            });
        }
    }
})();