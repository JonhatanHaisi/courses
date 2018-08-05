package study.kotlin.basics

fun main(args: Array<String>) {

    val ifExpression = if (10 / 5 == 2) true else false
    println(ifExpression)

    val tryCatchExpression = try {
        1 / 0
        true
    } catch (e: Exception) {
        false
    }
    println(tryCatchExpression)

    val blockExpression = {
        val one = 1
        val two = 2
        one + two
    }
    println(blockExpression())
}