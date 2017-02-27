/**
 * Created by fibin on 10-02-2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService',userService);
    function userService($http) {

        var api={
            "createUser":createUser,
            "findUserByCredentials":findUserByCredentials,
            "findUserByUsername":findUserByUsername,
            "findUserById":findUserById,
            "updateUser":updateUser,
            "deleteUser":deleteUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user",user);
        }
        function updateUser(userId,newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }
        
        function findUserByCredentials(username, password) {
           return  $http.get("/api/user?username="+username+"&password="+password);
        }

        function findUserByUsername(username) {
            return  $http.get("/api/user?username="+username);
        }

        function findUserById(uid) {
           return $http.get("/api/user/"+uid);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }
    }
})();
