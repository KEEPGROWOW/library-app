package com.group.libraryapp.domain.book

import org.jetbrains.annotations.NotNull
import javax.persistence.*

@Entity
class Book(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @NotNull
    var name: String,

    @Enumerated(EnumType.STRING)
    val type: BookType,


) {


    init {
        if (name.isBlank()) {
          throw IllegalArgumentException("이름은 비어 있을 수 없습니다")
        }
    }

    fun updateName(name: String) {
        this.name = name;
    }

    companion object {
        fun fixture(
            name: String = "책 이름",
            type: BookType = BookType.COMPUTER,
            id: Long
        ):Book {
            return Book(
                name = name,
                type = type,
                id = id,
            )
        }
    }


}