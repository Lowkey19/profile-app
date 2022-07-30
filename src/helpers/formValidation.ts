export const hasEmptyFields = (f: Array<string | undefined>): boolean => {
  for (const s of f) {
    if (s === undefined || s === null || s.trim() === '') return true;
  }
  return false;
}