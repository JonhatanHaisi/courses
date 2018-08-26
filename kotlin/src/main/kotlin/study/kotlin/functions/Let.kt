package study.kotlin.functions

import java.nio.file.Paths

fun main(args: Array<String>) {
    val outputPath = Paths.get("/user/home").let {
        val path = it.resolve("output")
        path.toFile().createNewFile()
        path
    }
}