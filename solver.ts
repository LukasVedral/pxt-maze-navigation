namespace Solver{


    let left: boolean;
    let right: boolean;
    let front: number;
    const maxFrontDistance: number = 7


    


    export function solve() {

        if (!CarControl.turning) {

            left = CarControl.leftSensorState()
            right = CarControl.rightSensorState()



            front = mecanumRobot.ultra()
            if (!left) {
                CarControl.forward()
                basic.pause(200)
                Track.dataForwardEnd()
                
                CarControl.leftTurn(CarControl.turnTime)
                Track.dataLeft()
                CarControl.forward()
                basic.pause(1000)
            } else if (front > maxFrontDistance) {
                CarControl.forward()
                
            } else if (!right) {
                CarControl.rightTurn(CarControl.turnTime)
                Track.dataForwardEnd()
                Track.dataRight()
            } else {
                CarControl.stop()
            }
        }
        basic.pause(50)
    }
    
    
}
