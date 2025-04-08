CREATE DATABASE FamilyTree;



--����� ���� �����
CREATE TABLE Person (
    Person_Id INT PRIMARY KEY,
    Personal_Name VARCHAR(50),
    Family_Name VARCHAR(50),
    Gender VARCHAR(10),
    Father_Id INT,
    Mother_Id INT,
    Spouse_Id INT,
    FOREIGN KEY (Father_Id) REFERENCES Person(Person_Id),
    FOREIGN KEY (Mother_Id) REFERENCES Person(Person_Id),
    FOREIGN KEY (Spouse_Id) REFERENCES Person(Person_Id)
);

-- ����� ������ 
INSERT INTO Person(Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES 
(1, '���', '���', '���', NULL, NULL, 2),
(2, '���', '���', '����', NULL, NULL, 1),
(3, '����', '���', '���', 1, 2, NULL),
(4, '���', '���', '����', 1, 2, NULL),
(5, '�����', '���', '����', NULL, NULL, 3),
(6, '����', '���', '���', 3, 5, NULL);

--����� ���� �����
CREATE TABLE Family_Relation (
 Person_Id INT,
 Relative_Id INT,
 Connection_Type VARCHAR(10),
 PRIMARY KEY (Person_Id, Relative_Id),
    FOREIGN KEY (Person_Id) REFERENCES Person(Person_Id),
    FOREIGN KEY (Relative_Id) REFERENCES Person(Person_Id)
)

-- ����� ����� ����� ���� �� ��
INSERT INTO Family_Relation (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Father_Id, '��'
FROM Person
WHERE Father_Id IS NOT NULL;

-- ����� ����� ����� ���� �� ��
INSERT INTO Family_Relation (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Mother_Id, '��'
FROM Person
WHERE Mother_Id IS NOT NULL;

-- ����� ����� ����� ���� �� ��� ���
INSERT INTO Family_Relation (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Spouse_Id,
       CASE WHEN Gender = '���' THEN '�� ���' ELSE '�� ���' END
FROM Person
WHERE Spouse_Id IS NOT NULL;


-- ����� ����� ����� ���� �� ����
INSERT INTO Family_Relation (Person_Id, Relative_Id, Connection_Type)
SELECT parent.Person_Id, child.Person_Id, 
       CASE 
           WHEN child.Gender = '���' THEN '��' 
           ELSE '��' 
       END
FROM Person AS child
JOIN Person AS parent ON child.Father_Id = parent.Person_Id OR child.Mother_Id = parent.Person_Id
WHERE parent.Person_Id IS NOT NULL;

-- ����� ����� ����� ���� �� ����
INSERT INTO Family_Relation (Person_Id, Relative_Id, Connection_Type)
select s1.Person_Id,s2.Person_Id,
CASE 
           WHEN s2.Gender = '���' THEN '��' 
           ELSE '���� ' 
       END
FROM Person as s1 join Person as s2
 ON (s1.Person_Id != s2.Person_Id)
    AND (
        (s1.Father_Id IS NOT NULL AND s1.Father_Id = s2.Father_Id)
        OR
        (s1.Mother_Id IS NOT NULL AND s1.Mother_Id = s2.Mother_Id)
    )



UPDATE p
SET p.Spouse_Id = r.Person_Id
FROM Person p
JOIN Family_Relation r  ON p.Person_Id = r.Relative_Id
WHERE p.Spouse_Id IS NULL
 AND r.Connection_Type IN ('�� ���', '�� ���')

