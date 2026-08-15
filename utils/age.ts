export function calculateAge(dd: string, mm: string, yyyy: string): number {
  const today = new Date();
  const birth = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd));
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
}