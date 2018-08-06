package study.kotlin.oo

class BasicGraphWithInner(graphName: String) {
    private val name: String

    init {
        name = graphName
    }

    inner class InnerLine(val x1: Int, val y1: Int, val x2: Int, val y2: Int) {
        fun draw() {
            println("Drawing line from ($x1:$y1) to ($x2:$y2) for graph $name")
        }
    }

    fun draw() {
        println("Drawing the graph $name")
    }
}

fun main(args: Array<String>) {
    val line = BasicGraphWithInner("Graph With Inner").InnerLine(1, 0, -2, 0)
    line.draw()
}