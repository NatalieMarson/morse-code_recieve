// If the user inputs a wrong morse code, an x will appear on the screen and the user will have to restart.
// this function is ploting a single dot, this will be
// used for showing the dot, . will be saved,
// in a string to demonstrate the dot
function AddADot () {
    led.plot(2, 2)
    CharacterString = "" + CharacterString + "."
    basic.pause(500)
    basic.clearScreen()
}
// This function is plotting a dash by showing three
// led's, - will be saved in a string to
// demonstrate the dash
function AddADash () {
    for (let index = 0; index <= 2; index++) {
        led.plot(index + 1, 2)
    }
    CharacterString = "" + CharacterString + "-"
    basic.pause(500)
    basic.clearScreen()
}
// When button a is pressed go to the function
input.onButtonPressed(Button.A, function () {
    AddADot()
})
// this function will reset all of the variables, after
// it was already saved
function ClearVariable () {
    CharacterString = ""
    let CodeReceived
radio.setGroup(1)
    CharReceive = ""
    CheckCodeSent = ""
}
// when button a and b are pressed call the function
input.onButtonPressed(Button.AB, function () {
    Time = input.runningTime()
    radio.sendValue(CharacterString, CharacterString.length)
    TimeOut()
})
// will set the variables to the different strings,
// it will then be sent to the function MorseCodeCheck, to
// make sure it sent the right thing.
radio.onReceivedString(function (receivedString) {
    CodeSent = receivedString
    CheckCodeSent = MCCode[MCCharacter.indexOf(CodeSent)]
    MorseCodeCheck()
})
// When button b is pressed call the function
input.onButtonPressed(Button.B, function () {
    AddADash()
})
// When the microbit is shook clear the variables
input.onGesture(Gesture.Shake, function () {
    ClearVariable()
})
radio.onReceivedValue(function (name, value) {
    CharReceive = name
    basic.showString(CharReceive)
    MorseCode()
})
// This function will resend the string if it is taking
// to long
function TimeOut () {
    if (input.runningTime() - Time > 10000) {
        radio.sendValue(CharacterString, CharacterString.length)
    }
}
// this function checks if the morse code that was sent
// was the write one, if yes then it will show a check,
// if not it will resend the string
function MorseCodeCheck () {
    if (CheckCodeSent == CharacterString) {
        basic.showIcon(IconNames.Yes)
        ClearVariable()
    } else {
        basic.showIcon(IconNames.No)
        radio.sendValue(CharacterString, CharacterString.length)
    }
}
// This function translates the numbers into which
// letters they corrospond with, and enter it into the string
// The running time is noted to make sure it does not take to long
// it will send the string
function MorseCode () {
    CodeReceived2 = MCCharacter[MCCode.indexOf(CharReceive)]
    basic.showString("" + (CodeReceived2))
    radio.sendString("" + (CodeReceived2))
}
/**
 * This is the second microbit, it will be the first reciever
 */
/**
 * MCCharacter and MCCode show the morse code symbols for each
 */
/**
 * This states that the variables are all empty
 */
/**
 * letter
 */
let CodeSent = ""
let CheckCodeSent = ""
let CharReceive = ""
let MCCode: string[] = []
let MCCharacter: string[] = []
let Time = 0
let CharacterString = ""
CharacterString = ""
let CodeReceived2
radio.setGroup(1)
Time = 0
let TimeCheck = 0
MCCharacter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
MCCode = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....-", "-....", "--...", "---..", "----.", "-----"]
CharReceive = ""
CheckCodeSent = ""
