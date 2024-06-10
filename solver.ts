namespace Solver{


    export let left: boolean = true
    export let right: boolean = true
    export let front: number = 0
    export const maxFrontDistance: number = 12
    
    export let isSolved: boolean = true
    let lastItem: number
    let lock: boolean

    export function update(){
            left = CarControl.leftSensorState()
            right = CarControl.rightSensorState()
            front = mecanumRobot.ultra()
            let lastItem: number = Track.possibleTrack.length - 1
    }


    export function firstSolve() {
        Track.dataArray = []
        Track.possibleTrack = []
        while(!isSolved){
            if (!CarControl.turning) {

                update()


                if (!left) {
                    CarControl.forward()
                    basic.pause(100)
                    CarControl.leftTurn(CarControl.turnTime)
                    CarControl.forward()
                    basic.pause(500)
                    Track.possibleTrackpush(lastItem)
                } else if (front > maxFrontDistance) {
                    if (!right && !lock) {
                        Track.possibleTrack[lastItem] = "rf"
                        Track.dataForwardEnd()
                        Track.dataForwardStart()//specialni pripad - dvakrat po sobe rovne
                        lock = true
                    }else if(right){
                        lock = false
                    }
                    CarControl.forward()
                    basic.pause(100)
                } else if (!right) {
                    CarControl.rightTurn(CarControl.turnTime)
                    CarControl.forward()
                    basic.pause(500)
                } else {
                    Track.deadEnd()
                    
                }





                Track.isDeadEnd = false
                Track.checkFinish()
            }
            basic.pause(50)
        }
        
        
    }

    
    export function otherSolves(){
        for(let i: number = 0; i < Track.possibleTrack.length; i++){
            while(left && right){
                update()
                CarControl.forward()
            }

            basic.pause(300)
            CarControl.stop()
            if(Track.possibleTrack[i] == "1"){
                if (!left) {
                    CarControl.forward()
                    CarControl.leftTurn(CarControl.turnTime)
                    CarControl.forward()
                    basic.pause(500)
                } else if (!right) {
                    CarControl.rightTurn(CarControl.turnTime)
                }
            } else if (Track.possibleTrack[i] == "rf"){
                CarControl.forward();
                basic.pause(500)
            } else if (Track.possibleTrack[i] == "f"){
                CarControl.forward()
                basic.pause(500) 
            } else if (Track.possibleTrack[i] == "r"){
                CarControl.rightTurn(CarControl.turnTime)
            }
        }
        while(!isSolved){
            firstSolve()
        }
    }


    
    export function bestRun(){
        for(let i: number = 0; i < Track.bestWay.length; i++){
            if (Track.bestWay[i] == "l"){
                CarControl.basicLeft(CarControl.turnTime)
            } else if (Track.bestWay[i] == "r"){
                CarControl.basicRight(CarControl.turnTime)
            }else{
                CarControl.forward()
                basic.pause(parseInt(Track.bestWay[i]))
                CarControl.stop()
            }
        }
    }
}
