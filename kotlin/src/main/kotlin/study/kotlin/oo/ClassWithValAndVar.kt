package study.kotlin.oo

fun main(args: Array<String>) {
    val person1 = PersonWithValAndVar("Alex", "Smith", 29)
    val person2 = PersonWithValAndVar("Jane", "Smith", null)

    println("${person1.firstName}, ${person1.lastName} is ${person1.getAge()} years old")
    println("${person2.firstName}, ${person2.lastName} is ${person2.getAge()?.toString() ?: "?"} years old")
}

class PersonWithValAndVar constructor(val firstName: String, var lastName: String, howOld: Int?) {

    private val age: Int?

    init {
        this.age = howOld
    }

    fun getAge() = this.age
}