package study.kotlin.basics

fun main(args: Array<String>) {
    println(doWhen(1))
    println(doWhen(2))
    println(doWhen(5))
    println(doWhen(8))
    println(doWhen("Hi"))
    println(when(77) {
        Math.abs(-77) -> "Is absolute"
        else -> "Else"
    })
    println(doWhen(true))

    println(whenWithoutArgs(1, 2))
    println(whenWithoutArgs(2, 1))
    println(whenWithoutArgs(2, 2))
}

fun doWhen(x: Any): String {
    return when (x) {
        1 -> "Is one"
        2, 3 -> "Two or Three"
        in 4..6 -> "From 4 to 6"
        in listOf(7, 8) -> "At list"
        is String -> "It is a String"
        else -> "Else"
    }
}

fun whenWithoutArgs(x: Int, y: Int): String {
    return when {
        x > y -> "X is bigger"
        y > x -> "Y is bigger"
        else -> "They are equals"
    }
}