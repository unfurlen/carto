export const Weather = {
  Fine: { value: "fine" },
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];
