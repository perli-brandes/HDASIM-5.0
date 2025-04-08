package org.example;

import jdk.jfr.Configuration;
import org.apache.avro.generic.GenericRecord;
import org.apache.parquet.avro.AvroParquetReader;
import org.apache.parquet.hadoop.ParquetReader;


import org.apache.avro.generic.GenericRecord;

import org.apache.hadoop.fs.Path;
import org.apache.parquet.avro.AvroParquetReader;
import org.apache.parquet.hadoop.ParquetReader;
import org.apache.parquet.example.data.Group;
import org.apache.parquet.hadoop.example.GroupReadSupport;

import java.util.ArrayList;
import java.util.List;


/*
פתרון לחלק א' סעיף ב'                                           
4:
הייתרונות לאחסן את הקובץ בפורמט Parquet :
1. גישה מהירה יותר מcsv לנתונים כי לא צריך לקרוא את כל העמודות והשורות אלא אפשר לקרוא רק את העמודות שצריך
2. חסכון באחסון כי הוא דוחס את הנתונים לפי עמודות ולא כותב כל ערך בשורה נפרדת
3. שומר סוגי משתנים כמו למשל תאריכים ולא שומר הכל כטקסט כמו csv


 */


public class ReadParquet {

    public static List<List<String>> readParquet(String filePath) {
        List<List<String>> data = new ArrayList<>();
        try (ParquetReader<Group> read = ParquetReader.builder(new GroupReadSupport(), new Path(filePath)).build()) {
            Group line;
            while ((line = read.read()) != null) {
                List<String> row = new ArrayList<>();
                row.add(line.getString("timestamp", 0));
                row.add(String.valueOf(line.getDouble("value", 0)));
                data.add(row);}

        } catch (Exception e) {
            System.err.println("Error reading Parquet file: " + e.getMessage());
        }
        return data;  }


}
