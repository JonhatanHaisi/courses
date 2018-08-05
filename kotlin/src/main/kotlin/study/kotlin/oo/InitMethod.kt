package study.kotlin.oo

fun main(args: Array<String>) {
    val person1 = PersonWithInit("Alex", "Smith", 29)
    val person2 = PersonWithInit("Jane", "Smith", null)

    println("${person1.firstName}, ${person1.lastName} is ${person1.age} years old")
    println("${person2.firstName}, ${person2.lastName} is ${person2.age?.toString() ?: "?"} years old")


}

class PersonWithInit constructor(val firstName: String, val lastName: String, val age: Int?) {

    init {
        require(firstName.isNotEmpty()) { "Invalid first name argument" }
        require(lastName.isNotEmpty()) { "Invalid last name argument" }
        require(age == null || (age in 0..150)) { "Invalid age argument" }
    }

}

