package study.kotlin.basics

fun main(args: Array<String>) {
    // var value: String = null // Compilation error
    var value: String? = null
    println(value?.length)

    value = "Non-null value"
    println(value?.length)
}