package study.kotlin.functions

fun deleteFiles(filePattern: String, recursive: Boolean, ignoreCase: Boolean, deleteDirectories: Boolean) {}

fun main(args: Array<String>) {
    val string = "a kindness of ravens"

    string.regionMatches(14, "Red Ravens", 4, 6, true)
    string.regionMatches(thisOffset = 14, other = "Red Ravens", otherOffset = 4, length = 6, ignoreCase = true)

    deleteFiles("*.jpg", true, true, false)
    deleteFiles("*.jpg", recursive = true, ignoreCase = true, deleteDirectories = false)

    string.endsWith(suffix = "ravens", ignoreCase = true)
    string.endsWith(ignoreCase = true, suffix = "ravens")
}