# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル(devise使用)

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: false|
|email|string|null: false, index: false, unique: true|
|pass|string|null: false, index: false, unique: false|

### Association
- has_many :groups ,through: :group_users
- has_many :group_users

  has_many :comments

## group_usersテーブル(中間テーブル)

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, index: true, unique: false, foreign_key: true|
|user_id|integer|null: false, index: false, unique: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: false, unique: true|

### Association

- has_many :users,through: :group_users
- has_many :group_users

- has_many :comments

## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, index: true, unique: false, foreign_key: true|
|group_id|integer|null: false, index: true, unique: false, foreign_key: true|
|comment|text|null: true, index: false, unique: false, foreign_key: false|
|image|text|null: true, index: false, unique: false, foreign_key: false|

### Association
- belongs_to :user
- belongs_to :group
