# Notion Integration Setup

This guide walks you through setting up Notion as a CMS for the "These Days" page.

## Step 1: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "+ New integration"
3. Name it "Portfolio CMS" (or whatever you prefer)
4. Select your workspace
5. Click "Submit"
6. Copy the "Internal Integration Token" - you'll need this for your `.env.local`

## Step 2: Create Three Notion Databases

You need to create three databases in Notion with specific properties:

### Database 1: Currently Reading

Create a new database in Notion called "Currently Reading" with these properties:

- **Title** (default title property) - Book name
- **Author** (Text)
- **Description** (Text) - What you're learning/thinking about
- **Cover** (Files & media) - Book cover image URL
- **Status** (Status) - with options: "Reading", "Want to Read", "Finished"
- **Started** (Date) - When you started reading

**Example entry:**
- Title: "The Design of Everyday Things"
- Author: "Don Norman"
- Description: "Classic exploration of design principles..."
- Cover: [Upload or paste image URL]
- Status: Reading
- Started: 2024-11-15

### Database 2: Work Projects

Create a new database called "Work Projects" with these properties:

- **Title** (default title property) - Project name
- **Description** (Text) - What you're working on
- **Company** (Text) - Client or company name
- **Status** (Status) - with options: "In Progress", "Planned", "Completed", "On Hold"
- **Priority** (Number) - 1 (highest) to 5 (lowest)
- **Start Date** (Date)

**Example entry:**
- Title: "Redesign checkout flow"
- Description: "Streamlining the payment experience..."
- Company: "Acme Inc"
- Status: In Progress
- Priority: 1
- Start Date: 2024-02-01

### Database 3: Fun Projects

Create a new database called "Fun Projects" with these properties:

- **Title** (default title property) - Project name
- **Description** (Text) - What it is
- **Tags** (Multi-select) - Technologies/categories (e.g., "AI", "Music", "Design")
- **Status** (Status) - with options: "In Progress", "Idea", "Completed", "Paused"
- **URL** (URL) - Link to project/repo/demo
- **Updated** (Last edited time) - Auto-filled by Notion

**Example entry:**
- Title: "Four-track recorder web app"
- Description: "Browser-based multi-track audio recorder..."
- Tags: Web Audio, React, Music
- Status: In Progress
- URL: https://github.com/...
- Updated: [Auto-filled]

## Step 3: Share Databases with Your Integration

For each database you created:

1. Click the "..." menu in the top right of the database
2. Go to "Connections"
3. Click "Connect to" and search for your integration name ("Portfolio CMS")
4. Click to connect

## Step 4: Get Database IDs

For each database:

1. Open the database as a full page
2. Look at the URL in your browser
3. The database ID is the long string of characters after the workspace name and before the `?v=`

Example URL:
```
https://www.notion.so/myworkspace/a1b2c3d4e5f6... <-- This part is the database ID
```

Copy each database ID.

## Step 5: Add Environment Variables

Add these to your `.env.local` file:

```bash
# Notion Integration
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxx
NOTION_READING_DB_ID=xxxxxxxxxxxxxxxxxxxxx
NOTION_WORK_PROJECTS_DB_ID=xxxxxxxxxxxxxxxxxxxxx
NOTION_FUN_PROJECTS_DB_ID=xxxxxxxxxxxxxxxxxxxxx
```

Replace the `xxx` with your actual values:
- `NOTION_API_KEY` - Your integration token from Step 1
- `NOTION_READING_DB_ID` - Database ID for "Currently Reading"
- `NOTION_WORK_PROJECTS_DB_ID` - Database ID for "Work Projects"
- `NOTION_FUN_PROJECTS_DB_ID` - Database ID for "Fun Projects"

## Step 6: Restart Your Dev Server

After adding the environment variables:

```bash
npm run dev
```

The "These Days" page should now pull content from Notion!

## How to Update Content

Simply update your Notion databases:

- **Currently Reading**: Set a book's Status to "Reading" to show it
- **Work Projects**: Set Status to "In Progress" to show on the page
- **Fun Projects**: Set Status to "In Progress" to show on the page

The page caches for 1 hour, so changes may take up to an hour to appear (or restart your dev server to see them immediately).

## Troubleshooting

**Data not showing up?**
- Check that the integration is connected to all three databases
- Verify the database IDs are correct in `.env.local`
- Check that at least one item has Status = "In Progress" or "Reading"
- Restart your dev server after changing `.env.local`

**Build errors?**
- Make sure all property names match exactly (case-sensitive)
- Check the browser console for detailed error messages
