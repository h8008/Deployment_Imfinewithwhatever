const mysql = require('mysql')
const fs = require('fs')
const path = require('path')

require('dotenv').config({path: '../.env'})

// const targetdir = "cs470_draught_services_table_dumps/cs470_draught_services_table_dumps"
// const dir = path.basename(__dirname) + '/' + targetdir

const servername = __dirname.split("\\").slice(0, -2).join("\\")
const querydirname = "cs470_draught_services_table_dumps\\cs470_draught_services_table_dumps"
const dir = servername + "\\" + querydirname

// const dir = "../../cs470_draught_services_table_dumps/cs470_draught_services_table_dumps"

console.log(dir)

const readQueries = () => {
    console.log("reading queries")
    let queryFiles = []
    return new Promise((resolve, reject) => {
            fs.readdir(dir, { encoding: 'utf-8'}, (err, files) => {
                if (err) {
                    console.log('errors while getting directory: ' + err)
                    return
                }
                // queryFiles = files
                return resolve(files)
            }
            )
        })
}

const seedDB = (connection, queries) => {

    return new Promise(async (resolve, reject) => {
            console.log("seeding db")
            console.log('queries', queries)
            await connection.connect()
            await queries.forEach((file, index) => {
                if (index === 0) {
                    const queryName = dir + '\\' + file

                    const query = fs.readFileSync(queryName, { encoding: 'utf-8' }, (err) => {
                        if (err) {
                            console.log(queryName)
                            console.log(err)
                        }
                    })

                    connection.query(query, err => {
                        if (err) {
                            throw err
                        }
                    })
                }
            })
            connection.end()
            return resolve(console.log('database seeded'))
    })
}

const connectOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connect_timeout:10000,
}

// console.log(connectOptions)
// const connection = mysql.createConnection(connectOptions)
// connection.connect()


const main = async () => {

    const connection = mysql.createConnection(connectOptions)
    const queries = await readQueries()
    const result = await seedDB(connection, queries)

}

main()
