DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id varchar(40) NOT NULL,
    food_id MEDIUMINT,
    quantity INT NOT NULL,
    FOREIGN KEY(food_id) REFERENCES menu(id)
);


DROP TABLE IF EXISTS served;
CREATE TABLE served (
    order_id VARCHAR(10) NOT NULL,
    served varchar(5) DEFAULT 'false',
    timeOfOrder TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS students;
CREATE TABLE students (
    name VARCHAR(20),
    password VARCHAR(20),
    
)