FROM debian

ENV DEBIAN_FRONTEND noninteractive

# Install nodejs dependencies
RUN \
   apt-get update && \
   apt-get install --no-install-recommends -y \
      apt-transport-https \
      build-essential \
      ca-certificates \
      curl \
      gnupg \
      lsb-release \
      python-minimal && \
   apt-get clean && \
   rm -Rf /var/lib/apt/lists/*


# Install nodejs
ENV NODE_URL https://deb.nodesource.com/setup_8.x

RUN \
   curl -sL /tmp/install_nodejs.sh ${NODE_URL} | bash - && \
   apt-get install --no-install-recommends -y \
      nodejs && \
   apt-get clean && \
   rm -Rf /var/lib/apt/lists/*


# Create the working context
RUN mkdir -p /code

# Copy our code
ADD ./entrypoint.sh /entrypoint.sh
ADD ./app/ /code/app/

WORKDIR /code/app

EXPOSE 3000

# Install npm dependencies inside the mounted volume and then runs the app
CMD ["/entrypoint.sh"]
