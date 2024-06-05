namespace Track{


    let dataArray: Array<string> = []

    let forwardTime0: number;
    let forwardTime1: number;
    let forwardTime: number;
    let forwardTimeToStr: string;



    export function dataLeft(){ dataArray.push("l") }
    export function dataRight(){ dataArray.push("r") }
    export function dataForwardStart() {forwardTime0 = control.millis()}
    export function dataForwardEnd(){
        forwardTime1 = control.millis()
        forwardTime = forwardTime1 - forwardTime0
        forwardTimeToStr = forwardTime.toString()
        dataArray.push(forwardTimeToStr)
    }

    
    //udělá z pole string
    export function data(){
        for(let i: number = 0; i < dataArray.length; i++){
            basic.showString(dataArray[i])
        }
    }
    




}



