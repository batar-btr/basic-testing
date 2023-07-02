// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const initBalance = 12345;
const bankAccount = getBankAccount(initBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(initBalance + 123)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccount.transfer(initBalance + 123, new BankAccount(333)),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(initBalance - 1, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const toDeposit = 235;
    bankAccount.deposit(toDeposit);
    expect(bankAccount.getBalance()).toBe(initBalance + toDeposit);
  });

  test('should withdraw money', () => {
    const currentMoney = bankAccount.getBalance();
    const withdrawMoney = 10;
    expect(bankAccount.withdraw(10).getBalance()).toBe(
      currentMoney - withdrawMoney,
    );
  });

  test('should transfer money', () => {
    const receiver = new BankAccount(100);
    bankAccount.transfer(100, receiver);
    expect(receiver.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await bankAccount.fetchBalance();
    if (typeof result === 'number') {
      expect(typeof result).toBe('number');
    } else {
      expect(result).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const result = await bankAccount.fetchBalance();
    if (typeof result === 'number') {
      const currentNumber = bankAccount.getBalance();
      expect(bankAccount.deposit(result - currentNumber).getBalance()).toBe(
        result,
      );
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
