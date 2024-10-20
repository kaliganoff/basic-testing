// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(2000);
    expect(account.getBalance()).toBe(2000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(2000);
    expect(() => account.withdraw(3000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(2000);
    const account2 = getBankAccount(2000);
    expect(() => account.transfer(3000, account2)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(2000);
    expect(() => account.transfer(3000, account)).toThrow();
    });

  test('should deposit money', () => {
    const account = getBankAccount(2000);
    account.deposit(3000);
    expect(account.getBalance()).toBe(5000);
    });

  test('should withdraw money', () => {
    const account = getBankAccount(2000);
    account.withdraw(1000);
    expect(account.getBalance()).toBe(1000);
    });

  test('should transfer money', () => {
    const account = getBankAccount(2000);
    const account2 = getBankAccount(2000);
    account.transfer(2000, account2);
    expect(account2.getBalance()).toBe(4000);
    });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(2000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(8);
    const result = await account.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(2000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(8);
    await account.synchronizeBalance();
    const result = account.getBalance();
    expect(result).toBe(8);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(2000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
    });
});
