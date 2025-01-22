export function isValidCpfCnpj(cpfCnpj: string): boolean {
    const cleanCpfCnpj = cpfCnpj.replace(/[^\d]+/g, '');

    if (cleanCpfCnpj.length === 11) {
        return validateCpf(cleanCpfCnpj);
    } else if (cleanCpfCnpj.length === 14) {
        return validateCnpj(cleanCpfCnpj);
    }

    return false;
}

export function validateCpf(cpf: string): boolean {
    let sum = 0;
    let remainder: number;

    if (cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' || cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' || cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' || cpf === '99999999999') {
        return false;
    }

    for (let i = 0; i < 9; i++) {
        sum += Number(cpf[i]) * (10 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (Number(cpf[9]) !== remainder) {
        return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += Number(cpf[i]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (Number(cpf[10]) !== remainder) {
        return false;
    }

    return true;
}
export function validateCnpj(cnpj: string): boolean {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]+/g, '');

    // Verifica se a string tem 14 dígitos
    if (cnpj.length !== 14) {
        return false;
    }

    // CNPJ não pode ser uma sequência de números iguais
    if (/^(.)\1{13}$/.test(cnpj)) {
        return false;
    }

    // Valida o primeiro dígito verificador
    let sum = 0;
    let weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) {
        sum += Number(cnpj[i]) * weight[i];
    }
    let remainder = sum % 11;
    if (remainder < 2) {
        remainder = 0;
    } else {
        remainder = 11 - remainder;
    }
    if (Number(cnpj[12]) !== remainder) {
        return false;
    }

    // Valida o segundo dígito verificador
    sum = 0;
    weight = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 13; i++) {
        sum += Number(cnpj[i]) * weight[i];
    }
    remainder = sum % 11;
    if (remainder < 2) {
        remainder = 0;
    } else {
        remainder = 11 - remainder;
    }
    if (Number(cnpj[13]) !== remainder) {
        return false;
    }

    return true;
}
