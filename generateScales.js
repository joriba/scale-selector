const NOTES = [
    'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭/F#', 'G', 'A♭', 'A', 'B♭', 'B'
]

const SCALE_GROUPS = [
    { name: 'Major', suffix: ' Maj' },
    { name: 'Natural minor', suffix: ' Min (nat)' },
    { name: 'Harmonic minor', suffix: ' Min (harm)' },
    { name: 'Melodic minor', suffix: ' Min (mel)' },
].map(group => ({ ...group, scales: NOTES.map(note => note + group.suffix) }));

function DEFAULTS() {
    return {
        alwaysInclude: majorScales(),
        selection: minorScales(),
    };
}

function majorScales() {
    return SCALE_GROUPS[0].scales;
}

function minorScales() {
    return SCALE_GROUPS.slice(1).flatMap(group => group.scales);
}

function allScales() {
    return SCALE_GROUPS.flatMap(group => group.scales);
}

function shuffle(list) {
    return list.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function checkedScales(kind) {
    return [...document.querySelectorAll(`input[data-kind="${kind}"]:checked`)]
        .map(checkbox => checkbox.dataset.scale);
}

function alwaysIncluded() {
    return checkedScales('always');
}

function chosenForSelection() {
    return checkedScales('select');
}

// Returns a shuffled list of { scale, random } where `random` marks scales
// drawn from the selection pool (as opposed to always-included ones).
function selectScales() {
    const numSelect = Math.max(0, parseInt(document.getElementById('num-select').value, 10) || 0);
    const always = alwaysIncluded();
    // don't draw scales that are already always included
    const pool = chosenForSelection().filter(scale => !always.includes(scale));

    const drawn = shuffle(pool).slice(0, numSelect).map(scale => ({ scale, random: true }));
    const fixed = always.map(scale => ({ scale, random: false }));
    return shuffle(fixed.concat(drawn));
}

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
}

function checkbox(kind, scale, checked) {
    return `<input type="checkbox"
        class="h-4 w-4 cursor-pointer accent-indigo-500"
        data-kind="${kind}" data-scale="${escapeHtml(scale)}"
        aria-label="${kind === 'always' ? 'Always include' : 'Include in random pool'}: ${escapeHtml(scale)}"
        ${checked ? 'checked' : ''}>`;
}

function groupToggle(kind, groupIndex, label) {
    return `<button type="button"
        class="rounded px-1.5 py-0.5 text-xs text-slate-400 hover:bg-slate-700 hover:text-slate-100"
        onclick="toggleGroup(${groupIndex}, '${kind}')">${label}</button>`;
}

function toggleGroup(groupIndex, kind) {
    const scales = SCALE_GROUPS[groupIndex].scales;
    const boxes = [...document.querySelectorAll(`input[data-kind="${kind}"]`)]
        .filter(box => scales.includes(box.dataset.scale));
    const allChecked = boxes.every(box => box.checked);
    boxes.forEach(box => { box.checked = !allChecked; });
    updateSummary();
}

function applyScaleSetDisplay() {
    const defaults = DEFAULTS();
    let html = '<div class="grid gap-4 sm:grid-cols-2">';

    SCALE_GROUPS.forEach((group, groupIndex) => {
        html += `<section class="rounded-lg border border-slate-700 bg-slate-900/50 p-3">
            <h3 class="mb-2 font-semibold text-slate-200">${group.name}</h3>
            <table class="w-full text-sm">
                <thead>
                    <tr class="text-xs uppercase tracking-wide text-slate-400">
                        <th class="pb-1 text-left font-medium">Scale</th>
                        <th class="pb-1 text-center font-medium">Always<br>${groupToggle('always', groupIndex, 'toggle')}</th>
                        <th class="pb-1 text-center font-medium">Pool<br>${groupToggle('select', groupIndex, 'toggle')}</th>
                    </tr>
                </thead>
                <tbody>`;
        group.scales.forEach(scale => {
            html += `<tr class="border-t border-slate-800 hover:bg-slate-800/60">
                <td class="py-1 pr-2 text-slate-300">${escapeHtml(scale)}</td>
                <td class="py-1 text-center">${checkbox('always', scale, defaults.alwaysInclude.includes(scale))}</td>
                <td class="py-1 text-center">${checkbox('select', scale, defaults.selection.includes(scale))}</td>
            </tr>`;
        });
        html += '</tbody></table></section>';
    });
    html += '</div>';

    const container = document.getElementById('scaleset');
    container.innerHTML = html;
    container.addEventListener('change', updateSummary);
    updateSummary();
}

function updateSummary() {
    const always = alwaysIncluded();
    const pool = chosenForSelection().filter(scale => !always.includes(scale));
    document.getElementById('selection-summary').textContent =
        `${always.length} always · ${pool.length} in pool`;
}

function displayScales() {
    const list = selectScales();
    const container = document.getElementById('randomized-display');
    if (list.length === 0) {
        container.innerHTML = '<p class="col-span-full text-center text-slate-400">No scales selected — open the settings below.</p>';
        return;
    }
    container.innerHTML = list.map(({ scale, random }, i) => `
        <li class="flex items-center gap-3 rounded-lg border px-3 py-2 ${random
            ? 'border-amber-500/40 bg-amber-500/10'
            : 'border-indigo-500/40 bg-indigo-500/10'}">
            <span class="w-5 text-right text-xs tabular-nums text-slate-500">${i + 1}</span>
            <span class="font-medium text-slate-100">${escapeHtml(scale)}</span>
        </li>`).join('');
}
