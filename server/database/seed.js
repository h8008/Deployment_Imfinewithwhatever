require('../loadEnvVariable.js')
const fs = require('fs')
const path = require('path')
const connection = require('./mySQLconnect.js')

const rootDir = path.resolve('.')
const serverDir = "server";
const databaseDir = "database"
const databaseInitFileDir = path.normalize("sqlFiles/InitializeDatabase.sql")
const seedFilesDir = path.normalize("sqlFiles/seedFiles")

const sqlFilesDir = rootDir + '/' + serverDir + '/' + databaseDir
const seedFilesPath = path.join(sqlFilesDir + '/' + seedFilesDir + '/')
const databaseInitFilePath = path.join(sqlFilesDir + '/' + databaseInitFileDir + '/')

const databaseInitQuery = require('./sqlFiles/InitializeDatabase.js')
const queries = require('./sqlFiles/seedFiles/index.js')

const curryQuery = (query) => {
    return new Promise((resolve, reject) => {
        const res = query.split('; \n').join(';').split('\n').join('').split(";").filter((query) => query !== '').filter((query) => query.trim() != '')
        return resolve(res)
    })
}

const seedDatabase = () => {
    return new Promise((resolve, reject) => {
        try {
            queries.forEach(async (query) => {
                const curriedQueryArray = await curryQuery(query)
                console.log("curriedQueryArray", curriedQueryArray)
                await curriedQueryArray.map((query) => {
                    try {
                        connection.query(query)
                    } catch (err) {
                        reject(err)
                    }
                })
                return resolve('done')
            })
        } catch (err) {
            reject(err)
        }
    })
}

const initDatabase = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const curriedQueryArray = await curryQuery(databaseInitQuery)
            console.log(curriedQueryArray)
            await curriedQueryArray.map((query) => {
                try {
                    const trimmedQuery = query.trim()
                    connection.query(trimmedQuery)
                } catch (err) {
                    reject(err)
                }
            })
            return resolve('done')
        } catch (err) {
            reject(err)
        }
    })
}

// const readQueries = () => {
//     console.log("reading queries")
//     let queryFiles = []
//     return new Promise((resolve, reject) => {
//             fs.readdir(dir, { encoding: 'utf-8'}, (err, files) => {
//                 if (err) {
//                     console.log('errors while getting directory: ' + err)
//                     return
//                 }
//                 // queryFiles = files
//                 return resolve(files)
//             }
//             )
//         })
// }

// console.log(readQueries())

// const seedDB = (connection, queries) => {

//     return new Promise(async (resolve, reject) => {
//             console.log("seeding db")
//             console.log('queries', queries)
//             await connection.connect()
//             await queries.forEach((file, index) => {
//                 if (index === 0) {
//                     const queryName = dir + '\\' + file

//                     const query = fs.readFileSync(queryName, { encoding: 'utf-8' }, (err) => {
//                         if (err) {
//                             console.log(queryName)
//                             console.log(err)
//                         }
//                     })

//                     connection.query(query, err => {
//                         if (err) {
//                             throw err
//                         }
//                     })
//                 }
//             })
//             connection.end()
//             return resolve(console.log('database seeded'))
//     })
// }

// const connectOptions = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
//     connect_timeout:10000,
// }

// console.log(connectOptions)
// const connection = mysql.createConnection(connectOptions)
// connection.connect()


const seed = () => {
    return new Promise((resolve, reject) => {
        return resolve(seedDatabase())
    })
}

const main = async () => {

    // // const connection = mysql.createConnection(connectOptions)
    // await connection.connect(async (err) => {
    //     if (err) {
    //         console.log(err, "exiting")
    //         process.exit(1)
    //     } else {
    //         const res = await readQueries()
    //     }
    // })
    // // const queries = await readQueries()
    // // console.log(queries)
    // // const result = await seedDB(connection, queries)

    // const res = await seed()
    // if (res === 'done') {
    //     console.log('exiting')
    //     await closeConnection()
    // }

    connection.connect()
    await initDatabase()
    await seedDatabase()
    connection.end()
}

main()
