package org.example;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;


/*
 תשובה לחלק א' סעיף ב'
   3:
הרעיון בstream הוא שהנתונים מגיעים בזמן אמת ,ולא מתקבלים מראש בקובץ שלם ולכן אי אפשר להעביר את כולם ישירות לmap
כי הם לא מתקבלים בבת אחת כמו קובץ לקריאה אלא על הדרך זורמים הנתונים ולכן צריך לחשב את הממוצע תוך כדי פעולה של זרימת נתונים
שכל פעם מגיע נותן אחד ולכן נעשה פונקציה שתקבל בכל פעם שורת נתונים נוכחית שמועברת מהstream ועבור כל שורה תכניס את הפרטים
שלה ,כלומר תעלה את מס הנתונים ותוסיף את הערך שלה לסכום ותחשב את הממוצע מחדש בהתאם לשורות שהיו עד כה כי לא ניתן לדעת מראש
 את כל הנתונים או הכמות שלהם בצורה מדויקת כמו מקובץ
 */



public class TimeSeries {
    //פונקציה שמקבלת ניתוב לקובץ קוראת את התוכן שלו ושומרת אותו ברשימה ומחזירה אותה
    public static List<List<String>> getDataFromFile(String filePath) throws IOException {
        List<List<String>> data = new ArrayList<>();
        try(BufferedReader read=new BufferedReader(new FileReader(filePath))){
            String line;
            read.readLine();
            while((line=read.readLine())!=null){
                String[] currLine = line.split(",");
                List<String> lineData= Arrays.asList(currLine);
                data.add(lineData);
            }
        }
        return data;
    }



    //פונקציה שמקבלת רשימה של כל השורות של תאריכים וערכים ובודקת תקינות שלהם ומסננת ערכים כפולים ומכניה ומחזירה map רק עם הערכים הרלוונטים
    public static Map<LocalDateTime,Double> checkData(List<List<String>> data){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        Map<LocalDateTime,Double> times=new HashMap<>();

        for(List<String> line: data){
            if(line.size()==2) {
                try {
                    LocalDateTime time = LocalDateTime.parse(line.get(0), formatter);
                    if (Double.parseDouble(line.get(1)) >= 0) {
                        times.putIfAbsent(time, Double.parseDouble(line.get(1)));
                    }
                } catch (DateTimeParseException e) {
                    System.out.println("date not right: ");
                } catch (NumberFormatException e) {
                    System.out.println("Invalid number format: " );
                }}

        }
        return times;
    }



    //פונקציה שמקבלת Map של תאריך וערך ומחזירה map חדש שבו קיים עבור כל שעה בתאריך מסוים את הממוצע של הערכים בשעה הזו
    public static Map<LocalDateTime,Double> averageTime(Map<LocalDateTime,Double> data){
        Map<LocalDateTime,List<Double>> sortValByHour=new HashMap<>();
        Map<LocalDateTime,Double> average=new HashMap<>();
        for(Map.Entry<LocalDateTime,Double> entry: data.entrySet()){
            LocalDateTime timeByHour = entry.getKey().withMinute(0).withSecond(0);
            sortValByHour.putIfAbsent(timeByHour, new ArrayList<>());
            sortValByHour.get(timeByHour).add(entry.getValue());
        }
        for(Map.Entry<LocalDateTime,List<Double>> entry:sortValByHour.entrySet()){
            int cnt=0;
            double sum=0;
            for(Double n: entry.getValue()){
                sum+=n;
                cnt++;
            }
            average.put(entry.getKey(),(sum/cnt));
        }

        return average;

    }



    //פונקציה שמקבלת ניתוב לקובץ ואת השם של תהקייה ומחלקת לקבצים לפי ימים ומחזירה רשימה של קבצים מחולקים
    public static List<File> splitFile(String filePath, String folderName) throws IOException {
        File dir = new File(folderName);
        if (!dir.exists())
            dir.mkdirs();
        List<File> divFiles=new ArrayList<>();
        List<List<String>> fileData;
        if (filePath.endsWith(".csv")) {
             fileData=getDataFromFile(filePath);
        } else if (filePath.endsWith(".parquet")) {
             fileData=ReadParquet.readParquet(filePath);
        } else {
            throw new IOException("file is wrong");
        }


        Map<LocalDateTime, List<List<String>>> dataDivByDays=new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        LocalDateTime timeByDay ;

        for (List<String> data:fileData){
            timeByDay = LocalDateTime.parse(data.get(0), formatter).withHour(0).withMinute(0);
            dataDivByDays.computeIfAbsent(timeByDay, k -> new ArrayList<>()).add(data);
        }
        int fileCount=0;
        for (List<List<String>> dayList:dataDivByDays.values()){

            try {
                fileCount++;
                File newFile = new File(folderName, "time_series_part_" + fileCount + ".csv");

                try (BufferedWriter write = new BufferedWriter(new FileWriter(newFile))) {
                    for (List<String> lineData : dayList) {
                        String line = String.join(",", lineData);
                        write.write(line);
                        write.newLine();
                    }
                    divFiles.add(newFile);

                }
            } catch (IOException e) {

            }
        }
        return divFiles;

    }


    //פונקציה שמקבלת ניתוב לקובץ ושולחת אותו לפונקציות אחרות כך שמוחזר ממנה מפה שהמפתחות בה הם לפי שעה בכל תאריך והערכים הם הממוצע של הערכים שהיה בשעה הזו בקובץ המקורי
    public static  Map<LocalDateTime,Double> processTimeFile(String filePath)  {
        Map<LocalDateTime, Double> average = new HashMap<>();
        try {
            List<List<String>> data = getDataFromFile(filePath);
            Map<LocalDateTime, Double> chackedData = checkData(data);
            average = averageTime(chackedData);
        } catch (IOException e){
            e.printStackTrace();
        }
        return average;
    }



    //פונקציה שמקבלת נתיב של קובץ עם תאריכים שעות וערכים ועבור כל יום מחלקת לקובץ נפרד, ואז יוצרת מכל קובץ כזה MAP שבו
//עבור כל שעה לכל קובץ(שמחולק ליום) יוצרת מפה שמכילה את התאריך והשעה המדוברת ומכניסה בערך את הממוצע של השעה הזו
// ןאז הפונקציה ממזגת את כל המפות של הממוצעים לפי ימים לקובץ אחד ומחזירה אותו
    public static File mergeSplitFilesToAvg(String filePath) throws IOException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        List<File> splitedFiles=splitFile(filePath,"Time_Series_Folder");
        List< Map<LocalDateTime,Double>> splitAvgMaps=new ArrayList<>();
        for (File file:splitedFiles){
            Map<LocalDateTime,Double> currAvgMap=processTimeFile(file.getAbsolutePath());
            splitAvgMaps.add(currAvgMap);
        }
        System.out.println(splitAvgMaps);

        File newFile=new File("avg_by_hour.csv");
        try (BufferedWriter write= new BufferedWriter(new FileWriter(newFile))){
            for (Map<LocalDateTime, Double> map : splitAvgMaps){
                for (Map.Entry<LocalDateTime, Double> entry : map.entrySet()){
                    write.write(entry.getKey().format(formatter) + "," + entry.getValue());
                    write.newLine();
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return newFile;
    }


}
