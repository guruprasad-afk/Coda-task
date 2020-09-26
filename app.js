const axios = require('axios')
const ObjectsToCsv = require('objects-to-csv')

const url = 'https://api.spacexdata.com/v3/launches?launch_year=2019'
axios.get(url).then(async (res) => {
    const launches = res.data
    let formattedData = []
    launches.forEach(element => {
        let nationalities = []
        let manufacturers = []
        let payloads = element.rocket.second_stage.payloads

        payloads.forEach(element => {
            nationalities.push(element.nationality)
            manufacturers.push(element.manufacturer)
        })

        let temp = {
            flight_number: element.flight_number,
            rocket_id: element.rocket.rocket_id,
            nationalities,
            manufacturers
        }

        formattedData.push(temp)
    });

    const csv = new ObjectsToCsv(formattedData)

    await csv.toDisk('./launches.csv')

})