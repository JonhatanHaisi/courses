package study.kotlin.basics

fun main(args: Array<String>) {
    funcWithCast("Hi")
    funcWithCastAndNulls("Hi")
    funcWithCastAndNulls(null)
}

fun funcWithCast(any: Any) {
    val str: String = any as String
    println(str.length)
}

fun funcWithCastAndNulls(any: Any?) {
    val str: String? = any as? String
    println(str?.length)
}