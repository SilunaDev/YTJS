const puppeteer = require('puppeteer');

async function fetchCookies() {
    // Launch Puppeteer browser in headless mode
    const browser = await puppeteer.launch({
        headless: false, // Set to true if you don't want the browser window to open
    });

    const page = await browser.newPage();

    // Navigate to YouTube
    await page.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' });

    // If necessary, log in to YouTube (you can automate login by providing credentials)
    // Uncomment and modify the below lines for automated login
    /*
    await page.click('button[aria-label="Sign in"]');
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', 'YOUR_EMAIL');
    await page.click('button[jsname="LgbsSe"]'); // Click Next button
    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', 'YOUR_PASSWORD');
    await page.click('button[jsname="LgbsSe"]'); // Click Next button
    */

    // Wait until the page is fully loaded (YouTube logged in or main page)
    await page.waitForSelector('ytd-masthead');

    // Get the cookies from the page
    const cookies = await page.cookies();

    // Print the cookies to the console (you can also save them to a file)
    console.log('Cookies:', cookies);

    // You can save cookies to a JSON file
    const fs = require('fs');
    fs.writeFileSync('youtube_cookies.json', JSON.stringify(cookies));

    // Close the browser
    await browser.close();
}

fetchCookies().catch(err => console.error('Error:', err));
