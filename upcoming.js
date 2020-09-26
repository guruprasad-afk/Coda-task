const axios = require('axios')
const ObjectsToCsv = require('objects-to-csv')

const url = 'https://api.spacexdata.com/v3/launches/upcoming'
axios.get(url).then(async (res) => {
    const launches = res.data
    let formattedData = []
    launches.forEach(element => {
        let temp = {
            launch_date: (new Date(element.launch_date_utc)).toDateString(),
            launch_time: (new Date(element.launch_date_utc)).toTimeString(),
            rocket_id: element.rocket.rocket_name,
            rocket_type: element.rocket.rocket_type,
        }

        formattedData.push(temp)
    });

    const csv = new ObjectsToCsv(formattedData)

    await csv.toDisk('./upcoming.csv')

})