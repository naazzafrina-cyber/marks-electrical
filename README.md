# ⚡ Marks Electrical Services — Website

A complete, responsive single-page website for **Marks Electrical Services**, Udupi, Karnataka.

---

## ✨ Features

- **Fully responsive** — works beautifully on mobile, tablet, and desktop
- **Fast & lightweight** — pure HTML, CSS & vanilla JavaScript (no frameworks, no build step)
- **8 service categories** — CCTV, House Wiring, Inverters, Computer Repair, Appliances, Motor Winding, Solar, Electronics
- **Enquiry form** that emails directly to your Gmail
- **Customer reviews section** with feedback submission form
- **Live phone, WhatsApp, and Google Maps** integration
- **Floating Call & WhatsApp buttons** for instant contact
- SEO-ready metadata and accessibility-friendly markup

---

## 📁 Files in this project

```
marks-electrical/
├── index.html      → The single page
├── style.css       → All styles
├── script.js       → Interactivity & form handling
└── README.md       → This file
```

That's it. No build tools, no dependencies.

---

## 🚀 Hosting on GitHub Pages — 5 Simple Steps

### Step 1 — Create a GitHub repository

1. Go to **[github.com](https://github.com)** and sign in (create a free account if you don't have one).
2. Click the **+** in the top right → **New repository**.
3. Name it something like `marks-electrical` (lowercase, no spaces).
4. Set it to **Public**.
5. Click **Create repository**.

### Step 2 — Upload the files

**Option A — Drag & drop (easiest):**
1. On your new repo page, click **"uploading an existing file"** (or *Add file → Upload files*).
2. Drag and drop `index.html`, `style.css`, `script.js`, and `README.md` from the folder.
3. Click **Commit changes** at the bottom.

**Option B — Using Git (if you know it):**
```bash
git clone https://github.com/YOUR_USERNAME/marks-electrical.git
cd marks-electrical
# copy the files in
git add .
git commit -m "Initial website"
git push origin main
```

### Step 3 — Set up the contact form (so emails reach your Gmail)

The form is pre-configured for **Formspree** — a free service that forwards form submissions to your Gmail without any backend.

1. Go to **[formspree.io](https://formspree.io)** and sign up using your shop's Gmail address (e.g. `marks.electrical.udupi@gmail.com`).
2. Click **+ New Form** → name it *"Marks Electrical Website"* → click **Create form**.
3. You'll see a form endpoint URL like:
   ```
   https://formspree.io/f/abcdwxyz
   ```
   The part after `/f/` (here `abcdwxyz`) is your **Form ID**.
4. Open `index.html` in any text editor (Notepad, VS Code, etc.) and find both occurrences of:
   ```
   YOUR_FORMSPREE_ID
   ```
   (one for the enquiry form, one for the feedback form).
5. Replace **both** with your actual Form ID. For example:
   ```html
   action="https://formspree.io/f/abcdwxyz"
   ```
6. Save the file and re-upload it to your GitHub repo (or commit & push).
7. Submit a test enquiry from the live site — the **first time only**, Formspree will email you to confirm. Click the confirmation link, and after that all submissions go straight to your Gmail.

> 💡 **Free tier:** Formspree's free plan allows 50 submissions/month — plenty for a small business. You can upgrade later if needed.
> 
> 💡 **Backup:** If you don't set up Formspree, the form will fall back to opening the user's email app with a pre-filled message to the address in `script.js`. To change that fallback address, open `script.js` and edit the line: `const recipient = 'marks.electrical.udupi@gmail.com';`

### Step 4 — Turn on GitHub Pages

1. Go to your repo on GitHub.
2. Click **Settings** (top right of the repo page).
3. In the left sidebar, click **Pages**.
4. Under **Source**, select **Deploy from a branch**.
5. Under **Branch**, choose **`main`** and the folder **`/ (root)`**.
6. Click **Save**.
7. Wait 1–2 minutes. GitHub will give you a live URL like:
   ```
   https://YOUR_USERNAME.github.io/marks-electrical/
   ```

### Step 5 — Share the link! 🎉

Add the URL to your:
- Google Business Profile
- WhatsApp Business catalog
- Visiting cards
- Social media bios

---

## 🛠 Customization Guide

All edits can be done in any plain-text editor — no special software needed.

### Change the phone number
Search and replace `8105464100` everywhere in `index.html` with the new number.

### Change the email address (for form fallback)
In `script.js`, change `marks.electrical.udupi@gmail.com` to your preferred email.

### Update services
In `index.html`, find the section starting with `<!-- ============== SERVICES ============== -->` and edit the `<article class="service">` blocks. Each has a title, description, and image.

### Change images
The site uses free Unsplash images via direct URLs. To use your own photos:
1. Create an `images/` folder next to `index.html`.
2. Upload your photos there (jpg or webp, ideally < 500 KB each).
3. In `index.html`, replace the Unsplash URLs (e.g. `https://images.unsplash.com/...`) with `images/yourphoto.jpg`.

### Update the location on the map
The map uses a Google Maps embed centered on Udupi. To use a more specific location:
1. Go to **[google.com/maps](https://maps.google.com)** and find your shop's exact address.
2. Click **Share → Embed a map → Copy HTML**.
3. In `index.html`, find `<iframe src="https://www.google.com/maps/embed?...` and replace the entire `src="..."` value with the one Google gave you.

### Change colors
In `style.css`, the top of the file has CSS variables under `:root`. The main brand colors are:
- `--ink`: Deep navy (primary dark)
- `--accent`: Electric amber (highlights)
- `--red`: Bold red (matches your visiting card)

Change these values to instantly re-theme the entire site.

### Add or edit testimonials
In `index.html`, find `<!-- ============== TESTIMONIALS ============== -->` and copy/edit any `<article class="testimonial">` block.

---

## 📞 Contact Information (currently embedded)

- **Phone:** +91 81054 64100
- **Location:** Udupi, Karnataka
- **Hours:** Mon–Sat, 9:00 AM – 8:00 PM
- **Services:** CCTV, House Wiring, Inverters, Batteries, Computer/Laptop Repair, Home Appliances, Motor Winding, Solar Panels, Electronics Repair

---

## ❓ Troubleshooting

**Q: I uploaded the files but the page is blank / "404".**
- Check that `index.html` is at the **root** of your repository, not inside a subfolder.
- Wait 2–3 minutes after enabling GitHub Pages. Refresh with Ctrl+F5.

**Q: The form isn't sending emails.**
- Make sure you replaced *both* occurrences of `YOUR_FORMSPREE_ID` with your real Formspree form ID.
- Check that you confirmed the email when Formspree first sent the verification link.
- Test in a different browser or incognito window.

**Q: How do I use a custom domain like marksElectrical.com?**
- Buy the domain from any registrar (GoDaddy, Namecheap, etc.).
- In your repo: Settings → Pages → Custom domain → enter your domain.
- At your registrar, add a CNAME record pointing to `YOUR_USERNAME.github.io`.
- GitHub has a detailed guide [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

**Q: How do I update the website later?**
- Just edit the file on GitHub directly (click the file → pencil icon → make changes → Commit). The live site updates within a minute.

---

Made with ⚡ for Marks Electrical Services, Udupi.
