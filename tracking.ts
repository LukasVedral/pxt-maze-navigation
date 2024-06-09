namespace Track{

    export let bestWay: Array<string> = []


    //used track
    export let dataArray: Array<string> = []

    let forwardTime0: number;
    let forwardTime1: number;
    let forwardTime: number;
    let forwardTimeToStr: string;


    //if "1" just one possible way
    export let possibleTrack: Array<string> = []

    
    export function dataLeft(){
        dataArray.push("l")
        possibleTrack.push("1")
        }
    export function dataRight(){
        dataArray.push("r")
        possibleTrack.push("1")
        }
    export function dataForwardStart() {forwardTime0 = control.millis()}
    export function dataForwardEnd(){
        forwardTime1 = control.millis()
        forwardTime = Math.round(forwardTime1 - forwardTime0)
        forwardTimeToStr = forwardTime.toString()
        dataArray.push(forwardTimeToStr)
    }



    
    //makes string from DataArray
    export function data(){
        for(let i: number = 0; i < dataArray.length; i++){
            basic.showString(dataArray[i])
            console.log(dataArray[i])
        }
    }

    //makes string from possibleTrack
    export function possible() {
        for (let i: number = 0; i < possibleTrack.length; i++) {
            basic.showString(possibleTrack[i])
        }
    }


    //kdyz nararzi na slepou cestu vati se k posledni krizovatce
    export function deadEnd(){
        CarControl.stop()
        for (let i: number = possibleTrack.length - 1; possibleTrack[i] == "1"; i--) {//dokud se nevrati k posledni krizovatce
            //jede pozpatku - zatacky obracene
            for (let j: number = 0; j < 2; j++) {


                if (dataArray[dataArray.length - 1] == "l") {
                    CarControl.basicRight(CarControl.turnTime)
                } else if (dataArray[dataArray.length - 1] == "r") {
                    CarControl.basicLeft(CarControl.turnTime)
                } else {
                    CarControl.backward()
                    basic.pause(parseInt(dataArray[dataArray.length - 1]))
                    CarControl.basicStop()
                }

                dataArray.splice(dataArray.length - 1, 1)
            }
        }

        for (let i: number = possibleTrack.length - 1; possibleTrack[i] == "1"; i--) {
            possibleTrack.splice(i, 1)
        }

        //odebira z krizovatky slepou cestu
        if (possibleTrack[possibleTrack.length - 1] == "lf") {
            possibleTrack[possibleTrack.length - 1] = "f"
        } else if (possibleTrack[possibleTrack.length - 1] == "lrf") {
            possibleTrack[possibleTrack.length - 1] = "rf"
        } else if (possibleTrack[possibleTrack.length - 1] == "lr") {
            possibleTrack[possibleTrack.length - 1] = "r"
        } else if (possibleTrack[possibleTrack.length - 1] == "rf") {
            possibleTrack[possibleTrack.length - 1] = "r"
        }
    }



    








    //FINISH

    type PossibleFinishes = {
        time: number,
        way: Array<string>
    }


    //vsechny mozne cesty s jejich casama
    export let finishes: Array<PossibleFinishes> = []

    export function checkFinish(){
        if (possibleTrack[possibleTrack.length - 1] == "lrf" && !Solver.right){
            Solver.isSolved = true
            CarControl.stop()
            music.tonePlayable(Note.C, music.beat(BeatFraction.Whole))
            let finalTime: number = 0
            //vypocet celkoveho casu
            for(let i: number = 0; i < dataArray.length; i++){
                if (dataArray[i] == "r" || dataArray[i] == "l"){
                    finalTime += CarControl.turnTime
                }else{
                    finalTime += parseInt(dataArray[i])
                }
            }
            //jedna z cest s jejim casem
            let finish: PossibleFinishes = {
                time: finalTime,
                way: dataArray
            }
            finishes.push(finish)
            checkForOtherWays()
        }
    }


    //kontroluje ostatni cesty
    function checkForOtherWays(){
        for(let i: number = possibleTrack.length - 1; i >= 0; i++){
            if (possibleTrack[i] == "lf") {
                possibleTrack[i] = "f"
                break
            } else if (possibleTrack[i] == "lrf") {
                possibleTrack[i] = "rf"
                break
            } else if (possibleTrack[i] == "lr") {
                possibleTrack[i] = "r"
                break
            } else if (possibleTrack[i] == "rf") {
                possibleTrack[i] = "r"
                break
            }else{
                possibleTrack.splice(possibleTrack.length - 1, 1)
            }
            
            if(i == 0){
                calculateBestFinish()
            }
        }
    }


    
 
    function calculateBestFinish(){
        let firstFinish = finishes[0].time
        //zjisteni nejkratsiho casu
        for(let i: number = 0; i < finishes.length; i++){
            let secondFinish = finishes[i].time
            if(firstFinish - secondFinish >= 0){
                firstFinish = secondFinish
            }
        }

        //zjisteni nejkratsi cesty
        for (let i: number = 0; i < finishes.length; i++) {
            if(finishes[i].time == firstFinish){
                bestWay = finishes[i].way
                break
            }
        }
        basic.showNumber(firstFinish)
    }


    
}
