package com.cs50.utils;

import java.util.UUID;

public class StringUtils {

    public static boolean isNotUUID(String value) {
        if (value == null || value.isEmpty()) {
            return true;
        }
        try {
            UUID.fromString(value);
            return false;
        } catch (IllegalArgumentException e) {
            return true;
        }
    }

}
