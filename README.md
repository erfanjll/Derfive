# Derfive — Erfan Jalali's portfolio

This is your website. You don't need to understand the code to keep it updated.
Almost everything you'll ever want to change lives in **one folder: `content/`**.

---

## 1. Running the site on your computer

You only do the first two steps once.

1. Install **Node.js** (the "LTS" version) from https://nodejs.org
2. Open a terminal in this folder and run:

       npm install

3. Start the site:

       npm run dev

4. Open http://localhost:3000 in your browser.

While `npm run dev` is running, every time you save a file the page updates by itself.
To stop it, press `Ctrl + C` in the terminal.

---

## 2. Where the text is

| What you want to change | Open this file |
|---|---|
| Your name, tagline, navigation, email, social links | `content/site.ts` |
| The About page (bio paragraphs, facts, skills, principles) | `content/about.ts` |
| Projects (titles, descriptions, images, videos) | `content/projects.ts` |
| The Journey timeline | `content/journey.ts` |
| Standalone videos & images (game demo, portrait, screenshots…) | `content/media.ts` |

Rules of thumb when editing:
- Only change the text **between the quotes**: `"like this"`.
- Don't delete commas, brackets or quotes.
- Save the file. If the page goes blank, undo your last change (Ctrl + Z) and save again.

---

## 3. Where to put images

Drop them into `public/images/`. For project images, make a sub-folder per project:

    public/images/projects/my-game/cover.jpg

Then in the content file, write the path **starting with `/` and without the word `public`**:

    thumbnail: "/images/projects/my-game/cover.jpg",

Use `.jpg`, `.png` or `.webp`. Lowercase names, no spaces.

---

## 4. Where to put videos

Drop them into `public/videos/`. Use **.mp4** — it works everywhere.
If you want a still image to show before the video plays, put it in `public/posters/`.

---

## 5. How to replace a video

Example: the gameplay video on the homepage and the Game Development page.

1. Copy your file to `public/videos/game-demo.mp4`
2. Open `content/media.ts`
3. Find `gameDemo` and change it to:

       gameDemo: {
         src: "/videos/game-demo.mp4",
         poster: "",                    // or "/posters/game-demo.jpg"
         title: "Game development demo",
       },

That's it. Every video on the site works the same way. While `src` is empty (`""`), the site shows a designed
"coming soon" box instead of a broken player.

---

## 6. How to replace a placeholder project

Open `content/projects.ts`. Each project is a block between `{` and `},`. Change the values:

    {
      title: "My Actual Game",
      slug: "my-actual-game",           // becomes the web address: /projects/my-actual-game
      category: "game",                 // game | animation | editing | experiment
      description: "One or two sentences.",
      year: "2024",
      role: "Programmer & designer",
      technologies: ["Unity", "C#"],    // whatever you actually used
      featured: true,                   // true = shows on the homepage
      status: "released",               // placeholder | prototype | in-progress | released | archived
      thumbnail: "/images/projects/my-actual-game/cover.jpg",
      video: "/videos/my-actual-game.mp4",
      gallery: ["/images/projects/my-actual-game/1.jpg", "/images/projects/my-actual-game/2.jpg"],
      links: [{ label: "Play it", href: "https://..." }],
      longDescription: "A longer write-up. Press Enter twice for a new paragraph.",
    },

Remove any line you don't need (except `title`, `slug`, `category`, `description`).
Change `status` from `"placeholder"` to something else and the yellow PLACEHOLDER tag disappears.

---

## 7. How to add a new project

1. In `content/projects.ts`, copy an existing block from `{` to `},`
2. Paste it right after another block, inside the big list
3. Change the values — make sure the `slug` is different from every other project
4. Save. The project appears on the Projects page, in the sitemap, and (if `featured: true`) on the homepage.

---

## 8. How to change your email and social links

Open `content/site.ts`:

    contact: {
      email: "hello@yourdomain.com",
      ...
    },
    socials: [
      { label: "GitHub",    href: "https://github.com/yourname" },
      { label: "Instagram", href: "" },     // empty = shown as "soon", not clickable
      ...
    ],

To connect the contact form so messages actually reach you, sign up for a free form service
(for example Formspree), copy the URL it gives you, and set it as `CONTACT_WEBHOOK_URL`
(see section 10). Until then the form politely tells visitors it isn't connected yet.

---

## 9. Building the production version

    npm run build

If this finishes without red errors, the site is ready to go live. You can preview the built version with:

    npm run start

---

## 10. Putting it online

The easiest way is **Vercel** (made by the people who make Next.js, free for personal sites).

1. Put this folder on GitHub (create a repository and upload the folder — GitHub Desktop makes this easy).
2. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**, pick the repository, click **Deploy**.
3. After the first deploy, open the project's **Settings → Environment Variables** and add:
   - `NEXT_PUBLIC_SITE_URL` = your real address, e.g. `https://derfive.com`
   - `CONTACT_WEBHOOK_URL` = your form service URL (optional, see section 8)
4. Click **Redeploy**.

From now on, every time you push a change to GitHub, the site updates by itself in about a minute.

---

## If something breaks

- Page is blank after an edit → you probably removed a quote, comma or bracket. Undo and save.
- Image/video shows "Check the file path" → the path in the content file doesn't match the file name in `public/`.
  Paths are case-sensitive: `Cover.jpg` and `cover.jpg` are different.
- Anything else → run `npm run build` and read the first error message; it says which file and line.
