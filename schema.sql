-- schema.sql

drop database if exists xwblog;

create database xwblog;

use xwblog;

grant all privileges on xwblog.* to 'xwlyy'@'%' identified by '123456';

CREATE TABLE `xw_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '-1 已删除 0-正常',
  `mongoId` varchar(40) NOT NULL DEFAULT '' COMMENT '文章mongoId',
  `userId` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `userMongoId` varchar(40) NOT NULL DEFAULT '' COMMENT '用户mongoId',
  `title` varchar(100) NOT NULL COMMENT '新闻标题',
  `digest` varchar(100) NOT NULL DEFAULT '',
  `content` text NOT NULL COMMENT '内容',
  `createTime` datetime NOT NULL DEFAULT '1970-01-01 08:00:00' COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT '1970-01-01 08:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章表';

CREATE TABLE `xw_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '-1 已删除 0-正常',
  `mongoId` varchar(40) NOT NULL DEFAULT '' COMMENT '用户mongoId',
  `account` varchar(100) NOT NULL DEFAULT '' COMMENT '用户账号',
  `nickname` varchar(20) NOT NULL DEFAULT '' COMMENT '用户昵称',
  `headimgurl` varchar(200) NOT NULL DEFAULT '' COMMENT '用户头像',
  `password` varchar(100) NOT NULL DEFAULT '',
  `createTime` datetime NOT NULL DEFAULT '1970-01-01 08:00:00' COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT '1970-01-01 08:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

CREATE TABLE `xw_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '-1 已删除 0-正常',
  `mongoId` varchar(40) NOT NULL DEFAULT '' COMMENT '评论mongoId',
  `userId` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `userMongoId` varchar(40) NOT NULL DEFAULT '' COMMENT '用户mongoId',
  `articleId` int(11) NOT NULL DEFAULT '0' COMMENT '文章ID',
  `articleMongoId` varchar(40) NOT NULL DEFAULT '' COMMENT '文章mongoId',
  `content` text NOT NULL COMMENT '内容',
  `createTime` datetime NOT NULL DEFAULT '1970-01-01 08:00:00' COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT '1970-01-01 08:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `articleId` (`articleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论表';
