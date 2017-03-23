module.exports = function (app, model) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    //app.put("/api/user/:uid/website/:wid/page/:pid/widget", updateWidgetPosition);



    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var userId        = req.body.userId;
        var width         = req.body.width;
        var name          = req.body.widgetname;
        var text          = req.body.text;

        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        model.widgetModel
            .findWidgetById(widgetId)
            .then(
                function (image) {
                    image.width = width;
                    image.name = name;
                    image.text = text;
                    image.url = req.protocol+'://'+req.get('host')+'/uploads/'+filename;
                    // image.url = "http://localhost:3000/"+'uploads/'+filename;
                    image.save();
                    res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        console.log("hi");
        model.widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (widget) {
                    console.log("fibal"+widget);
                    res.json(widget);
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
    }



    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    console.log(widgets);
                    res.json(widgets);
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );

    }




    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        // var widget = widgets.find(function (widget) {
        //     return widget._id == widgetId;
        // });
        //
        // if(widget)
        // {
        //     if(widget.widgetType == "HEADING"){
        //         widget.name = newWidget.name;
        //         widget.text = newWidget.text;
        //         widget.size = newWidget.size;
        //     }
        //     else if(widget.widgetType == "IMAGE"){
        //         widget.name = newWidget.name;
        //         widget.text = newWidget.text;
        //         widget.width = newWidget.width;
        //         widget.url = newWidget.url;
        //     }
        //     else if(widget.widgetType == "HTML"){
        //         widget.name = newWidget.name;
        //         widget.text = newWidget.text;
        //     }
        //     else {
        //         widget.name = newWidget.name;
        //         widget.text = newWidget.text;
        //         widget.width = newWidget.width;
        //         widget.url = newWidget.url;
        //     }
        //     res.json(widget);
        // }
        // else {
        //     res.json(null);
        // }

        model.widgetModel
            .updateWidget(widgetId,newWidget)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );


    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error)
                }
            );
    }


    function updateWidgetPosition(req, res) {
        var start = req.query.start;
        var stop = req.query.stop;
        var pageId = req.params.pid;

        model
            .widgetModel
            .reOrderWidget(pageId, start, stop)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

        /*widgets.splice(stop, 0, widgets.splice(start, 1)[0]);
         res.send(widgets);
         console.log([start, stop]);*/
    }







}