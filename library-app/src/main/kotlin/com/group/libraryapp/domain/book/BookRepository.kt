package com.group.libraryapp.domain.book

import org.springframework.data.jpa.repository.JpaRepository

interface BookRepository : JpaRepository<Book, Long> {

    fun findFirstByOrderByIdDesc(): Book?
    fun findByName(bookName: String):Book?
}