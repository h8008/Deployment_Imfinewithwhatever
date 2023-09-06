const util = require('util')
const { exec } = require('node:child_process')
const fs = require('fs')
require('dotenv').config({path: '../.env'})

const mariadbUserPw = process.env.DB_USERPASSWORD
const execProm = util.promisify(exec)

// const connectOptions = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
//     connect_timeout:10000,
    
// }

// console.log(connectOptions)

const getDir = () => {
    return new Promise((resolve, reject) => {
        const servername = __dirname.split("\\").slice(0, -2).join("\\")
        const querydirname = "cs470_draught_services_table_dumps\\cs470_draught_services_table_dumps"
        return resolve(servername + "\\" + querydirname)
    })
}

const readQueries = (dir) => {
    console.log("reading queries")
    return new Promise((resolve, reject) => {
        fs.readdir(dir, { encoding: 'utf-8'}, (err, files) => {
            if (err) {
                console.log('errors while getting directory: ' + err)
                return
            }
            return resolve(files)
        })
    })
}

const seedDB = (queries) => {
    console.log('seeding db')
    return new Promise(async (resolve, reject) => {
        if (mariadbUserPw === undefined) {
            console.log('no password found')
            return
        }

        const count = 0
        let result
        await queries.forEach(async (query) => {
            try {
                const dir = await getDir()
                const file = dir + '\\' + query
                const command = `mariadb -u hui -p draught_services < ${file}`
                const arg = [mariadbUserPw]
                result = await execProm(`${command}`, arg, function(err) {
                    if (err) {
                        reject(err)
                    }
                })
            } catch (exec_err) {
                if (exec_err) {
                    console.log(exec_err)
                    reject(exec_err)
                }
            }
        })
        return resolve(console.log('db seeded'))
    })
}

const main = async () => {
    const dir = await getDir()
    const queries = await readQueries(dir)
    await seedDB(queries)
}

main()
