const schedule = require('node-schedule');
const { Customer_Master, Customer_Sites, Invoice_Details, Invoice_Header, Item_Categories, Item_Master, Organization_Master, Price_List, } = require('../Controller/POSTSalesForceController')
const { checkSchedulerEngine } = require('./SchedulerEngine')

schedule.scheduleJob("59 * * *", () => {
    console.log(checkSchedulerEngine());
    const api_calls = [
        Customer_Master,
        Customer_Sites, Invoice_Details, Invoice_Header, Item_Categories, Item_Master, Organization_Master, Price_List
    ]
    api_calls.map(api => {
        setTimeout(() => {
            api()
        }, 5 * 1000)
    })
})
