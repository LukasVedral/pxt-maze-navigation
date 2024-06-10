CarControl.setup()



//prvni start a zopakovani nejkratsi cesty
input.onLogoEvent(TouchButtonEvent.Pressed, function() {
    Solver.isSolved = false
    Solver.firstSolve()
})


input.onButtonPressed(Button.A, function() {
    Solver.isSolved = false
    Solver.otherSolves()
})



//v pripade ze auto dojede na start misto cile
input.onButtonPressed(Button.B, function() {
    Track.finishes.splice(Track.finishes.length -1, 1)
})
