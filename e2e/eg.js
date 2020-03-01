import { Selector, ClientFunction } from "testcafe";
const getPageUrl = ClientFunction(() => window.location.href);
const byTag = Selector(tag => document.getElementsByTagName(tag));

fixture`Getting Started`.page`http://devexpress.github.io/testcafe/example`;

test("My first test", async t => {
  await t
    .typeText("#developer-name", "John Smith")
    .click("#submit-button")
    .expect(Selector("#article-header").innerText)
    .eql("Thank you, John Smith!");
});

fixture`hello world`.page`http://localhost:8080/gh-pages/index.dev.html`;

test("docs page should show up", async t => {
  await t.expect(Selector("title").innerText).eql("Vanilla Toasters");
});

test("check title using client function:", async t => {
  const elm = await byTag("title");
  await t.expect(elm.textContent).eql("Vanilla Toaster");
});

test("docs page should show up", async t => {
  await t
    .click("#test-success-button")
    .expect(Selector(".ajmtoaster__title").innerText)
    .eql("Success!");
});
