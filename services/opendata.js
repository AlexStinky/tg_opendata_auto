const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

const messages = require('../scripts/messages');

const { numberOptions, sameLetters } = require('../options.js');
const { tscList } = require('../tsc.js');

const { Queue } = require('../modules/queue');

const { userDBService } = require('./db');
const { sender } = require('./sender');

class Opendata extends Queue {
    constructor() {
        super();

        this.licensePlates_url = 'http://opendata.hsc.gov.ua/check-leisure-license-plates/';

        this.LICENSE_PLATES_REG = /[A-Z]{2}\d{4}[A-Z]{2}/;

        this.ALL_REG = /\b(?:0001|0010|0100|0313|0666|6660|0007|7777|8888|1111)\b/;
        this.ODESSA_REG = /(?:HH|OO)(?:\d{4}(?:AA|BB|EE|II|KK|MM|HH|OO|PP|CC|TT|XX|OP|BH)|(?:12|13|14|15|16|17|18|19|21|23|24)00)/;
        this.TERNOPOL_REG = /(?:HO\d{0,4}(?:AA|BB|EE|II|KK|MM|HH|OO|PP|CC|TT|XX|HO|OH))|(?:BO\d{0,4}(?:OP|PP))/;
        this.KHMELNITSKIY_REG = /(?:НХ|ВХ)\d{0,4}(?:AA|BB|EE|II|KK|MM|HH|OO|PP|CC|TT|XX|HX|XH|BX|XB)/;
        this.VENEZIA_REG = /KB\d{0,4}(?:AA|BB|EE|II|KK|MM|HH|OO|PP|CC|TT|XX|KB|BK)/;
        this.KIEV_REG = /(?:KA|AA)\d{0,4}(?:AA|BB|EE|II|KK|MM|HH|OO|PP|CC|TT|XX|KA|AK)/;
        this.KIEV_OBL_REG = /KI\d{0,4}(?:EB|IK|KI|II|HH|MM|PP|OO|KA|AK|HO|KC|CC|XX|IC)/;
        this.ZAKARPATIE_REG = /KO\d{0,4}KC/;

        this.allNumbers = new Set();
        this.lastData = null;
    }

    getOneAtThe(numbers, num) {
        const filteredNumbers = [];

        numbers.forEach((number) => {
            const slicedNumber = number.slice(2, 6);

            if (slicedNumber === num) {
                filteredNumbers.push(number);
            }
        });
    
        return filteredNumbers;
    }

    getZeroEnd(numbers) {
        const filteredNumbers = numbers.filter((number) => {
            const filteredNumber = number.slice(2, 6);
    
            return filteredNumber.endsWith("00");
        });
    
        return filteredNumbers;
    }
    
    getSameLetters(numbers, letters) {
        const filteredNumbers = [];

        numbers.forEach((number) => {
            const slicedNumber = number.slice(6, 8);
    
            if (slicedNumber.toUpperCase() === letters.slice(2).toUpperCase()) {
                filteredNumbers.push(number);
            }
        });
    
        return filteredNumbers;
    }
    
    getAllSameLetters(numbers) {
        const filteredNumbers = [];

        numbers.forEach((number) => {
            const firstTwoLetters = number.slice(0, 2);
            const lastTwoLetters = number.slice(6, 8);

            if (firstTwoLetters === lastTwoLetters) {
                filteredNumbers.push(number);
            }
        });
    
        return filteredNumbers;
    }

    getAllMirrorLetters(numbers) {
        const filteredNumbers = [];

        numbers.forEach((number) => {
            const firstTwoLetters = number.slice(0, 2);
            const lastTwoLetters = number.slice(6, 8);

            if (firstTwoLetters === lastTwoLetters.split("").reverse().join("")) {
                filteredNumbers.push(number);
            }
        });
    
        return filteredNumbers;
    }
    
    findMatches(data) {
        const numbers = data.reduce((acc, el) => {
            acc[acc.length] = el.number;

            return acc;
        }, []);
        const result = {};
    
        result["....00.."] = this.getZeroEnd(numbers);
        result["0001"] = this.getOneAtThe(numbers, "0001");
        result["0010"] = this.getOneAtThe(numbers, "0010");
        result["0100"] = this.getOneAtThe(numbers, "0100");

        for (const sameLetter of sameLetters) {
            result[sameLetter] = this.getSameLetters(numbers, sameLetter);
        }

        result["same letters"] = this.getAllSameLetters(numbers);
        result["mirrored letters"] = this.getAllMirrorLetters(numbers);

        return result;
    }

    async fetchData() {
        try {
            const response = await axios.get(this.licensePlates_url);

            if (response.status !== 200) {
                throw new Error(`Failed to fetch HTML. Status: ${response.status}`);
            }
    
            const html = response.data;
            const $ = cheerio.load(html);
            const csrfToken = $(
                'input[type="hidden"][name="csrfmiddlewaretoken"]'
            ).val();
    
            if (!csrfToken) {
                throw new Error("CSRF token not found in HTML");
            }
    
            return csrfToken;
        } catch (error) {
            console.error("Error fetching HTML:", error);
            throw error;
        }
    }

    async postData(csrfToken) {
        try {
            const numbers = [];
            // Проходимо по всіх об'єктах у масиві tscList
            // await Promise.all(tscList.map(async (tscItem) => {
            for (const tscItem of tscList) {
    
                let data = qs.stringify({
                    'region': tscItem.region,
                    'tsc': tscItem.tscNumber,
                    'type_venichle': 'light_car_and_truck',
                    'number': '',
                    'csrfmiddlewaretoken': csrfToken
                });

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: this.licensePlates_url,
                    headers: {
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                        'Accept-Language': 'en,en-US;q=0.9,ru;q=0.8,uk;q=0.7',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Cache-Control': 'max-age=0',
                        'Connection': 'keep-alive',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Origin': 'http://opendata.hsc.gov.ua',
                        'Referer': 'http://opendata.hsc.gov.ua/check-leisure-license-plates/',
                        'Sec-Fetch-Dest': 'document',
                        'Sec-Fetch-Mode': 'navigate',
                        'Sec-Fetch-Site': 'same-origin',
                        'Sec-Fetch-User': '?1',
                        'Upgrade-Insecure-Requests': '1',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                        'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"'
                    },
                    data
                };
    
                const res = await axios.request(config);
    
                if (res.data) {
                    /*const $ = cheerio.load(res.data);
                    const tdElements = $("td");
                    tdElements.each((index, element) => {
                        const licensePlate = $(element).text().trim();

                        console.log(element)

                        if (this.LICENSE_PLATES_REG.test(licensePlate)) {
                            numbers.push(licensePlate);
                        }
                    });

                    console.log(numbers)*/

                    const $ = cheerio.load(res.data);

                    $('tr').each((index, element) => {
                        const cells = $(element).find('td');

                        if (cells.length > 0) {
                            const rowData = {
                                'number': $(cells[0]).text().trim(),
                                'price': $(cells[1]).text().trim(),
                                'tsc': $(cells[2]).text().trim()
                            };

                            numbers.push(rowData);
                        }
                    });
                }
            }

            return numbers;
        } catch (error) {
            console.log(error);

            return [];
        }
    }

    async findNewNumbers() {
        try {
            // get all numbers
            const csrfToken = await this.fetchData();
            const currentNumbers = await this.postData(csrfToken);

            if (currentNumbers.length === 0) return;

            // find new numbers
            const newNumbers = [];

            for (const el of currentNumbers) {
                if (!this.allNumbers.has(el.number)) {
                    this.allNumbers.add(el.number);

                    newNumbers.push(el);
                }
            }

            const data = {
                'All': [],
                'Odessa': [],
                'Ternopol': [],
                'Khmelnitskiy': [],
                'Vinnica': [],
                'Kiev': [],
                'Kiev_Obl': [],
                'Zakarpatie': []
            };

            let isEmpty = true;

            for (const el of newNumbers) {
                const { number } = el;

                if (this.ALL_REG.test(number)) {
                    data['All'].push(el);

                    isEmpty = false;
                }

                if (this.ODESSA_REG.test(number)) {
                    data['Odessa'].push(el);

                    isEmpty = false;
                }

                if (this.TERNOPOL_REG.test(number)) {
                    data['Ternopol'].push(el);

                    isEmpty = false;
                }

                if (this.KHMELNITSKIY_REG.test(number)) {
                    data['Khmelnitskiy'].push(el);

                    isEmpty = false;
                }

                if (this.VENEZIA_REG.test(number)) {
                    data['Vinnica'].push(el);

                    isEmpty = false;
                }

                if (this.KIEV_REG.test(number)) {
                    data['Kiev'].push(el);

                    isEmpty = false;
                }

                if (this.KIEV_OBL_REG.test(number)) {
                    data['Kiev_Obl'].push(el);

                    isEmpty = false;
                }

                if (this.ZAKARPATIE_REG.test(number)) {
                    data['Zakarpatie'].push(el);

                    isEmpty = false;
                }
            }

            if (!isEmpty) {
                const users = await userDBService.getAll({});

                const message = messages.results('ru', Object.entries(data));

                this.lastData = data;

                users.forEach((el) => sender.enqueue({
                    chat_id: el.chat_id,
                    message
                }));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

const opendataService = new Opendata();
opendataService.findNewNumbers();

setInterval(() => opendataService.findNewNumbers(), 60 * 1000);

module.exports = {
    opendataService
};