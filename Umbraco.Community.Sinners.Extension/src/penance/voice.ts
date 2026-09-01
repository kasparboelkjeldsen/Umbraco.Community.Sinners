import { presenter } from './presenter.js';

/**
 * "Hey Umbraco!" — voice control for the presenter bar via the Web Speech API.
 *
 * State machine: off → listening (for the wake phrase) → armed (6s window for a
 * command) → back to listening. Waking is harmless on its own; only a command
 * word inside the armed window presses a button. Purely additive on top of the
 * bar's buttons/keys — if the mic or the room betrays us, the talk continues.
 */

export type VoiceState = 'unsupported' | 'off' | 'starting' | 'listening' | 'armed' | 'error';

export interface VoiceSnapshot {
    state: VoiceState;
    lastHeard: string;
    detail: string;
    /** The four currently-hot magic words, index = button - 1. */
    magicWords: [string, string, string, string];
}

/**
 * Magic words: always hot while the mic is on — no wake phrase, speaking one IS
 * the keypress. Deliberately unrelated to what the button does. Each button shows
 * its current word; firing a word rotates that button to the next word in the pool,
 * so a fired word goes cold immediately (interim transcripts can't double-press)
 * and only 4 of the 50 are ever live at once. Words are 2-4 syllables, mutually
 * phonetically distant, and chosen to never occur in a talk about Umbraco.
 * `rx` tolerates the recognizer splitting compounds ("bubble gum").
 */
const MAGIC_WORDS: Array<{ display: string; rx: RegExp }> = [
    { display: 'pineapple', rx: /\bpine\s?apple\b/i },
    { display: 'banana', rx: /\bbananas?\b/i },
    { display: 'banjo', rx: /\bbanjo\b/i },
    { display: 'tuxedo', rx: /\btuxedo\b/i },
    { display: 'flamingo', rx: /\bflamingo\b/i },
    { display: 'spaghetti', rx: /\bspaghetti\b/i },
    { display: 'unicorn', rx: /\bunicorn\b/i },
    { display: 'volcano', rx: /\bvolcano\b/i },
    { display: 'kangaroo', rx: /\bkangaroo\b/i },
    { display: 'bubblegum', rx: /\bbubble\s?gum\b/i },
    { display: 'helicopter', rx: /\bhelicopter\b/i },
    { display: 'mustache', rx: /\b(?:mustache|moustache)\b/i },
    { display: 'penguin', rx: /\bpenguin\b/i },
    { display: 'pickle', rx: /\bpickle\b/i },
    { display: 'waffle', rx: /\bwaffle\b/i },
    { display: 'zombie', rx: /\bzombie\b/i },
    { display: 'cactus', rx: /\bcactus\b/i },
    { display: 'marshmallow', rx: /\bmarsh\s?mallow\b/i },
    { display: 'tornado', rx: /\btornado\b/i },
    { display: 'octopus', rx: /\boctopus\b/i },
    { display: 'disco', rx: /\bdisco\b/i },
    { display: 'karate', rx: /\bkarate\b/i },
    { display: 'mango', rx: /\bmango\b/i },
    { display: 'iceberg', rx: /\bice\s?berg\b/i },
    { display: 'hammock', rx: /\bhammock\b/i },
    { display: 'yogurt', rx: /\b(?:yogurt|yoghurt)\b/i },
    { display: 'trampoline', rx: /\btrampoline\b/i },
    { display: 'lobster', rx: /\blobster\b/i },
    { display: 'saxophone', rx: /\bsaxophone\b/i },
    { display: 'tumbleweed', rx: /\btumble\s?weed\b/i },
    { display: 'meatball', rx: /\bmeat\s?ball\b/i },
    { display: 'giraffe', rx: /\bgiraffe\b/i },
    { display: 'lighthouse', rx: /\blight\s?house\b/i },
    { display: 'popcorn', rx: /\bpop\s?corn\b/i },
    { display: 'jellyfish', rx: /\bjelly\s?fish\b/i },
    { display: 'hedgehog', rx: /\bhedge\s?hog\b/i },
    { display: 'lasagna', rx: /\b(?:lasagna|lasagne)\b/i },
    { display: 'dinosaur', rx: /\bdinosaurs?\b/i },
    { display: 'coconut', rx: /\bcoconut\b/i },
    { display: 'submarine', rx: /\bsubmarine\b/i },
    { display: 'avalanche', rx: /\bavalanche\b/i },
    { display: 'butterscotch', rx: /\bbutter\s?scotch\b/i },
    { display: 'wheelbarrow', rx: /\bwheel\s?barrow\b/i },
    { display: 'platypus', rx: /\bplatypus\b/i },
    { display: 'accordion', rx: /\baccordion\b/i },
    { display: 'snorkel', rx: /\bsnorkel\b/i },
    { display: 'bulldozer', rx: /\bbull\s?dozer\b/i },
    { display: 'catapult', rx: /\bcatapult\b/i },
    { display: 'ketchup', rx: /\bketchup\b/i },
    { display: 'moonwalk', rx: /\bmoon\s?walk\b/i },
];

const WORDS_STORAGE_KEY = 'sinners-voice-words';

interface WordState {
    active: [number, number, number, number]; // MAGIC_WORDS indices per button
    next: number;
}

function loadWordState(): WordState {
    try {
        const raw = sessionStorage.getItem(WORDS_STORAGE_KEY);
        if (raw) return JSON.parse(raw) as WordState;
    } catch { /* fresh */ }
    return { active: [0, 1, 2, 3], next: 4 };
}

// The recognizer will mangle "Umbraco" — accept its favourite mishearings, but
// always demand the hey/hej prefix: the word "Umbraco" alone is said 200 times per talk.
const WAKE = /\b(?:hey|hej|hay|hei|okay|ok)[,.!?\s]+(?:umbraco|umbrako|umbracco|um\s?braco|um\s?brako|umbra\s?co|umbra|umbrella|braco)\b/i;

// Speak the forbidden name and the control bar manifests. Say it again to banish it.
// While the bar is hidden, this is the ONLY hot word — the backoffice stays vanilla.
// The recognizer butchers "Sitecore" enthusiastically: site call / sitecall / side core /
// sight core / cite core / site corps / psycho — all accepted as utterances of the name.
const SUMMON = /\b(?:site|sight|side|cite|sit)[\s-]?(?:core|call|cor|corps|coal|cole|col|kor|gore|corn)s?\b|\b(?:psycho|cycle)\b/i;

// Command words → button number. Generous with homophones ("tree", "for", "won").
const COMMANDS: Array<{ pattern: RegExp; action: 1 | 2 | 3 | 4 }> = [
    { pattern: /\b(?:one|won|1|penance|confess)\b/i, action: 1 },
    { pattern: /\b(?:two|to|too|2|next)\b/i, action: 2 },
    { pattern: /\b(?:three|tree|free|3|exhibit|show)\b/i, action: 3 },
    { pattern: /\b(?:four|for|fore|4|reload)\b/i, action: 4 },
];

const ARM_WINDOW_MS = 6000;
const STORAGE_KEY = 'sinners-voice-enabled';

// Minimal typings — lib.dom still doesn't ship SpeechRecognition everywhere.
interface SRAlternative { transcript: string }
interface SRResultList { length: number; [index: number]: { isFinal: boolean; length: number; [index: number]: SRAlternative } }
interface SREvent { resultIndex: number; results: SRResultList }
interface SRErrorEvent { error: string }
interface SpeechRecognitionLike {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    processLocally?: boolean;
    onresult: ((e: SREvent) => void) | null;
    onend: (() => void) | null;
    onerror: ((e: SRErrorEvent) => void) | null;
    start(): void;
    stop(): void;
    abort(): void;
}
interface SRConstructor {
    new (): SpeechRecognitionLike;
    available?: (options: { langs: string[]; processLocally: boolean }) => Promise<string>;
    install?: (options: { langs: string[]; processLocally: boolean }) => Promise<unknown>;
}

function getSR(): SRConstructor | null {
    const w = window as unknown as { SpeechRecognition?: SRConstructor; webkitSpeechRecognition?: SRConstructor };
    return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

class SinnersVoice {
    #state: VoiceState = getSR() ? 'off' : 'unsupported';
    #lastHeard = '';
    #detail = '';
    #words: WordState = loadWordState();
    #recognition: SpeechRecognitionLike | null = null;
    #armTimer?: number;
    #refractoryUntil = 0;
    #listeners = new Set<(snap: VoiceSnapshot) => void>();
    #audioCtx: AudioContext | null = null;
    #processLocally = false;

    constructor() {
        if (this.#state !== 'unsupported' && localStorage.getItem(STORAGE_KEY) === '1') {
            // Auto-resume across the presenter's full-page navigations (permission persists)
            void this.enable();
        }
    }

    get snapshot(): VoiceSnapshot {
        return {
            state: this.#state,
            lastHeard: this.#lastHeard,
            detail: this.#detail,
            magicWords: this.#words.active.map((i) => MAGIC_WORDS[i].display) as [string, string, string, string],
        };
    }

    subscribe(fn: (snap: VoiceSnapshot) => void): () => void {
        this.#listeners.add(fn);
        return () => this.#listeners.delete(fn);
    }

    #notify() {
        const snap = this.snapshot;
        this.#listeners.forEach((fn) => fn(snap));
    }

    #setState(state: VoiceState, detail = '') {
        this.#state = state;
        this.#detail = detail;
        this.#notify();
    }

    async enable() {
        const SR = getSR();
        if (!SR) return;
        localStorage.setItem(STORAGE_KEY, '1');
        this.#setState('starting');

        // Prefer on-device recognition (Chrome 139+) — venue wifi is not to be trusted.
        try {
            if (SR.available) {
                const availability = await SR.available({ langs: ['en-US'], processLocally: true });
                if (availability === 'available') {
                    this.#processLocally = true;
                } else if (availability === 'downloadable' && SR.install) {
                    void SR.install({ langs: ['en-US'], processLocally: true }); // ready for next time
                }
            }
        } catch { /* server-based it is */ }

        this.#startRecognition();
    }

    disable() {
        localStorage.setItem(STORAGE_KEY, '0');
        if (this.#armTimer) clearTimeout(this.#armTimer);
        const rec = this.#recognition;
        this.#recognition = null; // signals onend not to restart
        try { rec?.abort(); } catch { /* already gone */ }
        this.#setState('off');
    }

    #startRecognition() {
        const SR = getSR();
        if (!SR) return;
        try { this.#recognition?.abort(); } catch { /* fine */ }

        const rec = new SR();
        rec.lang = 'en-US';
        rec.continuous = true;
        rec.interimResults = true;
        rec.maxAlternatives = 3;
        if (this.#processLocally) {
            try { rec.processLocally = true; } catch { /* older Chrome */ }
        }

        rec.onresult = (e) => {
            for (let i = e.resultIndex; i < e.results.length; i++) {
                const result = e.results[i];
                for (let j = 0; j < result.length; j++) {
                    this.#handleTranscript(result[j].transcript);
                }
            }
        };

        rec.onerror = (e) => {
            if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
                this.#recognition = null;
                this.#setState('error', 'microphone blocked — allow it and re-enable');
            } else if (e.error === 'network') {
                this.#setState('error', 'speech service unreachable (venue wifi?) — retrying');
            }
            // 'no-speech' / 'aborted' etc: onend handles the restart
        };

        rec.onend = () => {
            // Chrome's recognizer gives up after a few seconds of silence — the
            // standard dance is to just start it again, forever, until disabled.
            if (this.#recognition === rec) {
                setTimeout(() => {
                    if (this.#recognition === rec) {
                        try { rec.start(); } catch { this.#startRecognition(); }
                    }
                }, 250);
            }
        };

        this.#recognition = rec;
        try {
            rec.start();
            this.#setState('listening');
        } catch {
            this.#setState('error', 'could not start recognition');
        }
    }

    /** Also the test/debug hook: window.sinnersVoice.simulate('hey umbraco three') */
    simulate(transcript: string) {
        if (this.#state === 'off' || this.#state === 'error') this.#setState('listening');
        this.#handleTranscript(transcript);
    }

    #lastLogged = '';

    #handleTranscript(raw: string) {
        const text = raw.trim();
        if (!text) return;
        // Debug: log everything the recognizer captures (deduped — interim results
        // repeat the same text many times per utterance)
        if (text !== this.#lastLogged) {
            this.#lastLogged = text;
            console.log(`[VOICE] heard: "${text}" (state=${this.#state}, hot=[${this.#words.active.map((i) => MAGIC_WORDS[i].display).join(', ')}])`);
        }
        this.#lastHeard = text;
        this.#notify();

        if (Date.now() < this.#refractoryUntil) return;

        // The summon word works regardless of bar visibility — it IS the reveal
        if (SUMMON.test(text)) {
            this.#refractoryUntil = Date.now() + 1500;
            const visible = presenter.toggleBar();
            console.log(`[VOICE] SUMMON — the forbidden name was spoken, bar ${visible ? 'manifested' : 'banished'}`);
            if (visible) { this.#beep(660); setTimeout(() => this.#beep(990), 130); }
            else this.#beep(330, 0.18);
            return;
        }

        // Vanilla mode: bar hidden → every other word is cold
        if (!presenter.barVisible) return;

        if (this.#state === 'armed') {
            if (this.#tryCommand(text)) return;
        }

        // Magic words: always hot, no wake phrase — speaking one IS the keypress
        if (this.#state === 'listening' && this.#tryMagicWord(text)) return;

        const wake = WAKE.exec(text);
        if (wake && this.#state === 'listening') {
            this.#arm();
            // "hey umbraco three" in one breath — check the tail of the same utterance
            const tail = text.slice(wake.index + wake[0].length);
            if (tail) this.#tryCommand(tail);
        }
    }

    #tryMagicWord(text: string): boolean {
        for (let button = 0; button < 4; button++) {
            const word = MAGIC_WORDS[this.#words.active[button]];
            if (!word.rx.test(text)) continue;

            console.log(`[VOICE] magic word "${word.display}" → button ${button + 1}`);
            this.#refractoryUntil = Date.now() + 1500;
            this.#beep(1320);

            // Rotate: fired word goes cold, button draws the next from the pool
            this.#words.active[button] = this.#words.next;
            this.#words.next = (this.#words.next + 1) % MAGIC_WORDS.length;
            try { sessionStorage.setItem(WORDS_STORAGE_KEY, JSON.stringify(this.#words)); } catch { /* fine */ }
            this.#notify();

            this.#execute((button + 1) as 1 | 2 | 3 | 4);
            return true;
        }
        return false;
    }

    #execute(action: 1 | 2 | 3 | 4) {
        if (action === 1) void presenter.next();
        else if (action === 2) presenter.nextTab();
        else if (action === 3) presenter.dot();
        else window.location.reload();
    }

    #arm() {
        this.#beep(880);
        this.#setState('armed');
        if (this.#armTimer) clearTimeout(this.#armTimer);
        this.#armTimer = window.setTimeout(() => {
            if (this.#state === 'armed') {
                this.#beep(220, 0.2);
                this.#setState('listening');
            }
        }, ARM_WINDOW_MS);
    }

    #tryCommand(text: string): boolean {
        const hit = COMMANDS.find((c) => c.pattern.test(text));
        if (!hit) return false;

        if (this.#armTimer) clearTimeout(this.#armTimer);
        this.#refractoryUntil = Date.now() + 1500; // interim results repeat — fire once
        this.#beep(1320);
        this.#setState('listening');

        console.log(`[VOICE] command ${hit.action} from "${text}"`);
        this.#execute(hit.action);
        return true;
    }

    /** Blind confirmation: wake = mid beep, command = high beep, timeout = low buzz. */
    #beep(freq: number, duration = 0.12) {
        try {
            this.#audioCtx ??= new AudioContext();
            const ctx = this.#audioCtx;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain).connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch { /* silence is acceptable */ }
    }
}

export const voice = new SinnersVoice();

// Stage-debug escape hatch (and the Playwright hook)
(window as unknown as { sinnersVoice: SinnersVoice }).sinnersVoice = voice;
