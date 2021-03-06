module.exports =function() {
     var mongoose = require('mongoose');
     var connectionString='mongodb://localhost/webappmaker';
    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }
    if(process.env.MONGODB_URI){
        connectionString = process.env.MONGODB_URI
    }
    console.log(connectionString);
     mongoose.connect(connectionString);

     var userModel = require("./user/user.model.server")();
     var websiteModel = require("./website/website.model.server")();
     var pageModel = require("./page/page.model.server")();
     var widgetModel = require("./widget/widget.model.server")();

     var model = {
         userModel : userModel,
         websiteModel : websiteModel,
         pageModel : pageModel,
         widgetModel : widgetModel
     };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

     return model;




};