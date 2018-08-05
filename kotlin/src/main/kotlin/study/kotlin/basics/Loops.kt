package study.kotlin.basics

fun main(args: Array<String>) {

    while (true) {
        println("In while")
        break
    }

    for (i in 1..10)
        println(i)

    // we can use inside for some objects that
    // have the method iterator

    // the iterator have to return an object with the
    // following methods:
    // - hasNext(): Boolean
    // - next(): T
}