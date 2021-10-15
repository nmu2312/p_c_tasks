# インデックス
## 課題１
### インデックスの仕組み
インデックスとは見出しという意味。<br>
SQL文を実行するときに、WHERE条件などを指定してレコードを取得することがよくあるが、通常だとこの場合、テーブル上のすべてのレコードを検査することになる。<br>
レコードが少ないうちはこれでも問題ないが、レコード数が膨大になるにつれて毎回テーブルを全件検索するのはパフォーマンス上の問題が出てくる。<br>
そこで、検索条件によくつかうカラムにインデックスを貼ることで、データの取得を高速化できる。<br>
インデックスでは要素が決まった順番でソートされているので、順に並んだデータからはすばやく簡単に目的のデータを取得できる

### Slow Query Log
スロークエリーログとは、実行速度が遅いクエリが記録されるログ。<br>
インデックスを貼るとデータの取得が高速化する一方で、データの記録や更新のパフォーマンスが落ちるので、インデックスはスロークエリを調べてパフォーマンスの影響が大きいカラムに絞って貼ったほうが良い。<br>
https://nzigen.com/ysawa/mysql-slow-query/

### カーディナリティ
テーブルの同一のカラムに含まれる異なる値の数（バリエーション）のことを指す。カーディナリティが高いカラムのほうがインデックスを貼ったときのパフォーマンスの恩恵が大きい。

### カバリングインデックス
クエリが必要とするカラムがすべてインデックスに含まれている場合のこと。テーブルにアクセスする必要がなく、インデックスだけでデータの取得が完結するため非常に速い。  


## 課題２

### クエリ
SELECT * FROM employees WHERE hire_date='1992-07-06';  

SELECT * FROM employees WHERE first_name='Moti';

SELECT * FROM salaries WHERE salary='66167';


### 実行計画
+----+-------------+-----------+------------+------+------------------+------------------+---------+-------+------+----------+-------+  
| id | select_type | table     | partitions | type | possible_keys    | key              | key_len | ref   | rows | filtered | Extra |  
+----+-------------+-----------+------------+------+------------------+------------------+---------+-------+------+----------+-------+  
|  1 | SIMPLE      | employees | NULL       | ref  | first_name_index | first_name_index | 16      | const |  216 |   100.00 | NULL  |  
+----+-------------+-----------+------------+------+------------------+------------------+---------+-------+------+----------+-------+  



###　SELECT文
上：インデックスなし
下：インデックスあり
+----------+----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+  
| EVENT_ID | Duration | SQL_TEXT                                                                                                                                                               |  
+----------+----------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+  
|       28 | 0.098276 | SELECT * FROM employees.employees WHERE hire_date='1992-07-06'                                                                                                         |  
|       39 | 0.000668 | SELECT * FROM employees.employees WHERE hire_date='1992-07-06'                                                                                                         |  


85 | 0.479659 | SELECT * FROM employees.salaries WHERE salary='60000'    
46 | 0.017381 | SELECT * FROM employees.salaries FORCE INDEX (salary_index) WHERE salary='60000'            


72 | 0.001325 | SELECT * FROM employees WHERE first_name = 'Moti'    
48 | 0.083070 | SELECT * FROM employees WHERE first_name='Moti'     




## 課題３（実装）

### INSERT文

インデックスあり  
| 0.051741 | INSERT INTO employees (emp_no,birth_date,first_name,last_name,hire_date)VALUES('000001','2020-12-12','Taro','Yamada','2021-12-12')        
インデクスなし  
| 0.007881 | INSERT INTO employees (emp_no,birth_date,first_name,last_name,hire_date)VALUES('999998','2020-12-12','Jiro','Tanaka','2021-12-12')  

### INDEXがあるとINSERT文の実行が遅くなるか?


### DELETE文だとどうなるか？
DELETE文にWHERE句含まれていることが多い。この場合は、インデックスがあれば削除する行を速く見つけることができる。
その一方で、データの削除の際はインデックスも更新する必要があるため、削除の処理自体は遅くなる。

## 課題３（クイズ）

1. 誕生月ごとの人数を出す
2. 年ごとの給料の平均を出す
3. 年ごとの給料の最高額を出す