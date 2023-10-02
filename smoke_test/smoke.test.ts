import fetch from 'node-fetch'
const domain = "http://localhost:8080"
const landingDomain = "http://localhost:5000/dota2"

// some utility functions
async function hasRedirect(from:string, to:string) {
  const res = await fetch(from, {method:"GET"});
  expect(res.status).toEqual(301);
  expect(res.headers.get("location")).toEqual(to);
}

async function isOk(url:string) {
  const res = await fetch(url, {method:"GET"});
  expect(res.status).toEqual(200);
}

// our tests
describe("landing", () => {
  test.concurrent("non-www/non-https redirects to landing", async () => {
    await hasRedirect(`http://${domain}`, `https://${domain}/`);
    await hasRedirect(
      `https://${domain}`,
      `https://${landingDomain}/index.html`
    );
  });
  test.concurrent("landing is ok", async () => {
    await isOk(`https://${landingDomain}`);
  });
  test.concurrent("landing https redirect", async () => {
    await hasRedirect(`http://${landingDomain}`, `https://${landingDomain}/`);
  });
});