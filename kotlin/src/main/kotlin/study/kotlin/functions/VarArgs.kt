package study.kotlin.functions

fun multPrint(vararg strings: String) {
    for (s in strings) println(s)
}

fun multPrintPref(prefix: String, vararg strings: String) {
    println(prefix)
    for (s in strings) println(s)
}

fun multPrintSuf(vararg strings: String, sufix: String) {
    for (s in strings) println(s)
    println(sufix)
}

fun main(args: Array<String>) {
    multPrint("a", "b", "c")

    multPrintPref("pref", "a", "b", "c")

    multPrintSuf("a", "b", "c", sufix="sufix")

    val arr = arrayOf("a", "b", "c")
    multPrintSuf("Start", *arr, sufix="sufix")
}
