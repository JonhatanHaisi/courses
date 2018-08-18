package study.kotlin.functions

class Matrix(val a: Int, val b: Int, val c: Int, val d: Int) {
    override fun toString(): String {
        return "[$a, $b, $c, $d]"
    }

    operator fun plus(matrix: Matrix): Matrix =
            Matrix(a + matrix.a,b + matrix.b,c + matrix.c,d + matrix.d)
}

operator fun Matrix.minus(matrix: Matrix): Matrix =
        Matrix(a - matrix.a,b - matrix.b,c - matrix.c,d - matrix.d)

/*
        ===== BASIC OPERATORS =====

   +--------------+-------------------+
   | Operator     | Function Name     |
   +--------------+-------------------+
   | a + b        | a.plus(b)         |
   +--------------+-------------------+
   | a - b        | a.minus(b)        |
   +--------------+-------------------+
   | a * b        | a.times(b)        |
   +--------------+-------------------+
   | a / b        | a.div(b)          |
   +--------------+-------------------+
   | a & b        | a.mob(b)          |
   +--------------+-------------------+
   | a..b         | a.rangeTo(b)      |
   +--------------+-------------------+
   | +a           | a.unaryPlus()     |
   +--------------+-------------------+
   | -a           | a.unaryMinus()    |
   +--------------+-------------------+
   | !a           | a.not()           |
   +--------------+-------------------+
   | in/contains  | a.contains(b)     |
   +--------------+-------------------+
   | a[0]         | a.set(b) a.get(b) |
   +--------------+-------------------+
   | a(b)         | a.invoke(b)       |
   +--------------+-------------------+
   | == >= <= > < | a.compareTo(b)    |
   +--------------+-------------------+
   | a += b       | a.plusAssign(b)   |
   +--------------+-------------------+
   | a -= b       | a.minusAssign(b)  |
   +--------------+-------------------+
   | a *= b       | a.timesAssign(b)  |
   +--------------+-------------------+
   | a /= b       | a.divAssign(b)    |
   +--------------+-------------------+
   | a %= b       | a.modAssign(b)    |
   +--------------+-------------------+

   Java code doesn't needs the operator key word

*/

fun main(args: Array<String>) {
    println( Matrix(1, 2, 3, 4) + Matrix(5, 6, 7, 8) )
    println( Matrix(1, 2, 3, 4) - Matrix(5, 6, 7, 8) )
}
