const oracledb = require('oracledb')

const connectToOracleDB = async (query) => {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: process.env.AWL_SF_DEV_USER,
            password: process.env.AWL_SF_DEV_PASSWORD,
            connectString: process.env.AWL_SF_DEV_CONNECTION_STRING,
        });
        const result = await connection.execute(query);
        connection.commit()

        return result
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = connectToOracleDB
