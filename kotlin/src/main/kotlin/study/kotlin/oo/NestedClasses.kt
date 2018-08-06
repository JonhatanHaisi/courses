package study.kotlin.oo

class BasicGraph(val name: String) {
    class Line(val x1: Int, val y1: Int, val x2: Int, val y2: Int) {
        fun draw() {
            println("Drawing Line from ($x1:$y1) to ($x2:$y2)")
        }
    }

    fun draw() {
        println("Drawing the graph $name")
    }
}

fun main(args: Array<String>) {
    val line = BasicGraph.Line(1, 0, -2, 0)
    line.draw()
}