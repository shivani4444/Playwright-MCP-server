import { test } from '@playwright/test';
//import { readFileSync } from 'node:fs';
//import { resolve } from 'node:path';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { QuickTransactionPage } from '../pages/QuickTransactionPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';
import config from '../config.json'
import transferTestData from '../test-data/Transfer_TestData.json';
//
test('Verify Quick Transactions Flow', async ({ page }) => {
  test.setTimeout(60_000);

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const quickTransactionPage = new QuickTransactionPage(page);
  const transactionHistoryPage = new TransactionHistoryPage(page);

  await loginPage.open(config.url);
  await loginPage.login(config.username, config.password, config.appName);
  await homePage.expectBankingApplication();

  await homePage.openQuickTransactions();
  await quickTransactionPage.selectTransferType(transferTestData.transactionType);
  await quickTransactionPage.fillTransferDetails(
    transferTestData.amount,
    transferTestData.destinationAccount,
    transferTestData.description,
  );
  await quickTransactionPage.submit();
  await quickTransactionPage.confirm();

  const transactionReference = await quickTransactionPage.getTransactionReference();

  // The confirmation reference must also be present in transaction history.
  await transactionHistoryPage.openFromTransactionConfirmation();
  await transactionHistoryPage.expectTransactionReference(transactionReference);
});

test('Verify Tab Names in Homepage', async ({ page }) => {
  test.setTimeout(60_000);

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.open(config.url);
  await loginPage.login(config.username, config.password, config.appName);
  await homePage.expectBankingApplication();
  await homePage.expectHomeTabs();
});