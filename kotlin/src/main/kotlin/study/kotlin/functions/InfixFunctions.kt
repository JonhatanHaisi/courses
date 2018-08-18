package study.kotlin.functions

class Account {
    var balance = 0.0

    fun add(amount: Double): Unit {
        this.balance += amount
    }
}

class InfixAccount {
    var balance = 0.0

    infix fun add(amount: Double) {
        this.balance += amount
    }
}

fun main(args: Array<String>) {
    println("London" to "UK") // returns Pair instance

    Account().add(10.0)

    var acct = InfixAccount()
    acct add 10.0
}