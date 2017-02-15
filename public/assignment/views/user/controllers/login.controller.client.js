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
            var loginUser=UserService.findUserByCredentials(user.username,user.password);
            if(loginUser !=null){
                $location.url('/user/'+loginUser._id)
            }
            else{
                vm.error="User not found";
            }
        }
    }
})();