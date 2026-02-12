#!/usr/bin/env node

/**
 * AI News Research Agent - Session Orchestrator
 *
 * Usage:
 *   node agents/ai-news-research/start.js
 *   node agents/ai-news-research/start.js --stage=research
 *   node agents/ai-news-research/start.js --new
 */

const fs = require('fs');
const path = require('path');

const STATE_DIR = path.join(__dirname, 'state');
const CURRENT_SESSION = path.join(STATE_DIR, 'current_session.json');
const SESSION_TEMPLATE = path.join(STATE_DIR, 'session_template.json');
const ARCHIVE_DIR = path.join(__dirname, 'archive');

// Parse command line arguments
const args = process.argv.slice(2);
const flags = {};
args.forEach(arg => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    flags[key] = value || true;
  }
});

// Ensure directories exist
if (!fs.existsSync(STATE_DIR)) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
}
if (!fs.existsSync(ARCHIVE_DIR)) {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}

/**
 * Generate unique session ID
 */
function generateSessionId() {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create new session from template
 */
function createNewSession() {
  const template = JSON.parse(fs.readFileSync(SESSION_TEMPLATE, 'utf8'));
  const session = {
    ...template,
    session_id: generateSessionId(),
    started_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  fs.writeFileSync(CURRENT_SESSION, JSON.stringify(session, null, 2));
  console.log('✓ New session created:', session.session_id);
  return session;
}

/**
 * Load current session
 */
function loadSession() {
  if (!fs.existsSync(CURRENT_SESSION)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(CURRENT_SESSION, 'utf8'));
}

/**
 * Archive current session
 */
function archiveSession(session) {
  if (!session) return;

  const archivePath = path.join(
    ARCHIVE_DIR,
    `${session.session_id}.json`
  );

  fs.writeFileSync(archivePath, JSON.stringify(session, null, 2));
  console.log('✓ Session archived:', archivePath);
}

/**
 * Update session state
 */
function updateSession(updates) {
  const session = loadSession();
  if (!session) {
    console.error('✗ No active session found');
    return null;
  }

  const updated = {
    ...session,
    ...updates,
    updated_at: new Date().toISOString()
  };

  fs.writeFileSync(CURRENT_SESSION, JSON.stringify(updated, null, 2));
  return updated;
}

/**
 * Main orchestrator
 */
function main() {
  console.log('\n🤖 AI News Research Agent\n');

  // Handle --new flag
  if (flags.new) {
    const existing = loadSession();
    if (existing && existing.status === 'in_progress') {
      archiveSession(existing);
    }
    createNewSession();
    console.log('\nReady to start Stage 1: News Monitoring');
    console.log('\nNext step: Tell Claude Code to begin monitoring AI news for the past 7 days.');
    return;
  }

  // Load or create session
  let session = loadSession();
  if (!session) {
    session = createNewSession();
  }

  // Handle --stage flag
  if (flags.stage) {
    console.log(`Jumping to stage: ${flags.stage}`);
    session = updateSession({ stage: flags.stage });
  }

  // Display current state
  console.log('Session ID:', session.session_id);
  console.log('Current Stage:', session.stage);
  console.log('Status:', session.status);
  console.log('Started:', session.started_at);
  console.log('Last Updated:', session.updated_at);

  if (session.topic.selected) {
    console.log('\nSelected Topic:', session.topic.title);
  }

  if (session.draft.path) {
    console.log('\nDraft:', session.draft.path);
  }

  // Stage-specific instructions
  console.log('\n' + '='.repeat(60));

  switch (session.stage) {
    case 'monitoring':
      console.log('\n📡 STAGE 1: News Monitoring & Topic Discovery\n');
      console.log('Instructions for Claude Code:');
      console.log('1. Read config/sources.json for source list');
      console.log('2. Search/fetch content from sources (last 7 days)');
      console.log('3. Read content/ideas/backlog.md for idea connections');
      console.log('4. Identify 3-5 trending topics');
      console.log('5. Present topic proposals to user');
      console.log('6. Update session state with proposals');
      break;

    case 'selection':
      console.log('\n🎯 STAGE 2: Topic Selection\n');
      console.log('Waiting for user to select a topic...');
      if (session.topic_proposals.length > 0) {
        console.log('\nProposed topics:');
        session.topic_proposals.forEach((topic, i) => {
          console.log(`${i + 1}. ${topic.title}`);
        });
      }
      break;

    case 'research':
      console.log('\n🔬 STAGE 3: Deep Research\n');
      console.log('Instructions for Claude Code:');
      console.log('1. Technical research: papers, models, techniques');
      console.log('2. Thoughtful perspectives: cultural analysis');
      console.log('3. Community signals: discussions, forums');
      console.log('4. Predictive analysis: trends, forecasts');
      console.log('5. Organize findings and sources');
      console.log('6. Update session state with research');
      console.log('\nTopic:', session.topic.title);
      break;

    case 'synthesis':
      console.log('\n📝 STAGE 4: Synthesis & Outlines\n');
      console.log('Instructions for Claude Code:');
      console.log('1. Review research findings');
      console.log('2. Create 2-3 article outlines');
      console.log('3. Each with: title, hook, sections, examples');
      console.log('4. Present outlines to user');
      console.log('5. Update session state');
      break;

    case 'style':
      console.log('\n🎨 STAGE 5: Style Selection\n');
      console.log('Waiting for user to select writing style...');
      console.log('\nAvailable styles:');
      console.log('- comprehensive-guide (20-45 min read)');
      console.log('- philosophical-exploration (15-25 min)');
      console.log('- predictive-analysis (15-25 min)');
      console.log('- technical-deep-dive (20-35 min)');
      console.log('- quick-take (5-10 min)');
      break;

    case 'writing':
      console.log('\n✍️  STAGE 6: Article Writing\n');
      console.log('Instructions for Claude Code:');
      console.log('1. Read AGENT_PROMPT.md for writing guidelines');
      console.log('2. Use selected outline and style');
      console.log('3. Write complete article with citations');
      console.log('4. Generate frontmatter');
      console.log('5. Save to content/thoughts/drafts/[slug].md');
      console.log('6. Update session state with draft path');
      console.log('\nStyle:', session.style);
      break;

    default:
      console.log('\nUnknown stage');
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  createNewSession,
  loadSession,
  updateSession,
  archiveSession
};
