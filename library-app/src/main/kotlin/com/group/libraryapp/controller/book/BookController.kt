package com.group.libraryapp.controller.book

import com.group.libraryapp.dto.book.request.BookLoanRequest
import com.group.libraryapp.dto.book.request.BookRequest
import com.group.libraryapp.dto.book.request.BookReturnRequest
import com.group.libraryapp.dto.book.request.BookUpdateRequest
import com.group.libraryapp.dto.book.response.BookResponse
import com.group.libraryapp.dto.book.response.BookStatResponse
import com.group.libraryapp.service.book.BookService
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["*"])
class BookController (
    private val bookService: BookService,
){

    @GetMapping("/book")
    fun getAllBooks():List<BookResponse>{
        return bookService.getBooks()
    }
    @PostMapping("/book")
    fun saveBook(@RequestBody request: BookRequest) {
        bookService.saveBook(request)
    }

    @PutMapping("/book")
    fun updateBook(@RequestBody request:BookUpdateRequest){
        bookService.updateBook(request)
    }

    @DeleteMapping("/book/{bookId}")
    fun deleteBook(@PathVariable bookId:Long){
        bookService.deleteBook(bookId)
    }


    @PostMapping("/book/loan")
    fun loanBook(@RequestBody request: BookLoanRequest) {
        bookService.loanBook(request)
    }

    @PutMapping("/book/return")
    fun returnBook(@RequestBody request: BookReturnRequest) {
        bookService.returnBook(request)
    }

    @GetMapping("/book/loan/count")
    fun countLoanedBook():Int {
        return bookService.countLoanedBook()
    }

    @GetMapping("/book/stat")
    fun getBookStatistics():List<BookStatResponse> {
        return bookService.getBookStatistics()
    }

}