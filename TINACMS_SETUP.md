# TinaCMS Setup Guide

## What is TinaCMS?

TinaCMS is a visual content management system that allows you to edit your website content directly on the page, without needing to write code. Think of it like WordPress, but specifically designed for modern React websites.

## Quick Start

### 1. Create a TinaCMS Cloud Account

1. Go to [https://app.tina.io](https://app.tina.io)
2. Sign up with GitHub (recommended) or email
3. Create a new project
4. Connect it to your GitHub repository

### 2. Get Your Credentials

After creating your project in TinaCMS Cloud:

1. Go to your project settings
2. Copy your **Client ID**
3. Generate and copy a **Read-Only Token**

### 3. Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials:
   ```env
   VITE_TINA_CLIENT_ID=your_actual_client_id
   VITE_TINA_TOKEN=your_actual_token
   VITE_TINA_BRANCH=main
   ```

### 4. Start Development Server

```bash
npm run dev
```

This will start both Vite and TinaCMS together. Your site will be available at `http://localhost:5173`.

### 5. Access the CMS

To edit your content:

1. Navigate to `http://localhost:5173/admin`
2. Log in with your TinaCMS Cloud credentials
3. You'll see all your editable content sections!

## What Can You Edit?

### ✏️ Hero Section
- Your greeting message
- Your name and title
- Description text
- Call-to-action button text
- Profile image

### ✏️ Projects
- Add, edit, or remove projects
- Change project titles, descriptions, categories
- Update project images and gallery photos
- Modify tags

### ✏️ Skills
- Edit skill names and levels (0-100)
- Add or remove skills
- Update skill descriptions

### ✏️ Accomplishments
- Add new awards and certifications
- Edit titles, organizations, descriptions
- Change years
- Select different icons

### ✏️ About Section
- Update your bio and description
- Change statistics (years, projects, clients, satisfaction)
- Update profile image

### ✏️ Contact Information
- Edit email, phone, location
- Update social media links
- Change section text

## How to Edit Content

### Method 1: Admin Panel (Recommended for Beginners)

1. Go to `http://localhost:5173/admin`
2. Click on any collection (Hero, Projects, Skills, etc.)
3. Select the item you want to edit
4. Make your changes in the form fields
5. Click "Save"

### Method 2: Visual Editing (Advanced)

Once configured properly, you can:
1. View your regular website
2. Click the "Edit with Tina" button (if enabled)
3. Click directly on content to edit it inline

## Project Structure

```
portfolio-designer/
├── content/              # All your editable content (JSON files)
│   ├── hero/
│   │   └── index.json
│   ├── projects/
│   │   ├── ecommerce-platform.json
│   │   ├── fitness-tracking-app.json
│   │   └── ...
│   ├── skills/
│   │   └── index.json
│   ├── accomplishments/
│   │   ├── award-ui-design.json
│   │   └── ...
│   ├── about/
│   │   └── index.json
│   └── contact/
│       └── index.json
├── tina/
│   └── config.js         # TinaCMS configuration
└── .env                  # Your credentials (DON'T COMMIT THIS!)
```

## Publishing Changes

### Option 1: Git-based Workflow (Current Setup)

1. Edit your content in TinaCMS admin
2. TinaCMS saves changes to JSON files in the `content/` folder
3. Commit and push these changes to GitHub:
   ```bash
   git add content/
   git commit -m "Update portfolio content"
   git push
   ```
4. Vercel will automatically redeploy with your changes

### Option 2: TinaCMS Cloud (Recommended for Easier Workflow)

With TinaCMS Cloud properly configured:
1. Edit content in the admin panel
2. Click "Publish"
3. TinaCMS automatically commits to your GitHub repo
4. Vercel automatically deploys
5. **No command line needed!**

## Common Tasks

### Adding a New Project

1. Go to `http://localhost:5173/admin`
2. Click on "Projects" in the sidebar
3. Click "Create New" button
4. Fill in:
   - Title
   - Category (web/mobile/branding)
   - Short description
   - Full description
   - Tags (comma-separated)
   - Thumbnail image URL
   - Gallery images URLs (one per line)
   - Project link
5. Click "Save"

### Changing Your Profile Photo

1. Go to Admin → Hero Section
2. Find the "Profile Image" field
3. Paste a new image URL
4. Or upload to TinaCMS Media Manager and select from there
5. Click "Save"

### Updating Skills Levels

1. Go to Admin → Skills
2. Find the skill you want to update
3. Change the "Skill Level" number (0-100)
4. Click "Save"

## Tips for Non-Developers

### 🖼️ Working with Images

**Option 1: Use Existing Images**
- Keep using Unsplash URLs already in the content
- Search Unsplash for new images: `https://unsplash.com/`
- Copy the image URL and paste into TinaCMS

**Option 2: Upload Your Own Images**
1. Use TinaCMS Media Manager
2. Click "Upload" in image field
3. Select your image file
4. TinaCMS stores it and uses the URL

### ✍️ Rich Text Editing

For fields marked "Full Description":
- **Bold**: Highlight text, click B
- **Italic**: Highlight text, click I
- **Lists**: Click bullet or number button
- **Links**: Highlight text, click link icon

### 🎨 Choosing Icons

For accomplishments, you can use these icon names:
- `Trophy` - For awards
- `Award` - For certifications
- `Star` - For rankings
- `Target` - For goals/achievements
- `TrendingUp` - For growth/success
- `Zap` - For energy/speaking
- `Medal` - For competitions
- `BadgeCheck` - For verified achievements

Just type the icon name exactly as shown.

## Troubleshooting

### "Cannot connect to TinaCMS"
- Check your `.env` file has correct credentials
- Make sure you're running `npm run dev` (not just `vite`)
- Try restarting the development server

### "Changes not showing up"
- Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check if JSON files in `content/` folder were updated
- Make sure you clicked "Save" in the admin panel

### "Admin panel not loading"
- Navigate to `http://localhost:5173/admin` directly
- Check browser console for errors (F12)
- Verify TinaCMS packages are installed: `npm list tinacms`

## Need Help?

- **TinaCMS Documentation**: https://tina.io/docs/
- **TinaCMS Discord**: https://discord.com/invite/zumN63Ybpf
- **Video Tutorials**: https://tina.io/docs/setup-overview/

## Security Note

⚠️ **IMPORTANT**: Never commit your `.env` file to GitHub!

The `.env` file contains your secret credentials. It's already in `.gitignore`, but double-check:
- `.env` should NOT be in your GitHub repository
- Only commit `.env.example` (without real credentials)
- Share credentials securely if working with a team

## Local-Only Editing (Without TinaCMS Cloud)

If you want to edit locally without setting up TinaCMS Cloud:

1. You can manually edit the JSON files in the `content/` folder
2. Use any text editor (VS Code, Notepad++, etc.)
3. The JSON format is simple and human-readable
4. Just be careful with syntax (commas, brackets, quotes)

Example editing `content/hero/index.json`:
```json
{
  "greeting": "Your new greeting text",
  "name": "Your Name",
  "title": "Your New Title"
}
```

Save the file, and your changes will appear immediately (with hot reload).

## Next Steps

1. ✅ Set up your TinaCMS Cloud account
2. ✅ Add your credentials to `.env`
3. ✅ Run `npm run dev`
4. ✅ Access admin at `http://localhost:5173/admin`
5. ✅ Start editing your content!

Enjoy managing your portfolio visually! 🎨
