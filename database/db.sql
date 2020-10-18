CREATE DATABASE nicomahnic;

USE nicomahnic;

CREATE TABLE favlinks_usr(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE favlinks_usr
    ADD PRIMARY KEY (id);

ALTER TABLE favlinks_usr
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;

DESCRIBE favlinks_usr;

CREATE TABLE favlinks_link(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp
    #CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES favlinks_usr(id)
);

ALTER TABLE favlinks_link
	ADD PRIMARY KEY (id);
    
ALTER TABLE favlinks_link
	MODIFY id INT(11) NOT NULL AUTO_INCREMENT;
    
# Falta agregar esto porque no tengo permisos
ALTER TABLE favlinks_link
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES favlinks_usr(id);
    
DESCRIBE favlinks_link;

SHOW TABLES;

DROP TABLE favlinks_link;
SELECT * FROM favlinks_link;

INSERT INTO favlinks_link (title, url, description) values ('hola','pagina1','hola');