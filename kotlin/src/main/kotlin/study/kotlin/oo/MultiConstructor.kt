package study.kotlin.oo

fun main(args: Array<String>) {
    val person1 = PersonWithMultiConstructor("Alex", "Smith", 29)
    val person2 = PersonWithMultiConstructor("Jane", "Smith")

    println("${person1.firstName}, ${person1.lastName} is ${person1.age} years old")
    println("${person2.firstName}, ${person2.lastName} is ${person2.age?.toString() ?: "?"} years old")


}

class PersonWithMultiConstructor constructor(val firstName: String, val lastName: String, val age: Int?)  {

    constructor(firstName: String, lastName: String) : this(firstName, lastName, null)

    init {
        require(firstName.isNotEmpty()) { "Invalid first name argument" }
        require(lastName.isNotEmpty()) { "Invalid last name argument" }
        require(age == null || (age in 0..150)) { "Invalid age argument" }
    }

}

