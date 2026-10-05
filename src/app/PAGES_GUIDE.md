# Pages Management System - Complete Guide

## 📄 Overview

The Pages Management system allows administrators to create, edit, and manage custom content pages with full control over their placement in the website navigation.

---

## ✨ Key Features

### 1. **Rich Text Editor**
- Visual HTML editor with toolbar
- **Edit** and **Preview** tabs
- Formatting buttons for common HTML elements
- Live preview of content

### 2. **Navigation Control**
- Display pages in **Header** navigation
- Display pages in **Footer** (4 columns available)
- Choose specific footer column (1-4)
- Published/Draft status control

### 3. **Page Management**
- Create unlimited custom pages
- Edit existing pages
- Delete pages
- Publish/Unpublish pages
- Search and filter functionality

### 4. **SEO-Friendly**
- Custom URL slugs
- Auto-generated slugs from titles
- Clean URLs (e.g., /help-center)

---

## 🎯 Access Pages Management

1. **Login to Admin Panel**
   - Username: `admin`
   - Password: `1234`

2. **Navigate to Pages**
   - Click "Pages" in the sidebar
   - View all custom pages

---

## 📊 Dashboard Stats

The Pages section shows:
- **Total Pages:** All created pages
- **Published:** Live pages visible to users
- **In Header:** Pages shown in header navigation
- **In Footer:** Pages shown in footer

---

## ➕ Creating a New Page

### Step 1: Click "Create New Page"
- Green button in the top right
- Opens the page editor modal

### Step 2: Configure Page Settings

#### **Basic Information:**
- **Page Title:** Display name (e.g., "Terms of Service")
- **URL Slug:** URL path (e.g., "terms-of-service")
  - Auto-generated from title if left empty
  - Must be URL-friendly (lowercase, hyphens)

#### **Display Options:**
- ☑️ **Display in Header Navigation**
  - Shows link in top header menu
  - Visible alongside Home, About, Contact
  
- ☑️ **Display in Footer**
  - Shows link in footer section
  - Choose column (1-4):
    - **Column 1:** Product
    - **Column 2:** Company
    - **Column 3:** Resources
    - **Column 4:** Legal

#### **Publication Status:**
- 🔘 **Draft** - Not visible to users (for editing)
- 🔘 **Published** - Live and visible to all users

### Step 3: Write Content

#### **Using the Editor:**

**Toolbar Buttons:**
- **H1** - Main heading (`<h1>`)
- **H2** - Subheading (`<h2>`)
- **H3** - Section heading (`<h3>`)
- **B** - Bold text (`<strong>`)
- **I** - Italic text (`<em>`)
- **U** - Underline (`<u>`)
- **•** - Bullet list (`<ul><li>`)
- **1.** - Numbered list (`<ol><li>`)
- **🔗** - Insert link (`<a href="">`)
- **🖼️** - Insert image (`<img src="">`)
- **</>** - Inline code (`<code>`)
- **P** - Paragraph (`<p>`)

**How to Use:**
1. Select text in the editor
2. Click formatting button
3. HTML tags are inserted around selection
4. Or click without selection for template

**Edit Tab:**
- Write HTML content directly
- Use toolbar for quick formatting
- Monospace font for code readability

**Preview Tab:**
- See how content will look
- Styled with proper typography
- Responsive preview

### Step 4: Save the Page
- Click "Save Page" button
- Page is saved with all settings
- Returns to pages list

---

## ✏️ Editing Existing Pages

1. **Find the Page**
   - Search by title or slug
   - Use filter buttons (All/Published/Drafts)

2. **Click Edit Button**
   - Opens page editor with existing content
   - All settings are pre-filled

3. **Make Changes**
   - Update title, slug, or content
   - Change display settings
   - Toggle published status

4. **Save Changes**
   - Updates page with new content
   - Shows "Page updated successfully" toast

---

## 🗑️ Deleting Pages

1. **Click Delete Button** (red trash icon)
2. **Confirm deletion** in popup dialog
3. **Page is removed** permanently

⚠️ **Warning:** Deletion cannot be undone!

---

## 👁️ Publishing/Unpublishing

### Quick Toggle:
- Click the **eye icon** on any page
- **Eye Open** (👁️) - Publish draft page
- **Eye Closed** (🚫) - Unpublish published page

### Status Badges:
- 🟢 **Published** - Green badge, visible to users
- ⚫ **Draft** - Gray badge, hidden from users

---

## 🔍 Search & Filter

### Search:
- Type in search box
- Searches page titles and slugs
- Real-time filtering

### Filter Buttons:
- **All (4)** - Show all pages
- **Published (3)** - Only published pages
- **Drafts (1)** - Only draft pages

---

## 📝 Pre-loaded Example Pages

### 1. **Terms of Service**
- **Status:** Published
- **Location:** Footer Column 4 (Legal)
- **Content:** Terms and conditions
- **URL:** `/terms-of-service`

### 2. **Privacy Policy**
- **Status:** Published
- **Location:** Footer Column 4 (Legal)
- **Content:** Privacy and data policy
- **URL:** `/privacy-policy`

### 3. **Help Center**
- **Status:** Published
- **Location:** Header + Footer Column 3
- **Content:** FAQ and support information
- **URL:** `/help-center`

### 4. **FAQ**
- **Status:** Draft
- **Location:** Header only (when published)
- **Content:** Frequently asked questions
- **URL:** `/faq`

---

## 🎨 Content Formatting Guide

### HTML Structure Examples:

#### **Headings:**
```html
<h1>Main Page Title</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
```

#### **Paragraphs:**
```html
<p>This is a paragraph of text. It can be multiple sentences long and will be styled appropriately.</p>
```

#### **Lists:**
```html
<ul>
<li>First bullet point</li>
<li>Second bullet point</li>
<li>Third bullet point</li>
</ul>

<ol>
<li>First numbered item</li>
<li>Second numbered item</li>
</ol>
```

#### **Links:**
```html
<a href="/contact">Contact us</a>
<a href="https://example.com">External link</a>
```

#### **Images:**
```html
<img src="image-url.jpg" alt="Image description" />
```

#### **Emphasis:**
```html
<strong>Bold text</strong>
<em>Italic text</em>
<u>Underlined text</u>
<code>Inline code</code>
```

---

## 🌐 How Pages Appear on Website

### Header Navigation:
- Pages with "Display in Header" enabled
- Appear after: Home, Pricing, About, Contact
- Example: **Help Center** link in header

### Footer Navigation:
- Pages with "Display in Footer" enabled
- Appear in selected column
- **Column 1 (Product):** Product-related pages
- **Column 2 (Company):** Company info pages
- **Column 3 (Resources):** Support/help pages
- **Column 4 (Legal):** Legal/policy pages

### Custom Page View:
- Clean, focused reading experience
- "Back to Home" button
- Full-width content area
- Responsive design
- Last updated date shown

---

## 🎯 Best Practices

### Page Titles:
- ✅ Clear and descriptive
- ✅ 2-5 words ideal
- ❌ Avoid very long titles

### URL Slugs:
- ✅ Lowercase letters
- ✅ Use hyphens (not underscores)
- ✅ Keep short and descriptive
- ❌ No spaces or special characters

### Content:
- ✅ Use proper heading hierarchy (H1 → H2 → H3)
- ✅ Break content into sections
- ✅ Use lists for better readability
- ✅ Add links to related pages
- ✅ Keep paragraphs short

### Navigation Placement:
- **Header:** Important, frequently accessed pages
- **Footer Column 1-2:** General company/product info
- **Footer Column 3:** Help and resources
- **Footer Column 4:** Legal and compliance

### Publication:
- ✅ Use Draft status while creating
- ✅ Preview before publishing
- ✅ Test on different devices
- ✅ Publish when content is complete

---

## 💡 Use Cases

### Legal Pages:
- Terms of Service
- Privacy Policy
- Cookie Policy
- Disclaimer

### Help & Support:
- Help Center
- FAQ
- Getting Started Guide
- Tutorials

### Company Info:
- About Us (extended)
- Team
- Careers
- Press Kit

### Resources:
- API Documentation
- Developer Guides
- Blog
- Case Studies

---

## 🔧 Technical Details

### Storage:
- Pages stored in `/data/pages.ts`
- Mock data persists during session
- Real implementation would use database

### Rendering:
- HTML content rendered with `dangerouslySetInnerHTML`
- Styled with Tailwind typography classes
- Responsive by default

### Security:
- Admin-only access
- Input sanitization recommended in production
- XSS protection needed for user content

---

## 🚀 Quick Workflow

### Creating a Legal Page:

1. **Create New Page**
2. **Title:** "Privacy Policy"
3. **Slug:** Auto-generated as "privacy-policy"
4. **Display Settings:**
   - ☑️ Footer
   - Column: 4 (Legal)
   - Status: Draft
5. **Content:**
   ```html
   <h1>Privacy Policy</h1>
   <p>Effective date: [Date]</p>
   <h2>Information We Collect</h2>
   <p>Details here...</p>
   ```
6. **Preview** content
7. **Change to Published**
8. **Save Page**

Result: Privacy Policy link appears in Footer Column 4!

---

## 📱 Responsive Design

All custom pages are:
- ✅ Mobile-friendly
- ✅ Tablet-optimized
- ✅ Desktop-enhanced
- ✅ Touch-friendly buttons
- ✅ Readable typography

---

## ⚡ Performance

- Fast page switching
- No page reloads
- Instant search/filter
- Smooth animations
- Optimized rendering

---

## 🎉 Summary

The Pages Management system provides:
1. **Full content control** - Create any page you need
2. **Flexible navigation** - Choose header or footer placement
3. **Easy editing** - Visual editor with preview
4. **Professional output** - Beautiful, responsive pages
5. **Admin-friendly** - Intuitive interface

Perfect for managing all your website's static content without touching code!

---

**Need Help?** 
- All pages auto-save
- Preview before publishing
- Delete is permanent
- Search makes finding pages easy
