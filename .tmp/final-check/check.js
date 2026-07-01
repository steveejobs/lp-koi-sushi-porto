const fs = require("fs");
const files = [
  "app/instagram/page.tsx",
  "components/InstagramMenuTakeAwaySection.tsx",
  "components/InstagramCircularMenuGallery.tsx",
  "components/InstagramVideoMoment.tsx",
  "components/InstagramTestimonialsMarquee.tsx",
  "src/data/chambar-testimonials.ts",
];
const forbidden = ["Ã", "Â", "â", "PÃ", "peÃ", "alt=\"Image\""];
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const bad = forbidden.filter((token) => source.includes(token));
  console.log(`${file}: ${bad.length ? bad.join(", ") : "OK"}`);
}
const data = fs.readFileSync("src/data/chambar-testimonials.ts", "utf8");
for (const name of ["Sheila Freire", "Leticia Pi", "Ná"]) {
  const i = data.indexOf(`name: "${name}"`);
  console.log("---", name, "---");
  console.log(data.slice(Math.max(0, i - 180), i + 120));
}