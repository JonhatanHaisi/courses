package study.kotlin.basics

fun main(args: Array<String>) {

    try {
        1 / 0
    } catch (e: ArithmeticException) {
        println("Division by zero")
    } finally {
        println("Finally")
    }
}