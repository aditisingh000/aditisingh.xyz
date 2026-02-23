# Quick Start Guide

Get your website up and running in 5 minutes!

## Step 1: Open the Website Locally

Simply open `index.html` in your web browser to see your website.

## Step 2: Add Your Projects

1. Convert your Jupyter notebooks to HTML:
   ```bash
   jupyter nbconvert --to html path/to/your/notebook.ipynb --output-dir=projects
   ```

2. Edit `script.js` and update the `projects` array with your actual projects:
   ```javascript
   const projects = [
       {
           id: 1,
           title: "My ML Project",
           description: "Description of what this project does",
           notebookUrl: "projects/your-notebook.html",
           date: "2025-01",
           tags: ["Machine Learning", "Python"]
       }
   ];
   ```

## Step 3: Set Up Email (Optional but Recommended)

Choose one method from `email-config.md`:

- **EmailJS** (easiest, no backend needed)
- **Formspree** (simple form backend)
- **Google Analytics** (just for tracking)

## Step 4: Customize Content

- Edit the hero section in `index.html` (line ~30)
- Update the about section (line ~50)
- Modify colors in `styles.css` (line ~8)

## Step 5: Deploy

### Option A: GitHub Pages (Free)
1. Create a GitHub repository
2. Push your files
3. Go to Settings > Pages > Enable GitHub Pages
4. Your site is live!

### Option B: Netlify (Free, Easy)
1. Go to [netlify.com](https://www.netlify.com/)
2. Drag and drop your folder
3. Done!

### Option C: Your Own Domain (aditisingh.xyz)
1. After deploying to GitHub Pages/Netlify
2. Add your custom domain in the hosting settings
3. Update DNS records at your domain registrar

## That's It!

Your minimalist portfolio website is ready. The design is inspired by 032c.com with a clean, professional look perfect for showcasing your ML projects.

## Need Help?

- See `README.md` for detailed instructions
- See `email-config.md` for email setup
- Check the comments in the code files
