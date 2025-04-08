package org.example;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {





                       //ביצוע הקוד לסעיף א'
//
//        try {
//            String logFilePath = "C:\\Users\\user1\\Downloads\\logs1 (1).txt";
//
//            int n = 10;
//            List<Map.Entry<String, Integer>> topErrors = Logs.processLogFile(logFilePath,n);
//            if (topErrors.isEmpty()) {
//                System.out.println("לא נמצאו קודי שגיאה.");
//            } else {
//                topErrors.forEach(entry -> System.out.println(entry.getKey() + ": " + entry.getValue()));
//            }
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }



                                  //ביצוע הקוד לסעיף ב'

        try {
            String filePath="C:\\Users\\user1\\Documents\\לימודי מחשבים\\פרויקט הדסים\\time_series.csv";
            TimeSeries.mergeSplitFilesToAvg(filePath);
        }catch (IOException e){
            e.printStackTrace();
      }




    }
}