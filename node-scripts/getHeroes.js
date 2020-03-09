const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'https://www.marvel.com/characters';
const powerPageSuffix = '/in-comics/profile';
const urlBase = 'https://www.marvel.com';

const fetchData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});

    let hrefs = await page.evaluate(() => {
        const hrefs = [];
        const heroCards = document.querySelectorAll('.mvl-card');
        for (const card of heroCards) {
            const heroData = card.querySelector('.explore__link');
            const heroHref = heroData.href;
            hrefs.push(heroHref);
        }
        return hrefs;
    });

    const heroes = [];
    for (const href of hrefs) {
        if (heroes.length >= 12) {
            continue;
        }
        // Get the in-comics link
        console.log('Navigate to ' + href);
        await page.goto(href, {waitUntil: 'networkidle2'});
        const heroInitialData = await page.evaluate(() => {
            try {
                const heroName = document.querySelector('.masthead__headline').textContent;
                const name = document.querySelector('.masthead__eyebrow').textContent;
                const description = document.querySelector('.masthead__copy').textContent;
                let backgroundImageUrl = document.querySelector('.built__background').style.backgroundImage;
                if (backgroundImageUrl) {
                    backgroundImageUrl = backgroundImageUrl.replace('url("', '');
                    backgroundImageUrl = backgroundImageUrl.replace('")', '');
                }
                const navTabContainer = document.querySelector('.masthead__tabs-wrapper');
                const navTabs = navTabContainer.querySelectorAll('.masthead__tabs__link');
                let comicsTab;
                for (const tab of navTabs) {
                    if (tab && tab.href && tab.href.includes('/in-comics/')) {
                        comicsTab = tab;
                    }
                }
                if (comicsTab && comicsTab.href) {
                    return {
                        name,
                        heroName,
                        description,
                        backgroundImageUrl,
                        comicsHref: comicsTab.href,
                    };
                } else {
                    return {error: 'No comics href found'};
                }
            } catch (e) {
                return {error: e};
            }
        });
        console.log(`Initial Data for Hero ${heroInitialData.heroName}`);
        console.log('Hero in comics profile link is ' + heroInitialData.comicsHref);
        if (heroInitialData && heroInitialData.comicsHref) {
            await page.goto(heroInitialData.comicsHref, 'networkidle2');
        } else {
            console.error('Failed to get hero initial data, due to ' + JSON.stringify(heroInitialData.error));
            continue;
        }
        const heroExtraData = await page.evaluate(() => {
            const powers = [];
            try {
                const imageSection = document.getElementById('masthead-1');
                let backgroundImageUrl = imageSection.querySelector('.built__background').style.backgroundImage;
                if (backgroundImageUrl) {
                    backgroundImageUrl = backgroundImageUrl.replace('url("', '');
                    backgroundImageUrl = backgroundImageUrl.replace('")', '');
                }
                const powerSection = document.getElementById('sets-4');
                const powerButtonDiv = powerSection.querySelector('.tabs__div');
                const powerButtons = powerButtonDiv.querySelectorAll('a');
                for (const powerButton of powerButtons) {
                    powerButton.click();
                    const powerName = powerSection.querySelector('.sets__title').textContent;
                    const powerDescription = powerSection.querySelector('.sets__description').textContent;
                    let powerBackgroundImage = powerSection.querySelector('.built__background').style.backgroundImage;
                    if (powerBackgroundImage) {
                        powerBackgroundImage = powerBackgroundImage.replace('url("', '');
                        powerBackgroundImage = powerBackgroundImage.replace('")', '');
                    }
                    powers.push({
                        powerName,
                        powerDescription,
                        powerBackgroundImage,
                    })
                }
                return {
                    backgroundImageUrl,
                    powers,
                }
            } catch (e) {
                return {error: e};
            }
        });
        if (heroExtraData && heroExtraData.error) {
            console.error('Failed to fetch hero powers, due to ' + JSON.stringify(heroExtraData.error));
        }
        const hero = {
            name: heroInitialData.name,
            heroName: heroInitialData.heroName,
            description: heroInitialData.description,
            backgroundImageUrl: heroExtraData.backgroundImageUrl,
            powers: heroExtraData.powers,
        };
        console.error(hero);
        heroes.push(hero);
    fs.writeFile('heroes.json', JSON.stringify(heroes, null, 2), 'utf8', function (err) {
        if (err) {
            console.error(err);
        }
    });

    await browser.close();
};

fetchData();
