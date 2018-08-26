package study.kotlin.functions

import java.nio.file.Paths

fun main(args: Array<String>) {
    val outputPath = Paths.get("/user/home").run {
        val path = resolve("output")
        path.toFile().createNewFile()
        path
    }
}