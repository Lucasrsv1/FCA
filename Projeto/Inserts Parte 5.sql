/* EVENTO_TIPO */
INSERT INTO `evento_tipo` (`id`, `nome`) VALUES (1,'Quebra'),(2,'Ajuste Troca de Ferramenta'),(3,'Microparada'),(4,'Refugo ou Retrabalho'),(5,'Falta de Material Direto'),(6,'Atividade Planejada'),(7,'Ausencia - Carga Impossivel'),(8,'Bloqueio - Descarga Impossivel'),(9,'Intervalo de Refeicao'),(10,'Iniciar Producao'),(11,'Saida de Operador'),(12,'Intervalo Lanche'),(13,'Sem Programa de Producao'),(14,'Fim de Turno'),(15,'Reuniao'),(16,'Enviar Dados');
/* FIM EVENTO_TIPO */

/* CONTROLE */
INSERT INTO `controle` (`id`, `equipamentos_radio`, `evento_tipo_id`, `operador`, `inicio`, `fim`) VALUES (36529,'0013A20040A96579',5,'29DC4D4C','2016-12-18 04:23:56','2016-12-18 04:24:26'),(36530,'0013A20040A96579',4,'29DC4D4C','2016-12-18 04:24:26','2016-12-18 04:25:02'),(36531,'0013A20040A96579',1,'29CD4D4C','2016-12-18 04:25:02','2016-12-18 04:26:29'),(36532,'0013A20040A96579',1,'29DC4D4C','2016-12-18 04:26:29','2016-12-18 04:27:28'),(36533,'0013A20040A96579',11,'29DC4D4C','2016-12-18 04:27:28','2016-12-18 04:27:48'),(36534,'0013A20040A96579',12,'29DC4D4C','2016-12-18 04:27:48','2016-12-18 04:28:02'),(36535,'0013A20040A96579',1,'29DC4D4C','2016-12-18 04:28:02','2016-12-18 04:28:07'),(36536,'0013A20040A96579',2,'29DC4D4C','2016-12-18 04:28:08','2016-12-18 04:28:14'),(36537,'0013A20040A96579',3,'29DC4D4C','2016-12-18 04:28:14','2016-12-18 04:28:25'),(36538,'0013A20040A96579',4,'29DC4D4C','2016-12-18 04:28:25','2016-12-18 04:28:34'),(36539,'0013A20040A96579',5,'29DC4D4C','2016-12-18 04:28:34','2016-12-18 04:28:45'),(36540,'0013A20040A96579',6,'29DC4D4C','2016-12-18 04:28:45','2016-12-18 04:28:55'),(36541,'0013A20040A96579',7,'29DC4D4C','2016-12-18 04:28:56','2016-12-18 04:29:07'),(36542,'0013A20040A96579',8,'29DC4D4C','2016-12-18 04:29:07','2016-12-18 04:29:18'),(36543,'0013A20040A96579',9,'29DC4D4C','2016-12-18 04:29:18','2016-12-18 04:29:27'),(36544,'0013A20040A96579',10,'29DC4D4C','2016-12-18 04:29:27','2016-12-18 04:29:38'),(36545,'0013A20040A96579',12,'29DC4D4C','2016-12-18 04:29:38','2016-12-18 04:29:52'),(36546,'0013A20040A96579',11,'29DC4D4C','2016-12-18 04:29:53','2016-12-18 04:31:47'),(36547,'0013A20040A96579',8,'29DC4D4C','2016-12-18 04:31:47','2016-12-19 22:16:27'),(36548,'0013A20040A96579',8,'29DC4D4C','2016-12-19 22:16:29','2016-12-19 22:16:33'),(36549,'0013A20040A96579',4,'29DC4D4C','2016-12-19 22:16:33','2016-12-19 22:16:42'),(36550,'0013A20040A96579',3,'29DC4D4C','2016-12-19 22:16:42','2016-12-19 22:17:26'),(36551,'0013A20040A96579',8,'29DC4D4C','2016-12-19 22:17:27','2017-01-03 22:38:06'),(36552,'0013A20040A96579',8,'29DC4D4C','2017-01-03 22:38:07','2017-01-03 23:12:27'),(36553,'0013A20040A96579',7,'29DC4D4C','2017-01-03 23:12:27','2017-01-03 23:12:47'),(36554,'0013A20040A96579',9,'29DC4D4C','2017-01-03 23:12:47','2017-01-03 23:13:07'),(36555,'0013A20040A96579',1,'29DC4D4C','2017-01-03 23:13:07','2017-01-03 23:13:27'),(36556,'0013A20040A96579',4,'29DC4D4C','2017-01-03 23:13:27','2017-01-03 23:13:27'),(36557,'0013A20040A96579',7,'29DC4D4C','2017-01-03 23:13:27','2017-01-03 23:13:27'),(36558,'0013A20040A96579',10,'29DC4D4C','2017-01-03 23:13:27','2017-01-03 23:13:47'),(36559,'0013A20040A96579',3,'29DC4D4C','2017-01-03 23:13:47','2017-01-03 23:14:07'),(36560,'0013A20040A96579',6,'29DC4D4C','2017-01-03 23:14:07','2017-01-03 23:14:07'),(36561,'0013A20040A96579',9,'29DC4D4C','2017-01-03 23:14:07','2017-01-03 23:14:07'),(36562,'0013A20040A96579',11,'29DC4D4C','2017-01-03 23:14:07','2017-01-03 23:14:28'),(36563,'0013A20040A96579',10,'29DC4D4C','2017-01-03 23:14:28','2017-01-03 23:14:48'),(36564,'0013A20040A96579',11,'29DC4D4C','2017-01-03 23:14:48','2017-01-03 23:45:41'),(36565,'0013A20040A96579',8,'29DC4D4C','2017-01-03 23:45:41','2017-01-04 00:40:24'),(36566,'0013A20040A96579',10,'29DC4D4C','2017-01-04 00:40:24','2017-01-04 00:42:25'),(36567,'0013A20040A96579',8,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36568,'0013A20040A96579',7,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36569,'0013A20040A96579',8,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36570,'0013A20040A96579',8,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36571,'0013A20040A96579',7,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36572,'0013A20040A96579',9,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36573,'0013A20040A96579',12,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36574,'0013A20040A96579',6,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36575,'0013A20040A96579',7,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36576,'0013A20040A96579',4,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36577,'0013A20040A96579',6,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36578,'0013A20040A96579',12,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36579,'0013A20040A96579',8,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36580,'0013A20040A96579',10,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 00:42:25'),(36581,'0013A20040A96579',8,'29DC4D4C','2017-01-04 00:42:25','2017-01-04 02:00:58'),(36582,'0013A20040A96579',10,'29DC4D4C','2017-01-04 02:00:58','2017-01-04 02:31:28'),(36583,'0013A20040A96579',8,'29DC4D4C','2017-01-04 02:31:28','2017-01-04 02:55:18'),(36584,'0013A20040A96579',8,'29DC4D4C','2017-01-04 02:55:18','2017-01-04 03:09:04'),(36585,'0013A20040A96579',5,'29DC4D4C','2017-01-04 03:09:04','2017-01-04 03:11:05'),(36586,'0013A20040A96579',4,'29DC4D4C','2017-01-04 03:11:05','2017-01-04 03:11:25'),(36587,'0013A20040A96579',12,'29DC4D4C','2017-01-04 03:11:25','2017-01-04 03:17:47'),(36588,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:17:47','2017-01-04 03:20:49'),(36589,'0013A20040A96579',10,'29DC4D4C','2017-01-04 03:20:49','2017-01-04 03:20:49'),(36590,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:20:49','2017-01-04 03:23:10'),(36591,'0013A20040A96579',6,'29DC4D4C','2017-01-04 03:23:10','2017-01-04 03:23:10'),(36592,'0013A20040A96579',9,'29DC4D4C','2017-01-04 03:23:10','2017-01-04 03:26:51'),(36593,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:26:51','2017-01-04 03:26:51'),(36594,'0013A20040A96579',6,'29DC4D4C','2017-01-04 03:26:51','2017-01-04 03:26:51'),(36595,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:26:51','2017-01-04 03:31:33'),(36596,'0013A20040A96579',9,'29DC4D4C','2017-01-04 03:31:33','2017-01-04 03:31:53'),(36597,'0013A20040A96579',6,'29DC4D4C','2017-01-04 03:31:53','2017-01-04 03:31:53'),(36598,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:31:53','2017-01-04 03:37:56'),(36599,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:37:56','2017-01-04 03:37:56'),(36600,'0013A20040A96579',10,'29DC4D4C','2017-01-04 03:37:56','2017-01-04 03:37:56'),(36601,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:37:56','2017-01-04 03:37:56'),(36602,'0013A20040A96579',2,'29DC4D4C','2017-01-04 03:37:56','2017-01-04 03:37:56'),(36603,'0013A20040A96579',9,'29DC4D4C','2017-01-04 03:37:56','2017-01-04 03:37:56'),(36604,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:37:56','2017-01-04 03:37:56'),(36605,'0013A20040A96579',4,'29DC4D4C','2017-01-04 03:37:56','2017-01-04 03:37:56'),(36606,'0013A20040A96579',7,'29DC4D4C','2017-01-04 03:37:56','2017-01-04 03:37:56'),(36607,'0013A20040A96579',2,'29DC4D4C','2017-01-04 03:37:56','2017-01-04 03:37:56'),(36608,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:37:56','2017-01-04 03:44:59'),(36609,'0013A20040A96579',7,'29DC4D4C','2017-01-04 03:44:59','2017-01-04 03:44:59'),(36610,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:44:59','2017-01-04 03:44:59'),(36611,'0013A20040A96579',6,'29DC4D4C','2017-01-04 03:44:59','2017-01-04 03:44:59'),(36612,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:44:59','2017-01-04 03:50:41'),(36613,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:50:41','2017-01-04 03:50:41'),(36614,'0013A20040A96579',4,'29DC4D4C','2017-01-04 03:50:41','2017-01-04 03:50:41'),(36615,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:50:41','2017-01-04 03:52:02'),(36616,'0013A20040A96579',7,'29DC4D4C','2017-01-04 03:52:02','2017-01-04 03:52:02'),(36617,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:52:02','2017-01-04 03:52:02'),(36618,'0013A20040A96579',2,'29DC4D4C','2017-01-04 03:52:02','2017-01-04 03:52:02'),(36619,'0013A20040A96579',8,'29DC4D4C','2017-01-04 03:52:02','2017-01-04 04:02:06'),(36620,'0013A20040A96579',8,'29DC4D4C','2017-01-04 04:02:06','2017-01-04 04:02:06'),(36621,'0013A20040A96579',7,'29DC4D4C','2017-01-04 04:02:06','2017-01-04 04:02:06'),(36622,'0013A20040A96579',9,'29DC4D4C','2017-01-04 04:02:06','2017-01-04 04:02:06'),(36623,'0013A20040A96579',12,'29DC4D4C','2017-01-04 04:02:06','2017-01-04 04:02:06'),(36624,'0013A20040A96579',8,'29DC4D4C','2017-01-04 04:02:06','2017-01-04 04:04:47'),(36625,'0013A20040A96579',8,'29DC4D4C','2017-01-04 04:04:47','2017-01-04 04:06:08'),(36626,'0013A20040A96579',4,'29DC4D4C','2017-01-04 04:06:08','2017-01-04 04:06:08'),(36627,'0013A20040A96579',11,'29DC4D4C','2017-01-04 04:06:08','2017-01-04 04:06:48'),(36628,'0013A20040A96579',8,'29DC4D4C','2017-01-04 04:06:48','2017-01-04 04:20:53'),(36629,'0013A20040A96579',8,'29DC4D4C','2017-01-04 04:20:53','2017-01-04 04:23:06'),(36630,'0013A20040A96579',7,'29DC4D4C','2017-01-04 04:23:06','2017-01-04 04:23:10'),(36631,'0013A20040A96579',2,'29DC4D4C','2017-01-04 04:23:10','2017-01-04 04:23:16'),(36632,'0013A20040A96579',8,'29DC4D4C','2017-01-04 04:23:16','2017-01-04 04:52:54'),(36633,'0013A20040A96579',12,'29DC4D4C','2017-01-04 04:52:54','2017-01-04 04:53:58'),(36634,'0013A20040A96579',8,'29DC4D4C','2017-01-04 04:53:58','2017-01-04 23:15:21'),(36635,'0013A20040A96579',7,'29DC4D4C','2017-01-04 23:15:21','2017-01-04 23:15:51'),(36636,'0013A20040A96579',8,'29DC4D4C','2017-01-04 23:15:51','2017-01-14 13:35:55'),(36637,'0013A20040A96579',10,'29DC4D4C','2017-01-14 13:35:55',NULL);
/* FIM CONTROLE */