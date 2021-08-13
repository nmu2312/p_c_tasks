# 15 SQL10本ノック

## 課題1
1. 96年に3回以上注文しCustomerのidと、注文回数<br>
SELECT CustomerID, COUNT(CustomerID) as OrderCount<br>
  FROM Orders WHERE strftime('%Y',Orders.OrderDate)='1996'<br>
  GROUP BY CustomerID HAVING OrderCount>=3<br>
  ORDER BY OrderCount DESC;


2. 過去、最も多くのOrderDetailが紐づいたOrder<br>
SELECT OrderID, COUNT(OrderID) as OrderDetailCount FROM OrderDetails GROUP BY OrderID ORDER BY OrderDetailCount DESC LIMIT 1;

3. Order数が多い順番にShipperIDを並べる<br>
SELECT ShipperID, COUNT(ShipperID) as ShippingCount FROM Orders GROUP BY ShipperID ORDER BY ShippingCount DESC;

4. 売上が高い順番にCountryを並べる<br>
SELECT ROUND(SUM(Price*Quantity)) as Sales, Customers.Country  
  FROM OrderDetails  
  LEFT JOIN Orders ON Orders.OrderID=OrderDetails.OrderID  
  LEFT JOIN Customers ON Orders.CustomerID=Customers.CustomerID  
  LEFT JOIN Products ON OrderDetails.ProductID=Products.ProductID  
  GROUP BY Customers.Country ORDER BY Sales DESC;  

5. 国ごとの売上を年ごとに集計する<br>
SELECT ROUND(SUM(Price*Quantity)) as Sales, strftime('%Y',Orders.OrderDate) as OrderYear, Customers.Country<br>
  FROM OrderDetails<br>
  LEFT JOIN Orders ON Orders.OrderID=OrderDetails.OrderID<br>
  LEFT JOIN Customers ON Orders.CustomerID=Customers.CustomerID<br>
  LEFT JOIN Products ON OrderDetails.ProductID=Products.ProductID<br>
  GROUP BY Country, OrderYear<br>
  ORDER BY Country, OrderYear;

6. Employeeテーブルに「Junior（若手）」カラム（boolean）を追加
  - ALTER TABLE Employees ADD Junior TINYINT NOT NULL DEFAULT 0;  
  - UPDATE Employees SET JUNIOR=1 WHERE BirthDate > '1960-12-31 23:59:59';


7. Shipperにlong_relationカラム（boolean）を追加
  - ALTER TABLE Shippers ADD long_relation TINYINT NOT NULL DEFAULT 0;
  - UPDATE Shippers SET long_relation=1 WHERE ShipperID IN (SELECT ShipperID FROM Orders GROUP BY ShipperID HAVING COUNT(ShipperID)>=70);<br>
  ※WebSQLではUPDATE文でJOINが使えなかった

8. それぞれのEmployeeが最後に担当したOrderと、その日付<br>
SELECT EmployeeID, OrderID, MAX(OrderDate) as LastOrderDate FROM Orders GROUP BY EmployeeID;

9. NULLの扱いに慣れる
  - UPDATE Customers SET CustomerName=NULL WHERE CustomerID=1;
  - SELECT * FROM Customers WHERE CustomerName IS NOT NULL;
  - SELECT * FROM Customers WHERE CustomerName IS NULL;
  - SQLではNULLは等号では判定できない。

10. JOINの扱いに慣れる
  - DELETE FROM Employees WHERE EmployeeID=1;
  - SELECT Orders.* FROM Orders INNER JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID;
  - SELECT Orders.*, Employees.EmployeeID FROM Orders LEFT JOIN Employees ON Orders.EmployeeID=Employees.EmployeeID ORDER BY EmployeeIDers.EmployeeID = Employees.EmployeeID ORDER BY Employees;


## 課題2

- WHERE：グループ化する前に適用されるデータの抽出条件を指定
- HAVING：グループ化された後に適用されるデータの抽出条件を指定

- DDL(Data Definition Language)
データを定義する際に使用する命令
  - CREATE
  - ALTER
  - DROP
  - TRUNCATE

- DML(Data Manipulation Language)
データを操作する際に使用する命令
  - SELECT
  - INSERT
  - UPDATE
  - DELETE
  - EXPLAIN
  - LOCK TABLE

- DCL(Data Control Language)
データを制御する命令
GRANT
REVOKE

- TCL(Transaction Control Language)
  トランザクションを制御する命令。
  - COMMIT
  - ROLLBACK
  - SET TRANSACTION
  - SAVEPOINT
