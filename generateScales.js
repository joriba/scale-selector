const NOTES = [ 
    'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭/F#', 'G', 'A♭', 'A', 'B♭', 'B'
]

function generateScales() {
    let set = NOTES.map(note => note.concat('Maj'));
    let shuffled = set.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
    return shuffled.reduce((acc, current) => acc.concat(current.concat("<br>")), "");
}