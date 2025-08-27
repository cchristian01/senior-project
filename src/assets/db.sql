create table ln_users(
	id INT auto_increment primary key NOT NULL,
    ln_email VARCHAR(100) unique key NOT NULL,
    ln_username VARCHAR(50) unique key NOT NULL,
    ln_pwd VARCHAR(255) NOT NULL,
    ln_score INT DEFAULT 0,
    ln_created_on DATETIME DEFAULT CURRENT_TIMESTAMP
);


create table ln_paths(
    id INT auto_increment primary key NOT NULL,
    path_name VARCHAR(50) unique key NOT NULL,
    path_total_points INT DEFAULT 100


);


create table ln_subjects(

    id INT auto_increment primary key NOT NULL,
    subject_name VARCHAR(30) unique key NOT NULL,
    path_id INT NOT NULL,
    subject_total_points INT DEFAULT 1,
    foreign key (path_id) references ln_paths(id)

);


create table ln_progress(
    progress_user_id INT NOT NULL,
    progress_path_id INT NOT NULL,
    progress_subject_id INT NOT NULL,
    points_earned INT DEFAULT 0,
    subject_value DOUBLE(11, 4) DEFAULT 0,
    path_value DOUBLE(11, 4) DEFAULT 0,
    CONSTRAINT pk_progress_id primary key (progress_user_id, progress_path_id, progress_subject_id),
    FOREIGN KEY (progress_user_id) REFERENCES ln_users(id),
    FOREIGN KEY (progress_path_id) REFERENCES ln_paths(id),
    FOREIGN KEY (progress_subject_id) REFERENCES ln_subjects(id)
    

);