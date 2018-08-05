package study.kotlin.basics

class AccessModifiers {

    val defaultModifier = "The default is public"
    public val publicModifier = "Public is visible to everyone"
    private val privateModifier = "Visible only inside this class"
    protected val protectedModifier = "Visible to this class and any other class how extends this one"
    internal val indernalModifier = "Internal is related to modules. This constant can be used by all file inside the module"

}

