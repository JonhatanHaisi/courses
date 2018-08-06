package study.kotlin.oo

// Kotlin don't allow us to declare static methods inside
// Java classes, but you can create a function out of any class and it will be static

fun showFirstCharacter(input: String): Char {
    if (input.isEmpty()) throw IllegalArgumentException()
    return input.first()
}

fun main(args: Array<String>) {
    showFirstCharacter("Hello")
}
