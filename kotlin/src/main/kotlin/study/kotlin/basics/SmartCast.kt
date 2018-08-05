package study.kotlin.basics

fun main(args: Array<String>) {
    ifStringPrintLength("Hi")
    println(checkIfIsNotEmptyString("Hi"))
    println(checkIfIsNotString("Hi"))

    ifStringPrintLength(1)
    println(checkIfIsNotEmptyString(1))
    println(checkIfIsNotString(1))
}

fun ifStringPrintLength(any: Any) {
    if (any is String) {
        println(any.length)
    }
}

fun checkIfIsNotEmptyString(any: Any) = any is String && any.length > 0

fun checkIfIsNotString(any: Any) = any !is String || any.length > 0