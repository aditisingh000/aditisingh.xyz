# Resume Timeline Guide

Your resume is displayed in a beautiful timeline format with experience on the left and education on the right.

## How to Customize

Edit the `resumeData` object in `script.js`:

### Experience Format

```javascript
{
    id: 1,
    title: "Your Job Title",
    company: "Company Name",
    location: "City, Country",
    startDate: "2024-01",  // Format: YYYY-MM
    endDate: "Present",    // or "2024-12" for end date
    description: "Brief description of your role and responsibilities.",
    achievements: [
        "Achievement 1",
        "Achievement 2",
        "Achievement 3"
    ]
}
```

### Education Format

```javascript
{
    id: 1,
    degree: "Degree Name",
    institution: "University/Institution Name",
    location: "City, Country",
    startDate: "2022-09",
    endDate: "2024-05",
    description: "Brief description or specialization.",
    achievements: [
        "GPA: 3.9/4.0",
        "Dean's List",
        "Relevant honors or awards"
    ]
}
```

## Tips

- **Date Format**: Use `YYYY-MM` format (e.g., "2024-01")
- **Present**: Use "Present" for current positions/education
- **Achievements**: Keep them concise and impactful
- **Ordering**: Items are automatically sorted by end date (most recent first)
- **Side Placement**: Experience appears on the left, Education on the right

## Example

```javascript
const resumeData = {
    experience: [
        {
            id: 1,
            title: "Senior ML Engineer",
            company: "AI Innovations",
            location: "San Francisco, CA",
            startDate: "2023-06",
            endDate: "Present",
            description: "Lead development of ML models for production systems.",
            achievements: [
                "Deployed 10+ models serving 5M+ users",
                "Reduced inference latency by 60%",
                "Mentored team of 5 junior engineers"
            ]
        }
    ],
    education: [
        {
            id: 1,
            degree: "M.S. Computer Science",
            institution: "Stanford University",
            location: "Stanford, CA",
            startDate: "2021-09",
            endDate: "2023-05",
            description: "Specialized in Machine Learning and AI.",
            achievements: [
                "GPA: 3.95/4.0",
                "Research Assistant in Deep Learning Lab"
            ]
        }
    ]
};
```

## Responsive Design

On mobile devices, the timeline automatically adjusts to a single-column layout with all items on the left side for better readability.
