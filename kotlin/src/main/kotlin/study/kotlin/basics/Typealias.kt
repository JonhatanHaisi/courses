package study.kotlin.basics

class MyClass<A, B, C, D>

typealias MyClassWithAlias = MyClass<String, String, Int, Long>
typealias MyClassWithAlias2 = MyClass<String, String, Int, Long>

fun funWithAlias(arg: MyClassWithAlias): MyClassWithAlias? = null

fun main(args: Array<String>) {
    val x: MyClassWithAlias2 = MyClassWithAlias()
    funWithAlias(x)
}