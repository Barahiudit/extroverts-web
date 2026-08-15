type ClassValue = string | number | boolean | undefined | null | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const process = (value: ClassValue) => {
    if (!value) return;
    if (typeof value === "string" || typeof value === "number") {
      classes.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(process);
    }
  };

  inputs.forEach(process);
  return classes.join(" ");
}