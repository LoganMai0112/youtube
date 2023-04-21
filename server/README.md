# MyTube

- Ruby [3.2.1](https://github.com/rbenv/rbenv)

- Rails [7.0.4](https://github.com/rails/rails)


## Installation



Install the dependencies and devDependencies and start the server.


### 1. Installing necessary gem and setup the database



- Installing gem in Gemfile:



```

$ bundle install # or bundle

```



- Migrating database:



```

rails db:migrate

```



- If you want to create fake data, run:



```

rails db:seed

```

### 2. Install service

- Elasticsearch: You can read about how to install elastic search [here](https://phoenixnap.com/kb/install-elasticsearch-ubuntu)


- Redis: Install database for background job [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-20-04)


### 3. Start server



- Open a terminal and run:



```

rails s

```

- Run sidekiq service:



```

bundle exec sidekiq

```









## License



MIT



