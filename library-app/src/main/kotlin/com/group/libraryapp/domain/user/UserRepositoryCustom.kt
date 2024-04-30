package com.group.libraryapp.domain.user

interface UserRepositoryCustom {
    fun findAlWithHistories():List<User>
}