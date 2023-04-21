# Use the official Ruby image as the base image
FROM ruby:3.2.1

# Set the working directory inside the container
WORKDIR /server

COPY Gemfile Gemfile.lock ./

# Install the required packages for building native extensions and running a Rails app
RUN apt-get update && \
    apt-get install -y build-essential postgresql-client nodejs yarn tzdata imagemagick ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
# Copy the Gemfile and Gemfile.lock files into the container

RUN gem install bundler:2.4.6

# Set the bundler config to exclude development and test dependencies
# RUN bundle config set --without development test

# Install the dependencies
RUN bundle install

# Copy the rest of the application code into the container
COPY . .

# Precompile the assets
# RUN bundle exec rake assets:precompile RAILS_ENV=production

# Set the Rails environment to production
# ENV RAILS_ENV=production

# Expose port 3000 to the host machine
EXPOSE 3001

# Start the Rails server when the container starts
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3001"]
