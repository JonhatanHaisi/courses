package com.rjvm.scala.oop.commands

import com.rjvm.scala.oop.files.File
import com.rjvm.scala.oop.filesystem.State
import com.rjvm.scala.oop.files.DirEntry

class Touch (name: String) extends CreateEntry(name) {
  
  override def createSpecificEntry(state: State): DirEntry =
    File.empty(state.wd.path, name)
  
}