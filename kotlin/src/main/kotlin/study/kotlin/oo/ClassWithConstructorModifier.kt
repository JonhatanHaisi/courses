package study.kotlin.oo

fun main(args: Array<String>) {
    val person1 = PersonWithModifier("Alex", "Smith", 29)
    val person2 = PersonWithModifier("Jane", "Smith", null)

    println("${person1.firstName}, ${person1.lastName} is ${person1.age} years old")
    println("${person2.firstName}, ${person2.lastName} is ${person2.age?.toString() ?: "?"} years old")
}

class PersonWithModifier internal constructor(val firstName: String, val lastName: String, val age: Int?)