const allTscList = [
    { // VINNYTSK
        region: '2',
        tscNumber: 'ТСЦ 0541'
    }, {
        region: '2',
        tscNumber: 'ТСЦ 0542'
    }, {
        region: '2',
        tscNumber: 'ТСЦ 0543'
    }, {
        region: '2',
        tscNumber: 'ТСЦ 0544'
    }, {
        region: '2',
        tscNumber: 'ТСЦ 0545'
    }, {
        region: '2',
        tscNumber: 'ТСЦ 0546'
    },
    { // VOLYNCKA
        region: '3',
        tscNumber: 'ТСЦ 0741'
    }, {
        region: '3',
        tscNumber: 'ТСЦ 0742'
    }, {
        region: '3',
        tscNumber: 'ТСЦ 0743'
    }, {
        region: '3',
        tscNumber: 'ТСЦ 0744'
    },
    { // DNIPRO
        region: '4',
        tscNumber: 'ТСЦ 1241'
    }, {
        region: '4',
        tscNumber: 'ТСЦ 1242'
    }, {
        region: '4',
        tscNumber: 'ТСЦ 1243'
    }, {
        region: '4',
        tscNumber: 'ТСЦ 1244'
    }, {
        region: '4',
        tscNumber: 'ТСЦ 1245'
    }, {
        region: '4',
        tscNumber: 'ТСЦ 1246'
    }, {
        region: '4',
        tscNumber: 'ТСЦ 1247'
    }, {
        region: '4',
        tscNumber: 'ТСЦ 1248'
    }, {
        region: '4',
        tscNumber: 'ТСЦ 1249'
    },
    // {
    //     region: '5',
    //     tscNumber: 'ТСЦ 1451'
    // }, {
    //     region: '5',
    //     tscNumber: 'ТСЦ 1452'
    // }, {
    //     region: '6',
    //     tscNumber: 'ТСЦ 1841'
    // }, {
    //     region: '6',
    //     tscNumber: 'ТСЦ 1842'
    // }, {
    //     region: '6',
    //     tscNumber: 'ТСЦ 1843'
    // }, {
    //     region: '6',
    //     tscNumber: 'ТСЦ 1844'
    // }, {
    //     region: '6',
    //     tscNumber: 'ТСЦ 1845'
    // },
    { // ZAKARPATSKA
        region: '7',
        tscNumber: 'ТСЦ 2141'
    }, {
        region: '7',
        tscNumber: 'ТСЦ 2142'
    }, {
        region: '7',
        tscNumber: 'ТСЦ 2143'
    }, {
        region: '7',
        tscNumber: 'ТСЦ 2144'
    }, {
        region: '7',
        tscNumber: 'ТСЦ 2146'
    },
    // {
    //     region: '8',
    //     tscNumber: 'ТСЦ 2341'
    // }, {
    //     region: '8',
    //     tscNumber: 'ТСЦ 2342'
    // }, {
    //     region: '8',
    //     tscNumber: 'ТСЦ 2343'
    // }, {
    //     region: '8',
    //     tscNumber: 'ТСЦ 2344'
    // }, {
    //     region: '8',
    //     tscNumber: 'ТСЦ 2346'
    // }, {
    //     region: '8',
    //     tscNumber: 'ТСЦ 2348'
    // }, {
    //     region: '9',
    //     tscNumber: 'ТСЦ 2641'
    // }, {
    //     region: '9',
    //     tscNumber: 'ТСЦ 2642'
    // }, {
    //     region: '9',
    //     tscNumber: 'ТСЦ 2643'
    // }, {
    //     region: '9',
    //     tscNumber: 'ТСЦ 2644'
    // }, {
    //     region: '9',
    //     tscNumber: 'ТСЦ 2645'
    // },
    { // KYIV
        region: '26',
        tscNumber: 'ТСЦ 8041'
    }, {
        region: '26',
        tscNumber: 'ТСЦ 8043'
    }, {
        region: '26',
        tscNumber: 'ТСЦ 8044'
    }, {
        region: '26',
        tscNumber: 'ТСЦ 8045'
    }, {
        region: '26',
        tscNumber: 'ТСЦ 8046'
    }, {
        region: '26',
        tscNumber: 'ТСЦ 8047'
    }, {
        region: '26',
        tscNumber: 'ТСЦ 8048'
    },
    { // KYIV OBLAST
        region: '10',
        tscNumber: 'ТСЦ 3241'
    }, {
        region: '10',
        tscNumber: 'ТСЦ 3242'
    }, {
        region: '10',
        tscNumber: 'ТСЦ 3243'
    }, {
        region: '10',
        tscNumber: 'ТСЦ 3244'
    }, {
        region: '10',
        tscNumber: 'ТСЦ 3245'
    }, {
        region: '10',
        tscNumber: 'ТСЦ 3246'
    }, {
        region: '10',
        tscNumber: 'ТСЦ 3247'
    }, {
        region: '10',
        tscNumber: 'ТСЦ 3248'
    }, {
        region: '10',
        tscNumber: 'ТСЦ 3249'
    },
    // {
    //     region: '11',
    //     tscNumber: 'ТСЦ 3541'
    // }, {
    //     region: '11',
    //     tscNumber: 'ТСЦ 3542'
    // }, {
    //     region: '11',
    //     tscNumber: 'ТСЦ 3543'
    // }, {
    //     region: '11',
    //     tscNumber: 'ТСЦ 3544'
    // }, {
    //     region: '11',
    //     tscNumber: 'ТСЦ 3545'
    // }, {
    //     region: '12',
    //     tscNumber: 'ТСЦ 4443'
    // },
    { // LVIVSKA
        region: '13',
        tscNumber: 'ТСЦ 4641'
    }, {
        region: '13',
        tscNumber: 'ТСЦ 4642'
    }, {
        region: '13',
        tscNumber: 'ТСЦ 4643'
    }, {
        region: '13',
        tscNumber: 'ТСЦ 4644'
    }, {
        region: '13',
        tscNumber: 'ТСЦ 4645'
    }, {
        region: '13',
        tscNumber: 'ТСЦ 4646'
    }, {
        region: '13',
        tscNumber: 'ТСЦ 4647'
    }, {
        region: '13',
        tscNumber: 'ТСЦ 4648'
    }, {
        region: '13',
        tscNumber: 'ТСЦ 4649'
    }, {
        region: '13',
        tscNumber: 'ТСЦ 4650'
    }, {
        region: '13',
        tscNumber: 'ТСЦ 4651'
    },
    // {
    //     region: '14',
    //     tscNumber: 'ТСЦ 4841'
    // }, {
    //     region: '14',
    //     tscNumber: 'ТСЦ 4842'
    // }, {
    //     region: '14',
    //     tscNumber: 'ТСЦ 4843'
    // }, {
    //     region: '14',
    //     tscNumber: 'ТСЦ 4844'
    // }, {
    //     region: '14',
    //     tscNumber: 'ТСЦ 4845'
    // },
    { // ODESSA
        region: '15',
        tscNumber: 'ТСЦ 5141'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5142'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5143'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5144'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5145'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5146'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5147'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5148'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5149'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5150'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5151'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5152'
    }, {
        region: '15',
        tscNumber: 'ТСЦ 5153'
    },
    // {
    //     region: '16',
    //     tscNumber: 'ТСЦ 5341'
    // }, {
    //     region: '16',
    //     tscNumber: 'ТСЦ 5342'
    // }, {
    //     region: '16',
    //     tscNumber: 'ТСЦ 5343'
    // }, {
    //     region: '16',
    //     tscNumber: 'ТСЦ 5344'
    // }, {
    //     region: '16',
    //     tscNumber: 'ТСЦ 5345'
    // }, {
    //     region: '16',
    //     tscNumber: 'ТСЦ 5346'
    // }, {
    //     region: '16',
    //     tscNumber: 'ТСЦ 5347'
    // }, {
    //     region: '16',
    //     tscNumber: 'ТСЦ 5348'
    // }, {
    //     region: '17',
    //     tscNumber: 'ТСЦ 5641'
    // }, {
    //     region: '17',
    //     tscNumber: 'ТСЦ 5642'
    // }, {
    //     region: '17',
    //     tscNumber: 'ТСЦ 5643'
    // }, {
    //     region: '17',
    //     tscNumber: 'ТСЦ 5644'
    // }, {
    //     region: '18',
    //     tscNumber: 'ТСЦ 5941'
    // }, {
    //     region: '18',
    //     tscNumber: 'ТСЦ 5942'
    // }, {
    //     region: '18',
    //     tscNumber: 'ТСЦ 5943'
    // }, {
    //     region: '18',
    //     tscNumber: 'ТСЦ 5944'
    // }, {
    //     region: '18',
    //     tscNumber: 'ТСЦ 5945'
    // }, {
    //     region: '18',
    //     tscNumber: 'ТСЦ 5946'
    // },
    { // TERNOPOL
        region: '19',
        tscNumber: 'ТСЦ 6141'
    }, {
        region: '19',
        tscNumber: 'ТСЦ 6142'
    }, {
        region: '19',
        tscNumber: 'ТСЦ 6143'
    }, {
        region: '19',
        tscNumber: 'ТСЦ 6144'
    }, {
        region: '19',
        tscNumber: 'ТСЦ 6145'
    },
    { // KHARKIV
        region: '20',
        tscNumber: 'ТСЦ 6341'
    }, {
        region: '20',
        tscNumber: 'ТСЦ 6342'
    }, {
        region: '20',
        tscNumber: 'ТСЦ 6343'
    }, {
        region: '20',
        tscNumber: 'ТСЦ 6344'
    }, {
        region: '20',
        tscNumber: 'ТСЦ 6345'
    }, {
        region: '20',
        tscNumber: 'ТСЦ 6346'
    }, {
        region: '20',
        tscNumber: 'ТСЦ 6347'
    }, {
        region: '20',
        tscNumber: 'ТСЦ 6348'
    }, {
        region: '20',
        tscNumber: 'ТСЦ 6349'
    }, {
        region: '20',
        tscNumber: 'ТСЦ 6350'
    },
    // {
    //     region: '21',
    //     tscNumber: 'ТСЦ 6541'
    // }, {
    //     region: '21',
    //     tscNumber: 'ТСЦ 6542'
    // }, {
    //     region: '21',
    //     tscNumber: 'ТСЦ 6543'
    // }, {
    //     region: '21',
    //     tscNumber: 'ТСЦ 6544'
    // }, {
    //     region: '21',
    //     tscNumber: 'ТСЦ 6545'
    // },
    { // HMELNITSK
        region: '22',
        tscNumber: 'ТСЦ 6841'
    }, {
        region: '22',
        tscNumber: 'ТСЦ 6842'
    }, {
        region: '22',
        tscNumber: 'ТСЦ 6843'
    }, {
        region: '22',
        tscNumber: 'ТСЦ 6844'
    }, {
        region: '22',
        tscNumber: 'ТСЦ 6845'
    },
    // {
    //     region: '23',
    //     tscNumber: 'ТСЦ 7141'
    // }, {
    //     region: '23',
    //     tscNumber: 'ТСЦ 7142'
    // }, {
    //     region: '23',
    //     tscNumber: 'ТСЦ 7143'
    // }, {
    //     region: '23',
    //     tscNumber: 'ТСЦ 7144'
    // }, {
    //     region: '23',
    //     tscNumber: 'ТСЦ 7145'
    // }, {
    //     region: '25',
    //     tscNumber: 'ТСЦ 7441'
    // }, {
    //     region: '25',
    //     tscNumber: 'ТСЦ 7442'
    // }, {
    //     region: '25',
    //     tscNumber: 'ТСЦ 7443'
    // }, {
    //     region: '25',
    //     tscNumber: 'ТСЦ 7444'
    // },
    { // CHERNIVETSKA
        region: '24',
        tscNumber: 'ТСЦ 7341'
    }, {
        region: '24',
        tscNumber: 'ТСЦ 7342'
    }, {
        region: '24',
        tscNumber: 'ТСЦ 7343'
    }, {
        region: '24',
        tscNumber: 'ТСЦ 7344'
    }, {
        region: '24',
        tscNumber: 'ТСЦ 7345'
    },
];

const tscList = allTscList //.filter(tsc => [].includes(tsc.region));

module.exports = {
    tscList
}