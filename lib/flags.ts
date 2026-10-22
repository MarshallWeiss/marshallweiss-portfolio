/**
 * Personal essays are hidden until there are better ones to publish.
 *
 * This single switch controls both the "Thinking out loud" section on the
 * homepage and the "Mine" tab on /thoughts, so the two can't drift out of
 * sync. It also makes /thoughts/[slug] 404 while off. Set it to true to
 * publish the essays again; nothing has been deleted.
 */
export const SHOW_PERSONAL_WRITING = false;
