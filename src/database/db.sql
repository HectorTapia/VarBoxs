CREATE DATABASE var_boxs;

USE var_boxs;

-- TABLA USERS
CREATE TABLE users(
    id_us INT(11) NOT NULL,
    nombre_us VARCHAR(20) NOT NULL,
    app_us VARCHAR(20) NOT NULL,
    apm_us VARCHAR(20) NOT NULL,
    email_us VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id_us);

ALTER TABLE users
    MODIFY id_us INT(11) NOT NULL AUTO_INCREMENT;

-- TABLA LINKS
CREATE TABLE links(
    id_li INT(11) NOT NULL,
    title VARCHAR(50) NOT NULL,
    url VARCHAR(50) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id_us)
);

ALTER TABLE links
    ADD PRIMARY KEY (id_li);

ALTER TABLE links
    MODIFY id_li INT(11) NOT NULL AUTO_INCREMENT;