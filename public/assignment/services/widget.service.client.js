(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;

        function findWidgetsByPageId(pageId) {
            var widgetList=[];
            for(var w in widgets){
                var widget=widgets[w];
                if(widget.pageId === pageId){
                    widgetList.push(widget);
                }
            }
            return widgetList;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widgetId,newWidget) {
            for(var w in widgets){
                var widget=widgets[w];
                if(widget._id === widgetId){
                    if(widget.widgetType == "HEADING"){
                        widget.name = newWidget.name;
                        widget.text = newWidget.text;
                        widget.size = newWidget.size;
                    }
                    else if(widget.widgetType == "IMAGE"){
                        widget.name = newWidget.name;
                        widget.text = newWidget.text;
                        widget.width = newWidget.width;
                        widget.url = newWidget.url;
                    }
                    else if(widget.widgetType == "HTML"){
                        widget.name = newWidget.name;
                        widget.text = newWidget.text;
                    }
                    else {
                        widget.name = newWidget.name;
                        widget.text = newWidget.text;
                        widget.width = newWidget.width;
                        widget.url = newWidget.url;
                    }
                    return widget;
                }

            }
            return null;
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function createWidget(pageId,newWidget) {
            newWidget.pageId = pageId;
            newWidget._id = (new Date()).getTime().toString();
            widgets.push(newWidget);
            return newWidget._id;
        }
    }
})();