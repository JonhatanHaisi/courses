package study.kotlin.oo

import java.util.Random

abstract class AbsClass {
    abstract fun doSomething()
}

class ConcreteClass : AbsClass() {
    override fun doSomething() {

    }
}

open class AParent protected constructor () {
    open fun doSomething(): Int = Random().nextInt()
}

abstract class DDerived : AParent() {
    abstract override fun doSomething(): Int
}

class AlwaysOne : DDerived() {
    override fun doSomething(): Int = 1
}