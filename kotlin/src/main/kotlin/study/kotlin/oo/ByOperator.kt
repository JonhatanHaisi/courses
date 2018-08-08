package study.kotlin.oo

interface InterfaceForAsOperator {
    fun printSomeText(): Unit
}

class InterfaceForAsOperatorImpl : InterfaceForAsOperator {
    override fun printSomeText() {
        println("Some text")
    }
}

class ClassUsingByOperator : InterfaceForAsOperator by InterfaceForAsOperatorImpl()

fun main(args: Array<String>) {
    ClassUsingByOperator().printSomeText()
}