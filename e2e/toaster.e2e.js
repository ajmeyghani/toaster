import { Selector, ClientFunction } from "testcafe";
import { toast, verifyPageTitle, verifyToast } from "./helpers.js";

const dev1Url = "http://localhost:8080/gh-pages/index.dev.html";
const dev2Url = "http://localhost:8080/gh-pages/index.dev2.html";
const dev3Url = "http://localhost:8080/gh-pages/index.dev3.html";
const dev4Url = "http://localhost:8080/gh-pages/index.dev4.html";

fixture`Dev1:`.page(dev1Url);

test("page title should be dev1", async t => {
  await verifyPageTitle(t, "dev1");
});

test("success toast should should show up.", async t => {
  await verifyToast(t);
});

fixture`Dev2:`.page(dev2Url);

test("page title should be dev2", async t => {
  await verifyPageTitle(t, "dev2");
});

test("success toast should should show up.", async t => {
  await verifyToast(t);
});

fixture`Dev3:`.page(dev3Url);

test("page title should be dev3", async t => {
  await verifyPageTitle(t, "dev3");
});

test("success toast should should show up.", async t => {
  await verifyToast(t);
});

fixture`Dev4:`.page(dev4Url);

test("page title should be dev4", async t => {
  await verifyPageTitle(t, "dev4");
});

test("success toast should should show up.", async t => {
  await verifyToast(t);
});
