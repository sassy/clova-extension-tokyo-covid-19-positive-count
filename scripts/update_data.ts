import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";

const filename = path.join(__dirname, '../lambda', 'daily_positive_detail.json');

fetch('https://raw.githubusercontent.com/tokyo-metropolitan-gov/covid19/development/data/daily_positive_detail.json',
    {method: "GET"})
    .then((response => {
        response.body.pipe(fs.createWriteStream(filename));
    }))
    .catch((error) => console.error(error));