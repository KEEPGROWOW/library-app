package com.group.libraryapp.dto.user.response

import com.group.libraryapp.domain.user.User
import com.group.libraryapp.domain.user.loanhistory.UserLoanHistory

data class UserLoanHistoryResponse(
    val name:String,   // 유저 이름
    val books:List<BookHistoryResponse>
) {
    companion object{
        // 관심사 분리
        // of()를 통해 Service 계층에서 DTO를 조합했던 것을
        // DTO에서 조합할 수 있도록 레펙토링
        fun of(user: User):UserLoanHistoryResponse {
            return UserLoanHistoryResponse(
                name = user.name,
                books = user.userLoanHistories.map(BookHistoryResponse::of)
            )
        }
    }
}

data class BookHistoryResponse(
    val name: String,  // 책 이름
    val isReturn : Boolean,
){
    companion object{
        // 관심사 분리
        // of()를 통해 Service 계층에서 DTO를 조합했던 것을
        // DTO에서 조합할 수 있도록 레펙토링
        fun of(history: UserLoanHistory):BookHistoryResponse {
            return BookHistoryResponse(
                name = history.bookName,
                isReturn = history.isReturn
            )

        }
    }
}