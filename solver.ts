namespace Solver{


    export let left: boolean = true
    export let right: boolean = true
    let front: number = 0
    const maxFrontDistance: number = 12
    
    export let isSolved: boolean = true

    export function update(){
            left = CarControl.leftSensorState()
            right = CarControl.rightSensorState()
            front = mecanumRobot.ultra()
    }


    export function firstSolve() {
        if (!CarControl.turning) {

            update()


            if (!left) {
                CarControl.forward()
                basic.pause(300)
                CarControl.leftTurn(CarControl.turnTime)
                CarControl.forward()
                basic.pause(500)
            } else if (front > maxFrontDistance) {
                Track.possibleTrack.push("1")
                CarControl.forward()
                basic.pause(100)
            } else if (!right) {
                CarControl.rightTurn(CarControl.turnTime)
            } else {
                Track.deadEnd()
                
            }



            let lastItem: number = Track.possibleTrack.length - 1

            if(!left && front > maxFrontDistance){
                Track.possibleTrack[lastItem] = "lf"
            }
            if(!right){
                if(!left){
                    if(front > maxFrontDistance){   
                        Track.possibleTrack[lastItem] = "lrf"
                    }else{
                        Track.possibleTrack[lastItem] = "lr"
                    }
                }else if (front > maxFrontDistance){
                    Track.possibleTrack[lastItem] = "rf"
                    Track.dataForwardEnd()
                    Track.dataForwardStart()//specialni pripad - dvakrat po sobe rovne
                }
            }
            
            Track.checkFinish()
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

            Track.checkFinish()
        }
    }


    
    
}
