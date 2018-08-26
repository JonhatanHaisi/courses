package study.kotlin.functions

fun fact(k: Int): Int {
    tailrec fun factTail(m: Int, n: Int): Int =
        if (m in 0..1) n
        else factTail(m - 1, n * m)

    return factTail(k,1)
}

fun main(args: Array<String>) {
    println(fact(10))
}