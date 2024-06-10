namespace CarControl {
    const speed: number = 85
    export const turnTime: number = 440
    export let turning: boolean
    let lock: boolean
    


    //movement
    export function forward() {
        if(!lock){
            Track.dataForwardStart()
            lock = true
        }
        mecanumRobot.Motor(LR.Lower_right, MD.Back, speed + 4)
        mecanumRobot.Motor(LR.Upper_right, MD.Forward, speed + 5)
        mecanumRobot.Motor(LR.Lower_left, MD.Forward, speed)
        mecanumRobot.Motor(LR.Upper_left, MD.Back, speed)
    }

    export function leftTurn(pause: number) {
        if(lock){
            Track.dataForwardEnd()
            lock = false
        }
         Track.dataLeft()
        mecanumRobot.Motor(LR.Lower_right, MD.Back, speed)
        mecanumRobot.Motor(LR.Upper_right, MD.Forward, speed + 2)
        mecanumRobot.Motor(LR.Lower_left, MD.Back, speed)
        mecanumRobot.Motor(LR.Upper_left, MD.Forward, speed)
        turning = true
        basic.pause(pause)
        stop()
        turning = false
    }
    
    export function rightTurn(pause: number) {
        if(lock){
            Track.dataForwardEnd()
            lock = false
        }
        Track.dataRight()
        mecanumRobot.Motor(LR.Lower_right, MD.Forward, speed)
        mecanumRobot.Motor(LR.Upper_right, MD.Back, speed + 2)
        mecanumRobot.Motor(LR.Lower_left, MD.Forward, speed)
        mecanumRobot.Motor(LR.Upper_left, MD.Back, speed)
        turning = true
        basic.pause(pause)
        stop()
        turning = false
    }

    export function stop() {
        if (lock) {
            Track.dataForwardEnd()
            lock = false
        }
        mecanumRobot.Motor(LR.Lower_right, MD.Forward, 0)
        mecanumRobot.Motor(LR.Upper_right, MD.Forward, 0)
        mecanumRobot.Motor(LR.Lower_left, MD.Forward, 0)
        mecanumRobot.Motor(LR.Upper_left, MD.Forward, 0)
    }



    export function backward(){
        mecanumRobot.Motor(LR.Lower_right, MD.Forward, speed + 4)
        mecanumRobot.Motor(LR.Upper_right, MD.Back, speed + 5)
        mecanumRobot.Motor(LR.Lower_left, MD.Back, speed)
        mecanumRobot.Motor(LR.Upper_left, MD.Forward, speed)
        
    }
    export function basicRight(pause: number){
        mecanumRobot.Motor(LR.Lower_right, MD.Forward, speed)
        mecanumRobot.Motor(LR.Upper_right, MD.Back, speed + 2)
        mecanumRobot.Motor(LR.Lower_left, MD.Forward, speed)
        mecanumRobot.Motor(LR.Upper_left, MD.Back, speed)
        turning = true
        basic.pause(pause)
        basicStop()
    }
    export function basicLeft(pause: number) {
        mecanumRobot.Motor(LR.Lower_right, MD.Back, speed)
        mecanumRobot.Motor(LR.Upper_right, MD.Forward, speed + 2)
        mecanumRobot.Motor(LR.Lower_left, MD.Back, speed)
        mecanumRobot.Motor(LR.Upper_left, MD.Forward, speed)
        turning = true
        basic.pause(pause)
        basicStop()
    }
    export function basicStop() {
        mecanumRobot.Motor(LR.Lower_right, MD.Forward, 0)
        mecanumRobot.Motor(LR.Upper_right, MD.Forward, 0)
        mecanumRobot.Motor(LR.Lower_left, MD.Forward, 0)
        mecanumRobot.Motor(LR.Upper_left, MD.Forward, 0)
    }











    // ---- SENSORS ----
    const leftSensor = DigitalPin.P0;
    const rightSensor = DigitalPin.P13;
    const frontRightSensor = DigitalPin.P12;
    const frontLeftSensor = DigitalPin.P7;

    export function sensorSetup() {
        pins.setPull(leftSensor, PinPullMode.PullNone);
        pins.setPull(frontLeftSensor, PinPullMode.PullNone);
        pins.setPull(frontRightSensor, PinPullMode.PullNone);
        pins.setPull(rightSensor, PinPullMode.PullNone);
        led.enable(false);
        mecanumRobot.setServo(94)
    }


    export function leftSensorState() {
        return pins.digitalReadPin(leftSensor) === 0;
    }
    export function rightSensorState() {
        return pins.digitalReadPin(rightSensor) === 0;
    }
    export function leftFrontSensorState() {
        return pins.digitalReadPin(frontLeftSensor) === 0;
    }
    export function rightFrontSensorState() {
        return pins.digitalReadPin(frontRightSensor) === 0;
    }



    export function setup(){
        sensorSetup()
        Track.dataArray = []
        Track.possibleTrack = []
    }
}

