const app = require('./App')
require("dotenv").config({ path: "./.env" });

const port = process.env.NODE_ENV === "production" ? 3076 : 8880;

app.listen(port, () => {
    console.log(`listining to port ${port}`);
})

