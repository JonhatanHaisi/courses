package study.kotlin.functions

fun main(args: Array<String>) {
    val task = Runnable { println("Running") }
    Thread(task).apply { setDaemon(true) }.start()
}
