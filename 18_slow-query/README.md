
## 1
select sum(salary), count(salary) from salaries group by emp_no order by sum(salary) DESC

300024 rows in set (0.82 sec)



## 2
select * from employees order by  hire_date limit 100;

100 rows in set (0.08 sec)



## 5
select * from employees where first_name= 'Ebru' order by  hire_date limit 5;

5 rows in set (0.07 sec)

##

select count(*) from employees group by gender

2 rows in set (0.09 sec)


## 

select avg(salary), gender from salaries left join employees on salaries.emp_no=employees.emp_no group by employees.gender;

2 rows in set (3.54 sec)


## 
 select avg(salary), DATE_FORMAT(from_date, '%Y') as year from salaries group by year;

18 rows in set (1.27 sec)


# 課題２

## 最も頻度が高いクエリ
使用コマンド　mysqldumpslow -s c　-t 1 3a2811b46519-slow.log 
 select * from salaries where salary=N


## 実行時間が長いクエリ
使用コマンド mysqldumpslow -s t -t 1 3a2811b46519-slow.log 

select avg(salary), gender from salaries left join employees on salaries.emp_no=employees.emp_no group by employees.gender

## ロック時間が長いクエリ
mysqldumpslow --debug -s l -t 1 3a2811b46519-slow.log 

# 課題3

create index salary_index on salaries(salary);

# 課題4
- limit 1としている場合も、全部の行を並べ替えてそのうちの最初のものを返しているため。
。order by句　やWHRE 句で使用するカラムにインデックスを貼ることで解消できる。（場合によっては複合インデックスを貼る必要あり。
参考 http://nippondanji.blogspot.com/2008/12/2008.html

- JOIN ON - 結果を絞るのではなく、結合前のテーブルのレコードを絞る。そのためLEFT OUTER JOINのときは、ONとWHREで出力結果が変わる


