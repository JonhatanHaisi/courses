package study.kotlin.functions

import java.nio.file.Files
import java.nio.file.Paths

fun main(args: Array<String>) {
    // used instead try with resources (will close the resource)
    val input = Files.newInputStream(Paths.get("input.txt"))
    val byte = input.use { input.read() }
}