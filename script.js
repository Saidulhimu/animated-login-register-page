(function () {
    const character = document.getElementById('character');
    const speaker = document.getElementById('speaker');
    const replayBtn = document.getElementById('replayBtn');
    const card = document.getElementById('card');
    const groundShadow = document.querySelector('.ground-shadow');
    const stageCaption = document.querySelector('.stage-caption');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function runSequence() {
        if (reduced) {
            character.classList.add('arrived');
            speaker.classList.add('is-on');
            return;
        }
        character.classList.remove('arrived');
        speaker.classList.remove('is-on');

        // restart CSS animations cleanly
        [character, groundShadow, card, replayBtn, stageCaption].forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth; // force reflow
            el.style.animation = '';
        });
        document.querySelectorAll('.leg, .arm, .head-bob, .briefcase').forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth;
            el.style.animation = '';
        });

        // character finishes walking ~2.05s -> mark arrived, briefcase sets down
        setTimeout(() => character.classList.add('arrived'), 2050);
        // speaker turns on shortly after briefcase is down
        setTimeout(() => speaker.classList.add('is-on'), 2750);
    }

    runSequence();
    replayBtn.addEventListener('click', runSequence);

    // ---- Tabs / mode switching ----
    const tabRegister = document.getElementById('tabRegister');
    const tabLogin = document.getElementById('tabLogin');
    const heading = document.getElementById('heading');
    const subtitle = document.getElementById('subtitle');
    const btnLabel = document.getElementById('btnLabel');
    const switchText = document.getElementById('switchText');
    const switchBtn = document.getElementById('switchBtn');

    const copy = {
        register: {
            heading: 'Register Now',
            subtitle: 'Set the briefcase down, cue the music — your workspace is ready when you are.',
            btn: 'Create account',
            switchText: 'Already have a desk here?',
            switchBtn: 'Sign in',
            toast: "You're in. Welcome to the studio."
        },
        login: {
            heading: 'Welcome Back',
            subtitle: 'Good to see you again — the speaker\'s already warm.',
            btn: 'Sign in',
            switchText: 'New around here?',
            switchBtn: 'Register',
            toast: 'Signed in. Good to have you back.'
        }
    };

    function setMode(mode) {
        tabRegister.classList.toggle('active', mode === 'register');
        tabLogin.classList.toggle('active', mode === 'login');
        const c = copy[mode];
        heading.textContent = c.heading;
        subtitle.textContent = c.subtitle;
        btnLabel.textContent = c.btn;
        switchText.textContent = c.switchText;
        switchBtn.textContent = c.switchBtn;
        card.dataset.mode = mode;
    }
    card.dataset.mode = 'register';

    tabRegister.addEventListener('click', () => setMode('register'));
    tabLogin.addEventListener('click', () => setMode('login'));
    switchBtn.addEventListener('click', () => {
        setMode(card.dataset.mode === 'register' ? 'login' : 'register');
    });

    // ---- Password visibility ----
    const passField = document.getElementById('passField');
    const togglePass = document.getElementById('togglePass');
    togglePass.addEventListener('click', () => {
        const isPass = passField.type === 'password';
        passField.type = isPass ? 'text' : 'password';
        togglePass.setAttribute('aria-label', isPass ? 'Hide password' : 'Show password');
    });

    // ---- Submit ----
    const form = document.getElementById('authForm');
    const submitBtn = document.getElementById('submitBtn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (submitBtn.classList.contains('loading')) return;
        submitBtn.classList.add('loading');
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            toastMsg.textContent = copy[card.dataset.mode].toast;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2600);
        }, 1100);
    });
})();