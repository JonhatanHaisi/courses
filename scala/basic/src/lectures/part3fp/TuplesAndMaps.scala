package lectures.part3fp

object TuplesAndMaps extends App {
  
  // tuples = finite ordered "list"
  val aTuple = (2, "hello, scala")
  
  println(aTuple._1)
  println(aTuple.copy(_2 = "goodbye Java"))
  println(aTuple.swap)
  
  // maps - keys -> values
  val aMap: Map[String, Int] = Map()
  
  val phonebook = Map(("Jim", 555), "Daniel" -> 999).withDefaultValue(-1)
  // a -> is sugar for (a, b)
  println(phonebook)
  
  // map ops
  println(phonebook.contains("Jim"))
  println(phonebook("Jim"))
  // println(phonebook("Mary")) // error if no default value
  println(phonebook("Mary"))
  
  // add pairing
  val newPairing = "Mary" -> 111
  val newPhonebook = phonebook + newPairing
  println(newPhonebook)
  
  // functionals on maps
  // map, flatMap, filter
  println(phonebook.map(pair => pair._1.toLowerCase -> pair._2))
  
  // filter keys
  println(phonebook.filterKeys(x => x.startsWith("J")))
  // mapValues
  println(phonebook.mapValues(number => number * 10))
  
  // conversions to other collections
  println(phonebook.toList)
  println(List(("Daniel", 555)).toMap)
  
  val names = List("Bob", "James", "Angela", "Mary", "Daniel", "Jim")
  println(names.groupBy(name => name.charAt(0)))
}
