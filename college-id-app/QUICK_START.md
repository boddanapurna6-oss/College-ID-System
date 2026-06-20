# College Hub - Quick Start Guide

## 🚀 Get Started in 60 Seconds

### 1. Start the App
```bash
cd /vercel/share/v0-project
pnpm dev
```
Open: **http://localhost:3000**

### 2. Try Student Portal
- Click any student profile (e.g., "Arjun Kumar")
- You're now logged in as a student!
- Navigate through:
  - **Profile & Status**: View your student info
  - **New Application**: Submit ID/Certificate request
  - **Track Applications**: View submission history

### 3. Try Admin Dashboard
- Click **"Admin Dashboard"** button (top right)
- See analytics for all applications
- Search or filter applications
- Click any app to expand and update its status

## 📚 Component Guide

### Student Portal Structure
```
StudentPortal.tsx (Main wrapper)
├── StudentSelector.tsx (Profile selection)
└── StudentDashboard.tsx (Main dashboard)
    ├── Stats (Quick overview)
    ├── Tabs (Profile/New App/Tracker)
    ├── StudentProfile.tsx (Student card)
    ├── ApplicationForm.tsx (Apply form)
    ├── ApplicationTracker.tsx (View apps)
    └── ApplicationDetails.tsx (Expand details)
        ├── IDPreview.tsx (3D ID card)
        └── CertificatePreview.tsx (Certificate)
```

### Admin Dashboard Structure
```
AdminDashboard.tsx (Main wrapper)
├── AdminStats.tsx (6 metric cards)
├── AdminSearch.tsx (Search input)
├── ApplicationQueue.tsx (List manager)
└── ApplicationCard.tsx (Individual cards)
```

## 🎮 Demo Scenarios

### Scenario 1: Submit an Application
1. Select "Arjun Kumar"
2. Click "New Application"
3. Select "College ID Card"
4. Select "Standard Processing"
5. Click "Proceed to Payment"
6. Fill dummy card: `1234 5678 9012 3456`
7. Click "Pay Now"
8. Application appears in tracker!

### Scenario 2: Manage Applications
1. Click "Admin Dashboard"
2. View stats (4 total, 2 pending, etc.)
3. Search for "Priya"
4. Click Priya's application to expand
5. Click "Approved" button
6. Stats update automatically!

### Scenario 3: Download Certificate
1. Select any student
2. Click "Track Applications"
3. Click an app with certificate
4. Click "View Certificate"
5. Click "Download PDF"
6. Certificate saved to downloads!

## 📁 Key Files to Modify

### Adding Features
1. **New student**: Edit `lib/mockData.ts` → `mockStudents` array
2. **New certificate type**: Edit `lib/mockData.ts` → `certificateTypes`
3. **Change colors**: Edit `app/globals.css` → `:root` section
4. **Add component**: Create file in `components/` folder

### Connecting Backend
Replace mock data in these files:
- `lib/ApplicationContext.tsx` → Add API calls
- `lib/mockData.ts` → Remove mock data
- Add environment variables to `.env.local`

## 🎨 Design Customization

### Colors
Edit `app/globals.css`:
```css
:root {
  --primary: oklch(0.38 0.15 262);        /* Blue */
  --accent: oklch(0.45 0.15 262);         /* Light blue */
  --secondary: oklch(0.5 0.15 262);       /* Lighter blue */
  --destructive: oklch(0.577 0.245 27.325); /* Red for errors */
}
```

### Spacing
Tailwind classes (already using consistent 8px):
- `p-4` = padding 16px
- `gap-4` = gap 16px
- `mb-2` = margin-bottom 8px

### Typography
In `app/globals.css`:
```css
@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
}
```

## 🔍 Understanding the Data Flow

```
Page.tsx (Main entry)
│
├─→ [Student Portal] 
│   │
│   ├─→ useApplicationContext()
│   │   ├─→ currentStudent (Context state)
│   │   ├─→ applications (All apps)
│   │   └─→ addApplication() (Submit new)
│   │
│   └─→ Renders StudentPortal
│
└─→ [Admin Dashboard]
    │
    ├─→ useApplicationContext()
    │   ├─→ getAllApplications()
    │   └─→ updateApplicationStatus()
    │
    └─→ Renders AdminDashboard
```

## 🧪 Testing Checklist

- [ ] Select student profile → loads dashboard
- [ ] View stats (total, pending, ready)
- [ ] Click "Profile & Status" → shows student info
- [ ] Click "New Application" → shows form
- [ ] Select different service types
- [ ] See pricing update
- [ ] Submit application → success message
- [ ] View new app in tracker
- [ ] Click Admin Dashboard → shows stats
- [ ] Search by name
- [ ] Filter by status
- [ ] Expand application card
- [ ] Update application status
- [ ] Stats update automatically
- [ ] View ID card preview
- [ ] Download certificate as PDF

## 📦 Dependencies Overview

```json
{
  "next": "16.2.6",              // React framework
  "react": "^19",                // UI library
  "tailwindcss": "^4.2.0",       // Styling
  "html2canvas": "1.4.1",        // HTML to image
  "jspdf": "4.2.1",              // PDF generation
  "lucide-react": "^1.16.0",     // Icons
  "typescript": "5.7.3"          // Type safety
}
```

## 🐛 Troubleshooting

### App won't start?
```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm dev
```

### Page shows error?
- Check browser console (F12)
- Look for red error messages
- Check `user_read_only_context/v0_debug_logs.log`

### Components not showing?
- Make sure files are in correct folders
- Check import paths use `@/components/`
- Verify component exports default

### Styles look wrong?
- Hard refresh page (Ctrl+Shift+R)
- Clear Tailwind cache: `rm -rf .next`
- Check class names in JSX

## 📱 Responsive Testing

```bash
# Test on mobile
agent-browser set device "iPhone 14"
agent-browser screenshot mobile.png

# Test on tablet
agent-browser set viewport 768 1024
agent-browser screenshot tablet.png

# Test on desktop
agent-browser set viewport 1920 1080
agent-browser screenshot desktop.png
```

## 🚀 Deploy to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Click "Import Project"
# 4. Select your repository
# 5. Click "Deploy"
# Done! 🎉
```

## 📞 Need Help?

Check these files for reference:
- `README.md` - Full documentation
- `BUILD_SUMMARY.md` - What was built
- Component files - Each file has comments
- `lib/mockData.ts` - Data structure examples

## ⚡ Performance Tips

1. **Images**: Use next/image component
2. **Forms**: Add debouncing to search
3. **State**: Use Context only for shared data
4. **Rendering**: Component memoization with React.memo
5. **Bundling**: Dynamic imports with next/dynamic

## 🎓 Learning Resources

- React: https://react.dev
- Next.js: https://nextjs.org
- Tailwind: https://tailwindcss.com
- TypeScript: https://typescriptlang.org

---

**You're all set! Start exploring College Hub.** 🎉
