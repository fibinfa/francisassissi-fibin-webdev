module.exports = function () {

    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
    var model={};
    var q= require('q');

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        setModel: setModel,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
        //reorderWidget: reorderWidget
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove(
            {
                _id : widgetId
            }
        );
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }


    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId)
            .then(
                function (pageObj) {
                    return WidgetModel.find({_page: pageObj}).sort({order: 1});
                }
            );
    }



    function createWidget(pageId, widget) {
        return WidgetModel
            .create(widget)
            .then(
                function (widgetObj) {
                   return model.pageModel
                        .findPageById(pageId)
                        .then(function (page) {
                            page.widgets.push(widgetObj._id);
                            widgetObj._page = page._id;
                            widgetObj.save();
                            page.save();
                            return widgetObj;
                        },
                            function (error) {
                                // console.log("error"+error);
                            });
                },
                function (error) {
                    // console.log("error"+error);
                }
            );

    }


    function updateWidget(widgetId,newWidget) {
        return WidgetModel.update(
            {_id:widgetId},
            {$set:newWidget}
        );
    }

    // function reorderWidget(pageId, index1, index2) {
    //     var deffered = q.defer();
    //
    //
    //     pageModel
    //         .findPageById(pageId)
    //         .then(function (page) {
    //             // console.log(page);
    //
    //             for (var i = index1; i < index2; i++) {
    //                 var temp = page.widgets[i];
    //                 page.widgets[i] = page.widgets[i + 1];
    //                 page.widgets[i + 1] = temp;
    //             }
    //
    //             for (var i = index1; i > index2; i--) {
    //                 var temp = page.widgets[i];
    //                 page.widgets[i] = page.widgets[i - 1];
    //                 page.widgets[i - 1] = temp;
    //             }
    //             // console.log(page);
    //             model.pageModel
    //                 .update({_id: pageId}, {$set: {widgets: page.widgets}},
    //                     function(err, updatedPage) {
    //                         if(err){
    //                             deffered.reject(err);
    //                         } else{
    //                             deffered.resolve();
    //                         }
    //
    //                     });
    //         });
    //     return deffered.promise;
    // }




}