(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable',sortableDir);
    
    function sortableDir() {
        function linkFunc(scope, element) {
            element.sortable({
                axis: 'y',
                handle: '.sortable-handle'
            });
        }
     return {
       link: linkFunc
     };
    }
})();