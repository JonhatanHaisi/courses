package study.kotlin.oo

import java.io.InputStream
import java.math.BigDecimal
import java.time.LocalDate

enum class CardType { VISA, MASTERCARD, AMEX }

// In Kotlin classes are "final" as default
// open allow us to use inheritance
open class Payment(val amount: BigDecimal)

class CardPayment(amount: BigDecimal, val number: String, val expiryDate: LocalDate, val type: CardType) : Payment(amount)

class CheckPayment : Payment {

    constructor(amount: BigDecimal, name: String, bankId: String) : super(amount) {
        this.name = name
        this.bankId = bankId
    }

    var name: String
        get() = this.name

    var bankId: String
        get() = this.bankId
}

interface IPersistable {
    fun save(stream: InputStream)
}

interface IPrintable {
    fun print()
}

abstract class AbstractDocument(val title: String)

class TextDocument(title: String): IPersistable, AbstractDocument(title), IPrintable {

    override fun save(stream: InputStream) {}

    override fun print() {}

}
