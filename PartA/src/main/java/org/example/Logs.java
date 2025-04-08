package org.example;

import java.io.*;
import java.util.*;

/*
פתרון לחלק א' סעיף א'
5.
סיבוכיות זמן:
N=מס שורות בקובץ
M=מס סוגי שגיאות
הפונקציה הראשונה שנקראת היא splitFile והיא מקבלת את הקובץ ומנסה לעבור על כל שורה בקובץ לקרוא וישר לכתוב אותה לקובץ
חדש ולכן סהכ הפונקציה תעבור על N שורות וזמן הריצה =O(N)
 הפונקציה הבאה countErrorsInFile מקבלת את כל הקבצים החדשים ועוברת על כולם ומכניסה לmap
 שזה O(1), היא עושה את זה על כל שורה מהקובץ המקורי ולכן סהכ זמן ריצה= O(N)
 הפונקציה הבאה mergeCounters מקבלת את כל הmaps של סכומי השגיאות מכל הקבצים ועוברת על כולם ועבור כל אחד מהם
 עוברת על כל האיברים שבmap ומכניסה את כולם לmap אחד. מעבר על כל האיברים עבור כל map יהיה O(M) כי הוא חילק וסכם לפי סוגי
 השגיאות(ויש M) . זה מתבצע מלולאה חיצונית עבור כל map של כל קובץ מהקבצים שחילקנו אליהם.
  אז אם מדובר על זמן ריצה ספציפי עבור הקובץ הזה מכיוון שחילקתי ל10000 שורות לכל קובץ יצא סהכ 100 קבצים
 O(100*M)= O(M)ולכן זמן ריצה יהיה
 אך אם מדובר לא ספציפית על הקובץ הזה מס הקבצים=N/10000, אז זמן ריצה של הפונקציה יצא O((N/10000)*M)=O(N*M)
 הפונקציה TopNErrors תהיה O(M)
 זמן ריצה כולל: אם מדובר בקובץ זה ספציפית:O(N)
 אם מדובר בכללי:O(N*M)


       סבוכיות מקום:

בפונקציה splitFile נחלק את הקובץ הגדול לכמה קטנים וסהכ יתפוס O(N) מקום הכל ביחד
בפונקציה countErrorsInFile עבור קובץ ניצור map  לסכימת סוגי השגיאות ולכן סיבוכיות מקום= O(M)
הפונקציה mergeCounters ממזגת את כל סכומי השגיאות ל map אחד ויתפוס O(M) מקום
הפונקציה TopNErrors תיצור ערימה עם n השגיאות הכי נופצות ולכן יתפוס מקסימום O(M) מקום
בפונקציה processLogFile יצרתי רשימה counters שתאכסן את כל ה map של כל הקבצים המחולקים. כל map יתפוס O(M) מקום
אבל הרשימה תהיה בגודל מס הקבצים המחולקים כפול O(M) , ולכן גם כאן תלוי אם מדובר על קובץ זה ספציפית
אם כן: סיבוכיות מקום של counters=O(100*M)=O(M) -ואז סיבוכיות מקום כוללת:O(N)
אם לא: סיבוכיות מקום של counters=O((N/10000)*M)=O(M*N) -ואז סיבוכיות מקום כוללת:O(N*M)



 */




public class Logs {
    private static final int FILE_SIZE = 10000;



    public static List<File> splitFile(String filePath, String folderName) throws IOException {
        File dir = new File(folderName);
        if (!dir.exists())
            dir.mkdirs();
        List<File> divFiles=new ArrayList<>();
        try(BufferedReader read=new BufferedReader(new FileReader(filePath))) {
            int fileCount=0;
            String line="";
            while (true){
                File newFile=new File(folderName, "log_part_" +fileCount+".txt");
                try(BufferedWriter write=new BufferedWriter(new FileWriter(newFile))){
                    int lineCount=0;
                    while(lineCount<FILE_SIZE&&(line=read.readLine())!=null){
                        write.write(line);
                        write.newLine();
                        lineCount++;
                    }
                }
                divFiles.add(newFile);
                if(line==null)
                    break;

                fileCount++;
            }
        }
        return divFiles;
    }

    public static Map<String, Integer> countErrorsInFile(File file) throws IOException {
        Map<String, Integer> errorsCounter=new HashMap<>();
        try(BufferedReader read=new BufferedReader(new FileReader(file))) {
            String line;
            while((line= read.readLine())!=null){

                String[] parts = line.trim().split(" ");
                if (line.contains("Error:")) {
                    String errorType = line.split("Error:")[1].trim();

                    errorType = errorType.replaceAll("\"", "").trim();

                    errorsCounter.put(errorType,errorsCounter.getOrDefault(errorType,0)+1);
                }}
        }

        return errorsCounter;
    }


    public static Map<String, Integer> mergeCounters(List<Map<String, Integer>> counters) {
        Map <String,Integer> mergeAllCounters=new HashMap<>();
        for(Map<String ,Integer> counter: counters){
            for(Map.Entry<String,Integer> error:counter.entrySet())
                mergeAllCounters.put(error.getKey(),mergeAllCounters.getOrDefault(error.getKey(),0)+error.getValue());
        }
        return mergeAllCounters;
    }

    public static List<Map.Entry<String, Integer>> TopNErrors(Map<String, Integer> counter, int N) {
        PriorityQueue<Map.Entry<String, Integer>> queue=new PriorityQueue<>(  Comparator.comparingInt(Map.Entry::getValue));
        for(Map.Entry<String, Integer> error: counter.entrySet()){
            queue.offer(error);
            if(queue.size()>N)
                queue.poll();
        }
        List<Map.Entry<String, Integer>> res=new ArrayList<>(queue);
        res.sort((a, b) -> Integer.compare(b.getValue(), a.getValue()));
        return res;
    }


    public static List<Map.Entry<String, Integer>> processLogFile(String logFile, int N) throws IOException{
        List<File> divFiles=splitFile(logFile,"log_files");
        List<Map<String, Integer>> counters=new ArrayList<>();
        for(File file:divFiles){
            counters.add(countErrorsInFile(file));
        }
        Map<String, Integer> mergeCounters=mergeCounters(counters);
        List<Map.Entry<String, Integer>> res=TopNErrors(mergeCounters,N);
        return res;
    }

}
