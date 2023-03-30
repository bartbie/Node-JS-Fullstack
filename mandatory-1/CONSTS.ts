export const SIDEBAR = [
  { text: "Introduction", filename: "introduction" },
  { text: "Express JS", filename: "express-js" },
  { text: "Astro", filename: "" },
  { text: "SSR", filename: "" },
  { text: "About", filename: "" },
] as const;

// this is *obviously* not how you're supposed to do real auth
// use oAuth or your own DB instead
export const LOGINS: {user: string, password: string}[] = [
  {user: "bartbie", password:"bartbie"} // very secure!
];