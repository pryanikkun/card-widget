import puppeteer from 'puppeteer';

describe('Card Form', () => {
  let browser;
  let page;

  beforeEach(async() => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  test('Form should render on page start', async() => {
    await page.goto('http://localhost:9000');
    await page.waitForSelector('.card-number-form-widget');
  });

  jest.setTimeout(50000);

  test('Form input should add .valid class if number is valid', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForSelector('.card-number-form-widget');

    const form = await page.$('.card-number-form-widget');
    const input = await form.$('.input');
    const submit = await form.$('.submit');

    await input.type('371449635398431');
    await submit.click();

    await page.waitForSelector('.card-number-form-widget .input.valid');
  });
  afterEach(async() => {
    await browser.close();
  });
});
