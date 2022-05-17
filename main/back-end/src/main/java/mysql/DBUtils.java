package mysql;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

public class DBUtils {
    public interface Model {

        boolean createUser(User user);
        void updateUser(String username, String bio, String uid);
        void updateUserProfile(String uid, String field, String value);
        User getUser(String uid);
        void createDog(Dog dog);

        List<Dog> getDog(String did);

        List<DBUtils.Dog> getDogsFromUserId(String uid);

        MeetUp getMeetUp(String mid);
        void updateMeetUp(String mid, String status);
        void createMeetUp(MeetUp meetUp);

        List<DBUtils.MeetUp> getMeetUpsForUser(String uid);
    }

    @Data
    @AllArgsConstructor
    public static class User {
        private String uid;
        private String username;
        private String phone;
        private String email;
        private String bio;
        private String pic_link;
        private String last_ping;
        private List<Dog> dogs;
    }

    @Data
    @AllArgsConstructor
    public static class MeetUp {
        private String mid;
        private String sender;
        private String receiver;
        private String status;
    }

    @Data
    public class Dog {
        private String did;
        private String name;
        private int age;
        private String gender;
        private String breed;
        private String pic_link;
    }

    @Data
    public class BelongTo {
        private String uid;
        private String did;
    }

    @Data
    public class ExistUserResult {
        private int exist;
    }

    @Data
    public class Location {
        private double lng;
        private double lat;
    }

    @Data
    @AllArgsConstructor
    public static class UserLocation {
        private Location location;
        private String uid;
        private long timestamp;
    }
}

