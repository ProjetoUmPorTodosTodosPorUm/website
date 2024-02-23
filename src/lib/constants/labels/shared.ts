export const SHARED = {
    yup: {
        required: (field: string) => `${field} é um campo obrigatório.'`,
        oneOf: (field: string) => `Você deve escoher um dentre os valores: ${field}`,
        minString: (field: string, length: number) => `${field} deve ter no mínimo ${length} caracteres.`,
        maxString: (field: string, length: number) => `${field} deve ter no máximo ${length} caracteres.`,
        minNumber: (field: string, value: number) => `${field} deve ser no mínimo ${value}.`,
        maxNumber: (field: string, value: number) => `${field} deve ser no máximo ${value}.`,
        number: (field: string) => `${field} deve ser um número válido.`,
        integer: (field: string) => `${field} deve ser um número inteiro.`,
        email: (field: string) => `${field} deve ser um e-mail válido.`,
    }
}