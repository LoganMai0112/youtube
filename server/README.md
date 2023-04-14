# MyTube



This is my project to learn how to build a app using Ruby on Rails framework. Watch demo [here](http://137.184.91.249/)



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



### 4. Start server



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



