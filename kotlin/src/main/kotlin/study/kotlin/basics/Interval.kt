package study.kotlin.basics

fun main(args: Array<String>) {
    val interval = 1..10

    println(11 in interval)
    println(1 in interval)

    (1 .. 10).step(2).forEach { println("$it") }
}