# 課題19

## 1

### 結果：empty
NULL = 0  
NULL = NULL
NULL <> NULL
NULL AND TRUE
NULL AND FALSE
### 結果:すべてのデータを取得
NULL OR TRUE


## 2 テーブル設計
### 設計

TABLE assignee {
  id: varchar NOT NULL
}

TABLE Issue {
  id: varchar NOT NULL
  text: varchar NOT NULL
}

TABLE issue_assignee_rel {
  id: varchar NOT NULL
  issue_id: varchar NOT NULL
  assignee_id: varchar NOT NULL
}

### DDL
#### 中間テーブル作成
```sql
CREATE TABLE issue_assignee as SELECT issue.id AS issue_id , assignee.id AS assignee_id FROM issue JOIN assignee ON issue.assigned_to_id = assignee_id;

ALTER TABLE issue DROP COLUMN assigned_to_id;
```


#### (念の為)外部キー制約追加
```sql
ALTER TABLE issue MODIFY COLUMN id varchar(100) NOT NULL PRIMARY KEY;

ALTER TABLE assignee MODIFY COLUMN id varchar(100) NOT NULL PRIMARY KEY;

ALTER TABLE issue_assignee ADD FOREIGN KEY (issue_id) REFERENCES issue (id);

ALTER TABLE issue_assignee ADD FOREIGN KEY (assignee_id) REFERENCES assignee (id);
```

## 3 クイズ
1. SQLで以下の演算の結果は何になるでしょうか？
- 100 + NULL
- NULL / 0
- CONCAT('ABC', NULL)

2. WHRE句に"IS NULL"や"IS NOT NULL"を指定する場合、パフォーマンスが良くないのはなぜでしょうか。