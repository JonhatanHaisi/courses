package study.kotlin.oo

class A {
    private val somefield = 1

    inner class B {
        private val somefield = 2

        fun foo() {
            println("Field <somefield> from B " + this.somefield)
            println("Field <somefield> from B " + this@B.somefield)
            println("Field <somefield> from A " + this@A.somefield)
        }
    }
}

fun main(args: Array<String>) {
    A().B().foo()
}