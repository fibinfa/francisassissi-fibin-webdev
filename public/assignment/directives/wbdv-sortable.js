(function () {
    angular
        .module('WebAppMaker')
        .directive('ffaSortable',sortableDir);

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

