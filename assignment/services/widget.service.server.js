module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);


    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


    app.post ("/api/upload", upload.single('myFile'), uploadImage);


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

        var image = widgets.find(function (widget) {
            return widget._id == widgetId;
        })
        image.width = width;
        image.name = name;
        image.text = text;
        image.url = req.protocol+'://'+req.get('host')+'/uploads/'+filename;
        // image.url = "http://localhost:3000/"+'uploads/'+filename;
        res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        newWidget.pageId = pageId;
        newWidget._id = (new Date()).getTime().toString();
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var widgetList=[];
        for(var w in widgets){
            var widget=widgets[w];
            if(widget.pageId === pageId){
                widgetList.push(widget);
            }
        }
        res.json(widgetList) ;
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (widget) {
            return widget._id == widgetId;
        });
        res.json(widget);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        var widget = widgets.find(function (widget) {
            return widget._id == widgetId;
        });

        if(widget)
        {
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
            res.json(widget);
        }
        else {
            res.json(null);
        }

    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
            }
        }
        res.sendStatus(200);
    }

}