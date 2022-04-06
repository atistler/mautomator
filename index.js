const inquirer = require('inquirer');
const _ = require('lodash')
const {format, set} = require('date-fns')
var ncp = require("copy-paste");

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
inquirer.registerPrompt('search-list', require('inquirer-search-list'));
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))

const stores = [
    {
        name: '523 - Nordstrom at the Westchester',
        value: {address: `Nordstrom at the Westchester\n135 Westchester Ave.\nWhite Plains, NY 10601`, isRack: false}
    },
    {
        name: '538 - Nordstrom Sono Collection',
        value: {address: `Nordstrom Sono Collection\n100 N Water St Suite A\nNorwalk, CT 06854`, isRack: false}
    },
    {
        name: '539 - Nordstrom Rack Bergen Town Center',
        value: {address: `Nordstrom Rack Bergen Town Center\n510 Bergen Town Center\nParamus, NJ 07652`, isRack: true}
    },
    {
        name: '646 - Nordstrom Rack Rockaway',
        value: {address: `Nordstrom Rack Rockaway\n343 Mt Hope Ave\nRockaway, NJ 07866`, isRack: true}
    },
    {
        name: '647 - Nordstrom Rack Livingston Center',
        value: {
            address: `Nordstrom Rack Livingston Center\n530 W Mt. Pleasant Ave.\nLivingston, NJ 07039`,
            isRack: true
        }
    },
    {
        name: '650 - Nordstrom Rack Eatontown',
        value: {address: `Nordstrom Rack Eatontown\n231 Highway 35\nEatontown, NJ`, isRack: true}
    },
    {
        name: '651 - Nordstrom Rack Chimney Rock',
        value: {address: `Nordstrom Rack Chimney Rock\n362 Chimney Rock Rd\nBound Brook, NJ 08805`, isRack: true}
    },
    {
        name: '548 - Nordstrom Rack Manhasset Center',
        value: {address: `Nordstrom Rack Manhasset Center\n1400 Northern Blvd\nManhasset, NY 11030`, isRack: true}
    }
]

const buildEmail = (applicantName, when, store) => `Hello ${applicantName}!

We are excited to meet you ${format(when, "cccc MMMM Do 'at' h:mm a")}${store.isRack ? ' for your interview.' : '.  Please go to the Service Bar on the first floor to check in for your interview.'}

Our address is: 

Nordstrom Sono Collection
100 N Water St Suite A, Norwalk, CT 06854


Regards,
Nordstrom Recruiting

`

inquirer
    .prompt([
        {
            type: 'input',
            name: 'applicantName',
            message: 'Applicant name:',
        },
        {
            type: 'datetime',
            name: 'when',
            message: 'When:',
            format: ['m', '/', 'd', ' ', 'h', ':', 'MM', ' ', 'TT'],
        },
        {
            type: 'search-list',
            name: 'store',
            message: 'Store:',
            choices: stores
        }
    ])
    .then(answers => {
        const {when, applicantName, store} = answers
        const email = buildEmail(applicantName, when, store)
        console.log(email)
        ncp.copy(email, () => {
            process.exit()
        })
    });