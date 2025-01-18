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