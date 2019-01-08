FROM openjdk:8-jre@sha256:a59ad342ef844a9223612e7df4a3ad31972b86e325498a2863f9f3a33be658a2
LABEL maintainer "spark_team"

ARG REFRESHED_AT
ENV REFRESHED_AT $REFRESHED_AT

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN mkdir -p opt/dynamodb
WORKDIR /opt/dynamodb

# Download and unpack dynamodb.
# Links are from: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
RUN wget https://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz -q -O - | tar -xz
  
# The entrypoint is the dynamodb jar. Default port is 8000.
EXPOSE 8000

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -qq --no-install-recommends \
  nodejs \
  yarn \
  git \
  && rm -rf /var/lib/apt/lists/*

ENV DB_PORT http://localhost:8000
ENTRYPOINT ["java", "-jar", "DynamoDBLocal.jar"]
