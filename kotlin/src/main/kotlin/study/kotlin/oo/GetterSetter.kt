package study.kotlin.oo

class GetterSetter {

    private var property : String
        get() = this.property
        set(value) { this.property = value }

    val constant = "Constant"
        // can't have getter or setter
}
