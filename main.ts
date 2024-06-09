/*CarControl.sensorSetup()
mecanumRobot.setLed(LedCount.Left, LedState.ON)
mecanumRobot.setLed(LedCount.Right, LedState.ON)

input.onLogoEvent(TouchButtonEvent.Pressed, function() {
    Solver.isSolved = false
    while(!Solver.isSolved){
        Solver.firstSolve()
        basic.pause(50)
    }
})


input.onButtonPressed(Button.A, function() {
    Solver.isSolved = false
    Solver.otherSolves()
    basic.pause(50)
})



//v pripade ze auto dojede na start misto cile
input.onButtonPressed(Button.B, function() {
    Track.finishes.splice(Track.finishes.length -1, 1)
})
*/