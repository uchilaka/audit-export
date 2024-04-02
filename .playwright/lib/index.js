const { devices } = require('@playwright/test')
const {
  WEB_BROWSER,
  PLAYWRIGHT_ENABLE_FIREFOX_BROWSER,
  PLAYWRIGHT_ENABLE_WEBKIT_BROWSER
} = process.env

function usingSetting(value) {
  return /^Y(es)?|^T(rue)/i.test(value)
}

function inDevelopment() {
  return process.env.NODE_ENV === "development"
}

function getBrowserConfig() {
  const config = [];
  if (inDevelopment() || WEB_BROWSER === 'firefox' || usingSetting(PLAYWRIGHT_ENABLE_FIREFOX_BROWSER)) {
    config.push({
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    })
  }
  if (inDevelopment() || WEB_BROWSER === 'webkit' || usingSetting(PLAYWRIGHT_ENABLE_WEBKIT_BROWSER)) {
    config.push({
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    })
  }
  if(inDevelopment() || WEB_BROWSER === 'chromium' || config.length < 1) {
    config.push({
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    })
  }
  return config
}

module.exports = {
  usingSetting,
  getBrowserConfig
}
