namespace CarControl {
    const speed: number = 80
    export const turnTime: number = 510
    export let turning: boolean = false
    let lock: boolean = false
    


    //movement
    export function forward() {
        if(!lock){
            Track.dataForwardStart()
            lock = true
        }
        mecanumRobot.Motor(LR.Lower_right, MD.Back, speed)
        mecanumRobot.Motor(LR.Upper_right, MD.Forward, speed + 5)
        mecanumRobot.Motor(LR.Lower_left, MD.Forward, speed)
        mecanumRobot.Motor(LR.Upper_left, MD.Back, speed)
    }

    export function leftTurn(pause: number) {
        Track.dataForwardEnd()
        lock = false
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
        Track.dataForwardEnd()
        lock = false
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

}
