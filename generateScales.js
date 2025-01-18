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

function selectScales() {
    let set = allScales();
    let shuffled = set.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
    return shuffled.reduce((acc, current) => acc.concat(current.concat("<br>")), "");
}