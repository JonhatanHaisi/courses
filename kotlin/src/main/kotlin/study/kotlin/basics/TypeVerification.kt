package study.kotlin.basics

fun main(args: Array<String>) {
    println(isString("Hi"))
    println(isString(1.0))
}

fun isString(any: Any) = any is String