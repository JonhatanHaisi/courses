package study.kotlin.oo

sealed class SealedClass {
    class None

    class Some
}

fun main(args: Array<String>) {
    SealedClass.None()
    SealedClass.Some()
    // SealedClass() // sintax error
}