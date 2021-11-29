Run MYSQL via Docker
  
  - run following commands
	docker-compose up --build
        docker ps
        docker exec -it <container_id> /bin/bash
  - mysql commands
	mysql -u <username> -p
        SHOW DATABASES;
	USE cargo;
	SHOW TABLES;
	DROP TABLE <table name>;
	describe <table name>;



Sequelize commands:
    - sequelize init
    - sequelize migration:create --name create_trucks
    - sequelize model:create --name User --attributes firstName:string...
    - sequelize db:migrate --env production
    - sequelize db:migrate
    - sequelize db:migrate:undo
    - sequelize db:migrate:undo:all
    - sequelize seed:create --name <table name>
    - sequelize db:seed:all
    - sequelize db:seed --seed filename
    - sequelize db:seed:undo
