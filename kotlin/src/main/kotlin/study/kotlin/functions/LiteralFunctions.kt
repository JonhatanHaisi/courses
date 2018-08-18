package study.kotlin.functions

fun main(args: Array<String>) {

    var printHello = { println("Hello") }
    printHello()

    ({ println("I am a function literal") })()

    val printMessage = { message: String -> println(message) }
    printMessage("Hello")

}