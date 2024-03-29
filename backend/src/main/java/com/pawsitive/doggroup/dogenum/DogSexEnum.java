package com.pawsitive.doggroup.dogenum;

import lombok.Getter;

@Getter
public enum DogSexEnum {
    MALE("m", 1), FEMALE("f", 2);
    private final String name;
    private final int no;

    DogSexEnum(String name, int no) {
        this.name = name;
        this.no = no;
    }

    /**
     * n에 해당하는 소문자 성별을 반환하는 메서드입니다.
     *
     * @param n 숫자
     * @return 소문자 성별 문자
     */
    public static String intToString(int n) {
        for (DogSexEnum value : DogSexEnum.values()) {
            if (value.getNo() == n) {
                return value.getName();
            }
        }
        return null;
    }

    /**
     * str에 해당하는 no를 반환하는 메서드입니다.
     *
     * @param str 성별 (대/소문자 둘 다 가능)
     * @return 성별에 해당하는 숫자
     */
    public static int stringToInt(String str) {
        for (DogSexEnum value : DogSexEnum.values()) {
            if (value.getName().equalsIgnoreCase(str)) {
                return value.getNo();
            }
        }

        return 0;
    }

}
