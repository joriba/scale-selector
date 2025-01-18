const NOTES = [ 
    'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭/F#', 'G', 'A♭', 'A', 'B♭', 'B'
]

function scaleSet() {
    let major = NOTES.map(note => note.concat(' Maj'));
    let natural_minor = NOTES.map(note => note.concat(' Min (nat)'));
    let harmonic_minor = NOTES.map(note => note.concat(' Min (harm)'));
    let melodic_minor = NOTES.map(note => note.concat(' Min (mel)'));
    let set = major.concat(natural_minor, harmonic_minor, melodic_minor);
    return set;
}

function generateScales() {
    let set = scaleSet();
    let shuffled = set.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
    return shuffled.reduce((acc, current) => acc.concat(current.concat("<br>")), "");
}