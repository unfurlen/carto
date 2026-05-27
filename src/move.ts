export const Move = { North: "n", East: "e", South: "s", West: "w" } as const;
export type Move = (typeof Move)[keyof typeof Move];
