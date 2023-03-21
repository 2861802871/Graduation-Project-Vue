-- MySQL dump 10.13  Distrib 5.5.53, for Win32 (AMD64)
--
-- Host: localhost    Database: studentsystem
-- ------------------------------------------------------
-- Server version	5.5.53

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `holiday`
--

DROP TABLE IF EXISTS `holiday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `holiday` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8 DEFAULT NULL COMMENT '申请人',
  `userId` int(10) NOT NULL COMMENT '申请人id',
  `applyTime` varchar(45) CHARACTER SET utf8 DEFAULT NULL COMMENT '申请提交时间',
  `date1` varchar(45) CHARACTER SET utf8 DEFAULT NULL COMMENT '假期开始时间',
  `date2` varchar(45) CHARACTER SET utf8 DEFAULT NULL COMMENT '假期结束时间',
  `verifyStatus` varchar(45) CHARACTER SET utf8 DEFAULT NULL COMMENT '审核状态',
  `resultStatus` varchar(45) CHARACTER SET utf8 DEFAULT NULL COMMENT '审核结果',
  `removeStatus` varchar(45) CHARACTER SET utf8 DEFAULT NULL COMMENT '销假状态',
  `auditor` varchar(45) CHARACTER SET utf8 DEFAULT NULL COMMENT '审核员',
  `auditorId` varchar(45) CHARACTER SET utf8 DEFAULT NULL COMMENT '审核员id',
  `opinion` text CHARACTER SET utf8 COMMENT '审核意见',
  `myContent` text CHARACTER SET utf8 COMMENT '请假内容',
  `whichClas` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holiday`
--

LOCK TABLES `holiday` WRITE;
/*!40000 ALTER TABLE `holiday` DISABLE KEYS */;
INSERT INTO `holiday` VALUES (1,'管理员1',1000000000,'2022-04-16T14:52:48.695Z','2022-04-14T16:00:00.000Z','2022-04-15T16:00:00.000Z','已审核','已通过','已销假','老师2','1000000003','测试','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG182'),(2,'管理员1',1000000000,'2022-04-17T07:30:49.815Z','2022-04-16T16:00:00.000Z','2022-04-17T16:00:00.000Z','已审核','已通过','已销假','老师2','1000000003','同意，按时返校销假！','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG182'),(3,'管理员1',1000000000,'2022-04-17T07:31:21.130Z','2022-04-17T16:00:00.000Z','2022-04-19T16:00:00.000Z','已审核','未通过','已销假','老师2','1000000003','不同意','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG182'),(4,'管理员1',1000000000,'2022-04-17T07:35:28.493Z','2022-04-20T16:00:00.000Z','2022-04-28T16:00:00.000Z','已审核','已通过','已销假','管理员1','1000000000','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG182'),(5,'管理员1',1000000000,'2022-04-17T07:38:47.830Z','2022-04-17T16:00:00.000Z','2022-04-18T16:00:00.000Z','待审核','未通过','待销假','','','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG182'),(6,'管理员1',1000000000,'2022-04-17T07:43:17.087Z','2022-04-17T16:00:00.000Z','2022-04-17T16:00:00.000Z','待审核','未通过','待销假','','','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG182'),(7,'管理员1',1000000000,'2022-04-17T07:43:55.213Z','','','已审核','已通过','已销假','管理员1','1000000000','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG182'),(8,'管理员1',1000000000,'2022-04-17T07:55:42.151Z','2022-04-20T16:00:00.000Z','2022-04-18T16:00:00.000Z','已审核','已通过','已销假','管理员1','1000000000','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG181'),(9,'管理员1',1000000000,'2022-04-17T07:55:57.940Z','2022-04-19T16:00:00.000Z','2022-04-19T16:00:00.000Z','待审核','未通过','待销假','','','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG181'),(10,'管理员1',1000000000,'2022-04-17T08:04:14.516Z','2022-04-18T16:00:00.000Z','2022-04-18T16:00:00.000Z','待审核','未通过','待销假','','','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG181'),(11,'管理员1',1000000000,'2022-04-17T08:10:43.904Z','2022-04-15T16:00:00.000Z','2022-04-17T16:00:00.000Z','待审核','未通过','待销假','','','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG181'),(12,'管理员1',1000000000,'2022-04-17T08:15:11.497Z','2022-04-16T16:00:00.000Z','2022-04-18T16:00:00.000Z','已审核','已通过','已销假','管理员1','1000000000','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG181'),(13,'管理员1',1000000000,'2022-04-17T08:29:08.674Z','2022-04-14T16:00:00.000Z','2022-04-18T16:00:00.000Z','待审核','未通过','待销假','','','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG181'),(14,'管理员1',1000000000,'2022-04-17T08:29:08.674Z','2022-04-14T16:00:00.000Z','2022-04-18T16:00:00.000Z','待审核','未通过','待销假','','','','undefined由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。','自BG181'),(15,'测试1',1000000002,'2022-04-20T03:04:59.316Z','2022-04-21T16:00:00.000Z','2022-04-20T16:00:00.000Z','已审核','已通过','已销假','管理员1','1000000000','','测试','自BG182'),(16,'测试1',1000000002,'2022-04-20T03:04:59.316Z','2022-04-21T16:00:00.000Z','2022-04-20T16:00:00.000Z','已审核','已通过','已销假','管理员1','1000000000','','测试','自BG182');
/*!40000 ALTER TABLE `holiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `score` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(10) NOT NULL COMMENT '学号',
  `time` varchar(45) NOT NULL COMMENT '操作时间',
  `type` varchar(200) NOT NULL COMMENT '处理类型',
  `score` varchar(45) NOT NULL COMMENT '处理分数',
  `reason` varchar(45) NOT NULL COMMENT '处理备注',
  `teacher` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idscore_UNIQUE` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='学分';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES (1,1000000002,'2022-04-15T05:19:29.954Z','加分','1','1','超级管理员'),(2,1000000002,'2022-04-15T05:40:24.934Z','加分','1','231','超级管理员'),(3,1000000002,'2022-04-15T08:35:54.383Z','加分','1','222','超级管理员'),(4,1000000002,'2022-04-15T08:35:54.383Z','加分','1','222','超级管理员'),(5,1000000002,'2022-04-15T08:35:54.383Z','加分','1','222','超级管理员'),(6,1000000002,'2022-04-15T08:49:57.574Z','扣分','3','测试','超级管理员'),(7,1000000004,'2022-04-15T09:02:31.290Z','扣分','5','逃课','超级管理员'),(8,1000000009,'2022-04-15T09:42:21.420Z','扣分','1','测试','超级管理员'),(9,1000000009,'2022-04-15T09:45:43.493Z','扣分','2','测试','超级管理员'),(10,1000000002,'2022-04-15T09:48:40.047Z','加分','1','32','超级管理员'),(11,1000000002,'2022-04-15T13:09:23.403Z','扣分','7','测试','超级管理员'),(12,1000000009,'2022-04-15T13:10:35.518Z','加分','1','测试','超级管理员'),(13,1000000009,'2022-04-16T12:02:57.027Z','加分','1','12','管理员1'),(14,1000000009,'2022-04-16T12:05:29.525Z','加分','1','测试','管理员1'),(15,1000000002,'2022-04-16T12:05:29.525Z','加分','1','测试','管理员1'),(16,1000000002,'2022-04-16T12:05:29.525Z','加分','1','测试','管理员1'),(17,1000000002,'2022-04-16T12:05:29.525Z','加分','1','测试','管理员1'),(18,1000000002,'2022-04-16T12:05:29.525Z','加分','1','测试','管理员1'),(19,1000000002,'2022-04-20T05:13:45.532Z','加分','1','测试','老师2');
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone` char(200) DEFAULT NULL,
  `identity` varchar(45) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(2) NOT NULL DEFAULT '1',
  `yuanxi` varchar(255) DEFAULT NULL,
  `discipline` varchar(255) DEFAULT NULL,
  `whichClas` varchar(255) DEFAULT NULL,
  `score` int(11) NOT NULL DEFAULT '100',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idStudentUsers_UNIQUE` (`id`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='用户信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'管理员1','13118503456','管理员','男',1000000000,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'123','null','null',100),(2,'管理员2','13118503456','管理员','女',1000000001,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'null','null','null',100),(3,'测试1','13118503456','学生','女',1000000002,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'电信学院','自动化','自BG182',101),(4,'老师2','13118503456','老师','男',1000000003,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'电信','自动化','null',100),(5,'老师1','13118503456','老师','男',100000007,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'电信','自动化','null',100),(6,'测试2','13118503456','学生','女',1000000004,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'电信学院','自动化','自BG182',95),(7,'管理员3','13118503456','管理员','女',1000000005,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'','','',100),(8,'管理员4','13118503456','管理员','男',1000000006,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'','','',100),(9,'管理员5','13118503456','管理员','男',1000000007,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'','','',100),(10,'管理员6','13118503456','管理员','男',1000000008,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'','','',100),(11,'undefined','undefined','','undefined',0,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'undefined','undefined','undefined',100),(12,'测试3','13118503765','学生','男',1000000009,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'电信学院','自动化','自BG181',100),(13,'管理员7','13118503854','管理员','男',1000000010,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'','','',100),(14,'老师3','13115675465','老师','男',1000000011,'ecdc67f9900e3d2c64b3f0d4b0aa068e',1,'电信','自动化','',100);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-20 14:06:11
