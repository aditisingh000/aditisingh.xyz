# aditisingh.xyz - Personal Portfolio Website

A minimalist personal website for showcasing machine learning Jupyter notebook projects, inspired by 032c's clean aesthetic.

## Features

- **Minimalist Design**: Clean, modern UI inspired by 032c.com
- **Jupyter Notebook Display**: Showcase your ML projects with interactive notebook viewing
- **Contact Form**: Email contact form with tracking capabilities
- **Responsive**: Works on desktop and mobile devices
- **Fast & Lightweight**: Pure HTML, CSS, and JavaScript (no frameworks)

## Setup Instructions

### 1. Add Your Jupyter Notebooks

1. Convert your Jupyter notebooks to HTML:
   ```bash
   jupyter nbconvert --to html your_notebook.ipynb --output-dir=projects
   ```

2. Update the `projects` array in `script.js` with your notebook information:
   ```javascript
   const projects = [
       {
           id: 1,
           title: "Your Project Title",
           description: "Project description",
           notebookUrl: "projects/your-notebook.html",
           date: "2025-01",
           tags: ["Tag1", "Tag2"]
       }
   ];
   ```

### 2. Email Tracking Setup

The contact form includes email tracking. You have several options:

#### Option A: EmailJS (Recommended for Quick Setup)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Add EmailJS script to `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
4. Update `script.js` with your EmailJS credentials:
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY');
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
       from_name: formData.name,
       from_email: formData.email,
       message: formData.message
   });
   ```

#### Option B: Formspree

1. Sign up at [Formspree](https://formspree.io/)
2. Get your form endpoint
3. Update the form action in `index.html`:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### Option C: Google Analytics Tracking

Add Google Analytics to track form submissions:

1. Add Google Analytics script to `index.html`:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-YOUR_ID');
   </script>
   ```

### 3. Deploy Your Website

#### Option A: GitHub Pages

1. Create a GitHub repository
2. Push your files to the repository
3. Go to Settings > Pages
4. Select your branch and save
5. Your site will be available at `https://yourusername.github.io/repository-name`

#### Option B: Netlify

1. Sign up at [Netlify](https://www.netlify.com/)
2. Drag and drop your folder or connect to Git
3. Your site will be live instantly

#### Option C: Vercel

1. Sign up at [Vercel](https://vercel.com/)
2. Import your project
3. Deploy with one click

#### Option D: Custom Domain (aditisingh.xyz)

1. Purchase the domain if you haven't already
2. Configure DNS settings:
   - Point your domain to your hosting provider
   - Add CNAME or A records as required
3. Update your hosting provider's domain settings

## File Structure

```
aditisingh.xyz/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # JavaScript functionality
├── projects/           # Jupyter notebook HTML files
│   └── *.html
└── README.md           # This file
```

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --black: #000000;
    --white: #ffffff;
    --gray: #666666;
    --light-gray: #f5f5f5;
    --border: #e0e0e0;
}
```

### Typography
The site uses Inter font. You can change it in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Content
- Update hero section in `index.html`
- Modify about section text
- Add/remove navigation links

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Personal use - feel free to modify for your own portfolio.

## Contact

For questions or issues, update the contact form on the website.
