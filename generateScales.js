const NOTES = [ 
    'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭/F#', 'G', 'A♭', 'A', 'B♭', 'B'
]

function DEFAULTS() {
    let alwaysInclude = majorScales();
    let selection = minorScales();
    return {
        alwaysInclude: alwaysInclude,
        selection: selection,
    };
}

function majorScales() {
    return NOTES.map(note => note.concat(' Maj'));
}

function naturalMinorScales() {
    return NOTES.map(note => note.concat(' Min (nat)'));
}

function harmonicMinorScales() {
    return NOTES.map(note => note.concat(' Min (harm)'));
}

function melodicMinorScales() {
    return NOTES.map(note => note.concat(' Min (mel)'));
}

function minorScales() {
    return [naturalMinorScales(), harmonicMinorScales(), melodicMinorScales()]
        .reduce((acc, current) => acc.concat(current));
}

function allScales() {
    return majorScales()
        .concat(minorScales());
}

function shuffle(list) {
    return list.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
}

function alwaysIncluded() {
    return allScales().filter(scale => {
        let checkbox = document.getElementById(`always-include-${scale}`);
        return checkbox.checked;
    });
}

function chosenForSelection() {
    return allScales().filter(scale => {
        let checkbox = document.getElementById(`select-${scale}`);
        return checkbox.checked;
    });
}

function selectScales() {
    // we want all the major scales, plus seven randomly chosen minor scales
    // of any type
    const NUM_SELECT = 7;

    let selection = shuffle(chosenForSelection()).slice(0, NUM_SELECT);
    let always = alwaysIncluded();
    let set = always.concat(selection);
    let shuffled = shuffle(set);
    return shuffled.reduce((acc, current) => acc.concat(current.concat("<br>")), "");
}

function applyScaleSetDisplay() {
    let html = '<table class="w-auto mx-auto">';
    html += '<tr>'
    html += '<th>Scale</th>'
    html += '<th>Always include</th>'
    html += '<th>Choose for selection</th>'
    html += '</tr>'
    let scales = allScales();
    for (let i = 0; i < scales.length; i++) {
        let inAlways = DEFAULTS().alwaysInclude.includes(scales[i]) ? "checked" : "";
        let inSelection = DEFAULTS().selection.includes(scales[i]) ? "checked" : "";
        html += '<tr>';
        html += `<td class="text-center w-fit">${scales[i]}</td>`;
        html += `<td class="text-center w-min">
        <input 
            type="checkbox"
            id="always-include-${scales[i]}" ${inAlways}>
        </input></td>`
        html += `<td class="text-center w-min">
        <input 
            type="checkbox" 
            id="select-${scales[i]}" ${inSelection}>
        </input></td>`

        html += '</tr>';
    }
    html += '</table>';

    document.getElementById('scaleset').innerHTML = html;
}