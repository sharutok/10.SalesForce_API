const app = require('./App')
require("dotenv").config({ path: "./.env" });

const port = 8880

app.listen(port, () => {
    console.log(`listining to port ${port}`);
})

