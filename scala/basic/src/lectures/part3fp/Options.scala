package lectures.part3fp

import scala.util.Random

object Options extends App {
  
  val myFirstOption: Option[Int] = Some(4)
  val noOption: Option[Int] = None

  println(myFirstOption)
  
  // unsafe APIs
  def unsafeMethod(): String = null
  // val result = Some(unsafeMethod()) // wrong
  val result = Option(unsafeMethod()) // Some or None
  println(result)
  
  // chained methods
  def backupMethod(): String = "A valid result"
  val chainedResult = Option(unsafeMethod()).orElse(Option(backupMethod()))
  
  // DESIGN unsafe APIS
  def betterUnsafeMethod(): Option[String] = None
  def betterBackupMethos(): Option[String] = Some("A valid result")
  
  val bettherChainedResult = betterUnsafeMethod() orElse betterBackupMethos()
  
  // functions on options
  println(myFirstOption.isEmpty)
  println(myFirstOption.get) // UNSAFE - DO NOT USE
  
  // map, flatMap, filter
  println(myFirstOption.map(_ * 2))
  println(myFirstOption.filter(x => x > 10))
  println(myFirstOption.flatMap(x => Option(x * 10)))
  
  /*
   * Exercise. 
   */
  val config: Map[String, String] = Map(
    "host" -> "176.45.36.1",
    "port" -> "80"
  )
  
  class Connection {
    def connect = "Connected"
  }
  
  object Connection {
    val random = new Random(System.nanoTime())
    
    def apply(host: String, port: String): Option[Connection] =
      if (random.nextBoolean()) Some(new Connection)
      else None
  }
  
  // try to establish a connection, if so - print the connect method
  val host = config.get("host")
  val port = config.get("port")
  
  val connection = host.flatMap(h => port.flatMap(p => Connection(h, p)))
  val connectionStatus = connection.map(c => c.connect)
  println(connectionStatus)
  connectionStatus.foreach(println)
  
  // chained calls
  config.get("host")
        .flatMap(host => config.get("port")
            .flatMap(port => Connection(host, port))
            .map(connection => connection.connect))
        .foreach(println)
            
  
  // for-comprehensions
  val forConnectionStatus = for {
    host <- config.get("host")
    port <- config.get("port")
    connection <- Connection(host, port)
  } yield connection.connect
  
  forConnectionStatus.foreach(println)
}
