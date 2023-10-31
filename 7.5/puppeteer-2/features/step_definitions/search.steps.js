const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client/${string}`, {
    setTimeout: 20000,
  });
});

When("user choose day", async function () {
  await clickElement(this.page, ".page-nav > a:nth-child(2)");
});
When("user choose movie and time", async function () {
  await clickElement(this.page, "[data-seance-id='174']");
});
When("user select 1 row 5 seat", async function () {
  await clickElement(this.page, ".buying-scheme__row > span:nth-child(5)");
});
When("user select 1 row 6 seat", async function () {
  await clickElement(this.page, ".buying-scheme__row > span:nth-child(6)");
});
When("user select 1 row 7 seat", async function () {
  await clickElement(this.page, ".buying-scheme__row > span:nth-child(7)");
});
When("user select the booked 6 seat", async function () {
  await clickElement(this.page, ".buying-scheme__row > span:nth-child(6)");
});
When("user select the booked 7 seat", async function () {
  await clickElement(this.page, ".buying-scheme__row > span:nth-child(7)");
});
When("user click button", async function () {
  await clickElement(this.page, "button.acceptin-button");
});
When("user click receive QR", async function () {
  await clickElement(this.page, "button.acceptin-button");
});
Then("user see text {string}", async function (string) {
  const actual = await getText(this.page, "p.ticket__hint");
  const expected = await string;
  expect(actual).contains(expected);
});
Then("user see button disabled {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});

When("user search by {string}", async function (string) {
  return await putText(this.page, "input", string);
});

Then("user sees the course suggested {string}", async function (string) {
  const actual = await getText(this.page, "a[data-name]");
  const expected = await string;
  expect(actual).contains(expected);
});
