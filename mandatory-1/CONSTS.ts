export const SIDEBAR = [
  { text: "Introduction/About", filename: "introduction" },
  { text: "Express.js", filename: "express-js" },
  { text: "Astro", filename: "" },
  { text: "SSR", filename: "" },
] as const;

// this is *obviously* not how you're supposed to do real auth
// use oAuth or your own DB instead
export const LOGINS: {user: string, password: string}[] = [
  {user: "bartbie", password:"bartbie"} // very secure!
];