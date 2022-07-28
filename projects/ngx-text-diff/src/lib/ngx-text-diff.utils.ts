export const isNil = (val: unknown) => val === undefined || val === null;
export const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length || (Object.keys(val) || val).length === 0;
