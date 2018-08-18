package study.kotlin.functions

object Rectangle {
    fun printArea(width: Int, height: Int): Unit {
        val area = calculateArea(width, height)
        println("The area is $area")
    }

    fun calculateArea(width: Int, height: Int): Int {
        return width * height
    }
}
