package study.kotlin.functions

fun main(args: Array<String>) {
    fun readFromBD(): String = "String from database"
    val lazyString = lazy { readFromBD() }

    println("before use lazy value")
    println(lazyString.value)
}