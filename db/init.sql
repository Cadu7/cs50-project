CREATE TABLE task_list
(
    id     CHAR(36)      PRIMARY KEY NOT NULL,
    name   VARCHAR(255)  NOT NULL,
    active BOOLEAN       DEFAULT TRUE
);


CREATE TABLE task_item
(
    id          CHAR(36)      PRIMARY KEY NOT NULL,
    list_id     CHAR(36)      NOT NULL,
    content     VARCHAR(255)  NOT NULL,
    end_date    DATE          NOT NULL,
    priority    SMALLINT      NOT NULL,
    done        BOOLEAN       DEFAULT FALSE,
    FOREIGN KEY (list_id) REFERENCES task_list(id)
);