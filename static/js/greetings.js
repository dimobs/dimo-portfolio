
 function greet() {

    const today = new Date()
    const curHr = today.getHours()
    let timeOftheDay;

    if (curHr < 12) {
        timeOftheDay = ('good morning')
    } else if (curHr < 18) {
        timeOftheDay = ('good afternoon')
    } else {
        timeOftheDay = ('good evening')
    }

    return timeOftheDay;
}

module.exports = greet;