package study.kotlin.basics

import java.io.File

fun main(args: Array<String>) {
    val file1 = File("/")
    val file2 = File("/")

    println(file1 === file2) // false === for check same instance
    println(file1 === file1) // true === for check same instance
    println(file1 == file2) // true == call .equals

}