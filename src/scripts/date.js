const moment = require('moment-timezone');

var date = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
var date1 = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
var startdate = moment("2018-04-01").tz("Asia/Kolkata").format("YYYY-MM-DD");
var stockdate = moment().add(-42870,'minutes').tz("Asia/Kolkata").format("YYYY-MM-DD");
var fromdate = moment().add(0,'days').format("YYYY-MM-DD");
var yesdate= moment().add(-1,'days').format("YYYY-MM-DD");
var todate = moment().add(1,'days').format("YYYY-MM-DD");
var weekdate = moment().add(-7,'days').tz("Asia/Kolkata").format("YYYY-MM-DD");

let weekdate1 = moment().add(-7,'days').tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
weekdate1 = moment.utc(weekdate1, "YYYY-MM-DD HH:mm:ss").toDate()
let fromdate1 = moment().add(0,'days').tz("Asia/Kolkata").format("YYYY-MM-DD");
fromdate1 = moment.utc(fromdate1, "YYYY-MM-DD HH:mm:ss").toDate()
let todate1 = moment().add(1,'days').tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
todate1 = moment.utc(todate1, "YYYY-MM-DD HH:mm:ss").toDate()
let yesdate1 = moment().add(-1,'days').tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
yesdate1 = moment.utc(yesdate1, "YYYY-MM-DD HH:mm:ss").toDate()

module.exports = {date:date,date1:date1,startdate:startdate,stockdate:stockdate,fromdate:fromdate,todate:todate,yesdate:yesdate,fromdate1:fromdate1,todate1:todate1,yesdate1:yesdate1, weekdate:weekdate,weekdate1:weekdate1}
