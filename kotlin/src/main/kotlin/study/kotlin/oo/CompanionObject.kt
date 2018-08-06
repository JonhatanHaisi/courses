package study.kotlin.oo

// A simple singleton object
object Singleton {
    private var count = 0

    fun doSomething(): Unit {
        println("Calling a soSomething (${++count} call/-s in total)")
    }
}

// Inheritance using singleton
open class SingletonParent(var x: Int) {
    fun something() {
        println("X=$x")
    }
}

object SingletonDerive : SingletonParent (10)

// static function: Factory using companion
interface StudentFactory {
    fun create(name: String): Student
}

class Student private constructor(val name: String) {
    companion object : StudentFactory {
        override fun create(name: String): Student = Student(name)
    }
}


fun main(args: Array<String>) {
    Singleton.doSomething()
    Singleton.doSomething()

    println(Student.create("Jhon Joe"))
}
