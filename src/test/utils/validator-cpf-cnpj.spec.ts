import { isValidCpfCnpj } from "./../../utils/validators-cpf-cnpj";

describe('validateCpfCnpj (uni)', () => {
  it('should return true for valid CPF', () => {
    const cpf = '877.106.720-51';
    expect(isValidCpfCnpj(cpf)).toBe(true);
  });

  it('should return true for valid CNPJ', () => {
    const cnpj = '91.492.883/0001-50';
    expect(isValidCpfCnpj(cnpj)).toBe(true);
  });

  it('should return false for invalid CPF', () => {
    const invalidCpf = '12345';
    expect(isValidCpfCnpj(invalidCpf)).toBe(false);
  });

  it('should return false for invalid CNPJ', () => {
    const invalidCnpj = '12345';
    expect(isValidCpfCnpj(invalidCnpj)).toBe(false);
  });

  it('should return false for an empty string', () => {
    const empty = '';
    expect(isValidCpfCnpj(empty)).toBe(false);
  });

  it('should return false for non-numeric values', () => {
    const nonNumeric = 'abc123';
    expect(isValidCpfCnpj(nonNumeric)).toBe(false);
  });
});
