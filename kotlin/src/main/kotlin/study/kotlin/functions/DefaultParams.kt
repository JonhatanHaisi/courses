package study.kotlin.functions

import java.math.BigDecimal
import java.math.RoundingMode
import java.util.*
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

fun createThreadPool(): ExecutorService {
    val threadCount = Runtime.getRuntime().availableProcessors()
    return createThreadPool(threadCount)
}

fun createThreadPool(threadCount: Int): ExecutorService {
    return Executors.newFixedThreadPool(threadCount)
}

class Student(val name: String, val registred: Boolean, credits: Int) {
    constructor(name: String) : this (name, false, 0)
    constructor(name: String, registred: Boolean): this(name, registred, 0)
}


fun divide(divisor: BigDecimal, scale: Int = 0, roundingMode: RoundingMode = RoundingMode.UNNECESSARY) {}

class Student2(val name: String, val registed: Boolean = false, credits: Int = 0)

fun Any?.safeEquals(other: Any?): Boolean =
    if (this == null && other == null) true
    else if (this == null) false
    else this.equals(other)

class Mappings {
    private val map = hashMapOf<Int, String>()
    private fun String.stringAdd() = map.put(hashCode(), this) // can be open

    fun add(str: String) = str.stringAdd()
}

fun Int.Companion.random() = Random().nextInt()

fun main(args: Array<String>) {
    divide(BigDecimal(12.34))
    divide(BigDecimal(12.34), 0)
    divide(BigDecimal(12.34), 8, RoundingMode.HALF_DOWN)

    // divide(BigDecimal(12.34), RoundingMode.HALF_DOWN) // error
    divide(BigDecimal(12.34), roundingMode = RoundingMode.HALF_DOWN)

    val anyNull: Any? = null
    println(anyNull.safeEquals(null))

    Mappings().add("Hi")

    println(Int.random())
}

