let express = require("express");//set up web application
let app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');

const settingsBill = SettingsBill();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public')); //enable your css

app.get('/', function (req, res) {

    console.log("totals : ")
    console.log(settingsBill.totals());

    res.render('home', {
        setting: settingsBill.getSettings(),
        totals: settingsBill.totals()

        //key  settings  & totals together

    });
})

app.post('/settings', function (req, res) {

    console.log('in settings');
    // console.log(req.body);

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        criticalLevel: req.body.criticalLevel,
        warningLevel: req.body.warningLevel

    })
    res.redirect("/")
});


app.post('/action', function (req, res) {
    settingsBill.recordAction(req.body.actionType);
    // console.log(req.body.actionType);
    res.redirect("/")

});
app.get('/actions', function (req, res) {
    res.render("actions", { actions: settingsBill.actions() });


});
app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType;
    res.render("actions", { actions: settingsBill.actionsFor(actionType) });
});


let PORT = process.env.PORT || 3009;
app.listen(PORT, function () {
    console.log("App Starts on Port", PORT);
});