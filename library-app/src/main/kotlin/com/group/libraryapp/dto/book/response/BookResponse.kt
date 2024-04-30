package com.group.libraryapp.dto.book.response

import com.group.libraryapp.domain.book.Book
import com.group.libraryapp.domain.book.BookType

data class BookResponse(
    val id: Long,
    val name: String,
    val type: BookType
) {
    companion object {
        fun of(book: Book): BookResponse {
            return BookResponse(
                id = book.id!!,
                name = book.name,
                type = book.type
            )
        }
    }
}