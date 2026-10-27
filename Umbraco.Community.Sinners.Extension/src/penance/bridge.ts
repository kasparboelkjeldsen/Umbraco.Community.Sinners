/**
 * The sin bridge, browser half: when the backoffice runs framed inside the talk's deck, tell the deck
 * whenever a sin is absolved, so it re-polls GET /umbraco/sinners/status and updates its counts. Only call
 * absolved() after the server has finished the action: the deck counts from the server, not from the message.
 */

export type CommandmentNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

function post(message: Record<string, unknown>) {
    if (window.parent === window) return;
    try {
        window.parent.postMessage({ source: 'sinners', ...message }, location.origin);
    } catch { /* a parent on another origin just doesn't hear it */ }
}

/** A Board action (a fix step, Fold In, Bless, a ✨ pretend, Confess, Exodus…) has absolved something. */
export function absolved(commandment: CommandmentNumber, action: string, pretended = false) {
    console.log(`[BRIDGE] absolved commandment=${commandment} action=${action} pretended=${pretended}`);
    post({ type: 'absolved', commandment, action, pretended });
}

/** The Penance Board is on screen. */
export function boardMounted() {
    post({ type: 'board' });
}

/**
 * The clicker pressed next with nothing left in the script (every step of X is done): the deck takes the
 * clicker back and moves on. Posted again on every further press, in case the first one was missed.
 */
export function scriptEnded() {
    console.log('[BRIDGE] end of the script');
    post({ type: 'end' });
}
