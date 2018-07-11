package com.rjvm.scala.oop.commands

import com.rjvm.scala.oop.filesystem.State

class Pwd extends Command {
  
  override def apply(state: State): State =
    state.setMessage(state.wd.path)
  
}