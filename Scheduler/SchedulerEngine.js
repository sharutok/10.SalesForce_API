const moment = require('moment')
const today_data = moment().format('YYYY-MM-DD')
// const hour = 3
const hour = moment().format('HH')
const how_many_times_a_day = 24
const hours_per_day = 24
const breaks = hours_per_day / how_many_times_a_day
let scheduler_hrs = []
let query_hrs = []
for (let i = how_many_times_a_day; i > 0; i--) {
    scheduler_hrs.push(Number(`${Math.round(i * breaks)}`))
}
scheduler_hrs.sort((a, b) => { return a - b })
query_hrs = [`00:00`, ...scheduler_hrs.map(x => { return `${String(x).padStart(2, '0')}:00` })]
query_hrs.pop()
query_hrs = [...query_hrs.map(x => { return x }), `23:59`]

exports.checkSchedulerEngine = () => {
    console.log("in schedule engine");
    if (scheduler_hrs.includes(Number(hour))) {
        const index_hr = scheduler_hrs.indexOf(Number(hour))
        start_time = query_hrs[index_hr]
        end_time = query_hrs[index_hr + 1]
        return [start_time, end_time, today_data]
    }
    else {
        return [];
    }
}