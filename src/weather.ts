export const Weather = {
  Fine: { value: "fine" },
  Snow: { value: "snow" },
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];
