const puppeteer = require("puppeteer");
const fs_1 = require("fs");
const path_1 = require("path");
function getHeroes() {
    return __awaiter(this, void 0, void 0, function* () {
        console.error('Start fetching data');
        const START_URL = "https://scrapethissite.com/pages/forms/";
        const heroes = [];
        const browser = yield puppeteer.launch({
            headless: true
        });
        const page = yield browser.newPage();
        yield page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
        console.log('Getting heroes from website', START_URL);
        yield page.goto(START_URL);
        const evaluateFunction = () => {
            const grabFromRow = (row, classname) => row.querySelector(`td.${classname}`).innerText.trim();
            const TEAM_ROW_SELECTOR = 'tr.team';
            const data = [];
            const teamRows = document.querySelectorAll((TEAM_ROW_SELECTOR));
            for (const tr of teamRows) {
                data.push({
                    name: grabFromRow(tr, 'name'),
                    year: grabFromRow(tr, 'year'),
                    wins: grabFromRow(tr, 'wins'),
                    losses: grabFromRow(tr, 'losses'),
                });
            }
            return data;
        };
        const teams = yield page.evaluate(evaluateFunction);
        console.log(teams);
        yield browser.close();
        fs_1.writeFile(path_1.resolve(__dirname, "../heroes.json"), JSON.stringify(heroes, null, 2), err => {
            if (err) {
                throw err;
            }
            console.log("Finished writing file");
        });
    });
}
getHeroes();
