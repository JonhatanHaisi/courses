package study.kotlin.oo

import java.io.ByteArrayOutputStream
import java.io.OutputStream

//=======================================================
open class Base {
    open val property: String
        get() = "Base::value"
}

class DerivedA: Base() {
    override val property: String
        get() = "Derivated::value"
}

class DerivatedB(override var property: String) : Base()

//=======================================================
open class Image {
    open fun save(output: OutputStream) {
        println("Some logic to save an image")
    }
}

interface VendorImage {
    fun save(output: OutputStream) {
        println("Vendor saving an image")
    }
}

class PNGImage : Image(), VendorImage {
    override fun save(output: OutputStream) {
        super<VendorImage>.save(output)
        super<Image>.save(output)
    }
}

fun main(args: Array<String>) {
    val pngImage = PNGImage()
    val os = ByteArrayOutputStream()
    pngImage.save(os)
}
