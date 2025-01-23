const NOTES = [ 
    'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭/F#', 'G', 'A♭', 'A', 'B♭', 'B'
]

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

function selectScales() {
    // we want all the major scales, plus seven randomly chosen minor scales
    // of any type
    const NUM_MINOR = 7;

    let major = majorScales();
    let minor = shuffle(minorScales()).slice(0, NUM_MINOR);
    let set = major.concat(minor);
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
        html += '<tr>';
        html += `<td class="text-center w-fit">${scales[i]}</td>`;
        html += `<td class="text-center w-min">
        <input 
            type="checkbox" 
            id="always-include-${scales[i]}">
        </input></td>`
        html += `<td class="text-center w-min">
        <input 
            type="checkbox" 
            id="select-${scales[i]}">
        </input></td>`

        html += '</tr>';
    }
    html += '</table>';

    document.getElementById('scaleset').innerHTML = html;
}