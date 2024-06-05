namespace Solver{


    let left: boolean = true
    let right: boolean = true
    let front: number = 0
    const maxFrontDistance: number = 7


    


    export function solve() {

        if (!CarControl.turning) {

            left = CarControl.leftSensorState()
            right = CarControl.rightSensorState()



            front = mecanumRobot.ultra()
            if (!left) {
                CarControl.forward()
                basic.pause(200)
                CarControl.leftTurn(CarControl.turnTime)
                CarControl.forward()
                basic.pause(1000)
            } else if (front > maxFrontDistance) {
                CarControl.forward()
            } else if (!right) {
                CarControl.rightTurn(CarControl.turnTime)
            } else {
                CarControl.stop()
            }
        }
        basic.pause(50)
    }
    
    
}
