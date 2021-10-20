# 複合インデックス

## 課題１（質問）

CREATE INDEX employees_name ON employees (last_name, frist_name);
とする。テーブルにマルチカラムインデックスがある場合、オプティマイザは、インデックスの左端のプリフィクスを使用して行をルックアップできる。


## 課題２（実装）


### query1
42 | 0.066748 | select * from employees where last_name='Facello' and first_name='Georgi'   
132 | 0.000426 | select * from employees where last_name='Facello' and first_name='Georgi'  

mysql> explain select * from employees where last_name='Facello' and first_name='Georgi'
    -> ;  
+----+-------------+-----------+------------+------+---------------+------------+---------+-------------+------+----------+-------+  
| id | select_type | table     | partitions | type | possible_keys | key        | key_len | ref         | rows | filtered | Extra |  
+----+-------------+-----------+------------+------+---------------+------------+---------+-------------+------+----------+-------+  
|  1 | SIMPLE      | employees | NULL       | ref  | name_index    | name_index | 34      | const,const |    2 |   100.00 | NULL  |  
+----+-------------+-----------+------------+------+---------------+------------+---------+-------------+------+----------+-------+  


### query2
|      598 | 0.000897 | select * from employees where last_name='Simmel' and gender='M'   
|      841 | 0.069018 | select * from employees where last_name='Simmel' and gender='M'        

### query3
1287 | 0.063525 | select * from employees where last_name='Simmel' and hire_date>='1996-01-01' and hire_date<'1997-01-01'  
1468 | 0.000500 | select * from employees where last_name='Simmel' and hire_date>='1996-01-01' and hire_date<'1997-01-01'   

## 課題３（クイズ）

- 1996年に雇われた人の中で1960年生まれの人の人数を出す
- 1996年１２月に雇われた人で名字がBではじまる人
- 1990年１月に支払った給料の合計額
