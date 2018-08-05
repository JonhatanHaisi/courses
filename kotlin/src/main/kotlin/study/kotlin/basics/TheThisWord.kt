package study.kotlin.basics

fun main(args: Array<String>) {
    Person("Jhon Doe").printMe()
}

class Person(name: String) {
    fun printMe() = println(this)
}

class Building(val address: String) {
    inner class Reception(telephone: String) {
        fun printAddress() = println(this@Building.address)
    }
}