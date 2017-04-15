module.exports = function (app, model) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    //app.put("/api/user/:uid/website/:wid/page/:pageId/widget?start=index1&end=index2", reorderWidget);



    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    console.log({dest: __dirname});

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
        model.widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
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



        // function reorderWidget(req, res) {
        //     var pageId = req.params.pageId;
        //     var index1 = parseInt(req.query.initial);
        //     var index2 = parseInt(req.query.final);
        //
        //     model.widgetModel
        //         .reorderWidget(pageId, index1, index2)
        //         .then(function() {
        //             res.sendStatus(200);
        //         }, function(err) {
        //             res.sendStatus(500).send(err);
        //         });
        // }








}