package study.kotlin.functions

fun foo(k: Int) {
    require(k > 10) { "k should be greater than 10" }
}