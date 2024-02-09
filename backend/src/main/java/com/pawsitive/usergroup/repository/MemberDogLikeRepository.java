package com.pawsitive.usergroup.repository;

import com.pawsitive.doggroup.entity.Dog;
import com.pawsitive.usergroup.entity.MemberDogLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberDogLikeRepository extends JpaRepository<MemberDogLike, Long> {

    long countMemberDogLikesByDog(Dog dog);

}