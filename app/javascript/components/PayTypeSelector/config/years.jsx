export const currentYear = new Date().getFullYear();

export const startYear = currentYear - 5;

export const endYear = currentYear + 6;

export const years = Array.from({ length: endYear - startYear }, (v, k) => startYear + k);
