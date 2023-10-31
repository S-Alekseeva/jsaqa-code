const { clickElement, getText } = require("./lib/commands.js");
const puppeteer = require("puppeteer");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Ticket booking test", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("Successful booking of one ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(2)");
    await clickElement(page, "[data-seance-id='174']");
    await clickElement(page, ".buying-scheme__row > span:nth-child(5)");
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Successful booking of two ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(2)");
    await clickElement(page, "[data-seance-id='174']");
    await clickElement(page, ".buying-scheme__row > span:nth-child(6)");
    await clickElement(page, ".buying-scheme__row > span:nth-child(7)");
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Booking already booked ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(2)");
    await clickElement(page, "[data-seance-id='174']");
    await clickElement(page, ".buying-scheme__row > span:nth-child(6)");
    await clickElement(page, ".buying-scheme__row > span:nth-child(7)");
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});
