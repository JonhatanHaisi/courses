package study.kotlin.functions

fun doSomething(x: Int) {
    require(x == 0, { "Error x == 0" })
    assert(x == 1, { "Error x == 1" })
    check(x == 3, { "Error x == 3" })
    println("Passed with no errors")
}