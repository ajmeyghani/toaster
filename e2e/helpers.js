import { t, Selector } from "testcafe";

async function toast(type) {
  await t.click(`#test-${type}-button`);
}

const verifyToast = async (t) => {
  await toast("success");
  await t
    .expect(Selector(".ajmtoaster__title").with({boundTestRun: t}).innerText)
    .eql("Success!");
};

const verifyPageTitle = async (t, title) => {
  await t.expect(Selector("title").innerText).eql(title);
}

export { toast, verifyToast, verifyPageTitle };
