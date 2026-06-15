export const Weather = {
  Fine: { value: "fine" },
  Snow: { value: "snow" },
  Rain: { value: "rain" },
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];
