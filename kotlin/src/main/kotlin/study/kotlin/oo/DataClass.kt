package study.kotlin.oo

data class Customer(val id: Int, val name: String, var address: String)

fun main(args: Array<String>) {
    println(Customer(1, "Jhon Doe", "Foo Street"))
}