package study.kotlin.basics

fun main(args: Array<String>) {

    val unmodifiable = 1
    // unmodifiable = 2 // Compilation error

    var modifiable = 1
    modifiable = 2 // no errors

}