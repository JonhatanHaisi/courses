package study.kotlin.functions

fun positiveRoot(k: Int) = Math.sqrt(k.toDouble())
fun roots(k: Int): ArrayList<Double> {
    val root = positiveRoot(k)
    return arrayListOf(root, - root)
}

class Roots(val pos: Double, val neg: Double) {
    override fun toString(): String {
        return "{$pos $neg}"
    }
}
fun roots2(k: Int): Roots {
    val root = Math.sqrt(k.toDouble())
    return Roots(root, -root)
}

fun roots3(k: Int): Pair<Double, Double> {
    val root = Math.sqrt(k.toDouble())
    return Pair(root, -root)
}

fun main(args: Array<String>) {
    println(roots(2))

    println(roots2(2))

    println(roots3(2))

    val (pos, neg) = roots3(2)
    println("$pos $neg")
}