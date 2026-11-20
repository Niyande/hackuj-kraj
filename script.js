
const starting_time = new Date("2026-12-21T12:00:00").getTime();

function start_clock() {
    const now = new Date().getTime();
    let time = new Date(starting_time-now);
    let h = time.getUTCHours();
    let m = time.getUTCMinutes();
    let s = time.getUTCSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(start_clock, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

start_clock()
