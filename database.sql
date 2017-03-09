create database diningmanager;

create user 'sebastian'@'localhost' identified by hejsan;

grant all privileges on diningmanager.* to 'sebastian'@'localhost';

quit

mysql -u sebastian -p
hejsan


CREATE TABLE `members` (
  `email` varchar(50) NOT NULL,
  `password` char(128) NOT NULL,
  `map` varchar(65000) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tables` (
  `tableID` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  KEY `email_idx` (`email`),
  CONSTRAINT `email` FOREIGN KEY (`email`) REFERENCES `members` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `bookings` (
  `email` varchar(50) NOT NULL,
  `tableID` int(11) NOT NULL,
  `time` time NOT NULL,
  `duration` int(11) NOT NULL DEFAULT '7200',
  KEY `bookingemail_idx` (`email`),
  CONSTRAINT `bookingemail` FOREIGN KEY (`email`) REFERENCES `tables` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
