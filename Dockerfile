FROM node:16-bullseye-slim as NODE_MODULES

ARG GITHUB_TOKEN

COPY package.json .

COPY package-lock.json .

RUN git config --global url."https://${GITHUB_TOKEN}@github.com".insteadOf ssh://git@github.com \
    && npm install \
    && git config --global --remove-section url."https://${GITHUB_TOKEN}@github.com"

FROM node:16-bullseye-slim

LABEL name="ember_syfl_blueprints"
LABEL version="0.0.0"

RUN apt-get update \
    && apt-get install -y apt-transport-https ca-certificates curl gnupg --no-install-recommends \
	&& curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
	&& echo "deb https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
	&& apt-get update && apt-get install -y google-chrome-stable --no-install-recommends \
	&& rm -rf /var/lib/apt/lists/* \
  && apt-get clean

RUN sed -i 's/"$@"/--no-sandbox "$@"/g' /opt/google/chrome/google-chrome

RUN mkdir -p /opt/frontend

WORKDIR /opt/frontend

COPY --from=NODE_MODULES node_modules/ node_modules/

COPY . .

# set container bash prompt color to blue in order to
# differentiate container terminal sessions from host
# terminal sessions
RUN \
	echo 'PS1="\[\\e[0;94m\]${debian_chroot:+($debian_chroot)}\\u@\\h:\\w\\\\$\[\\e[m\] "' >> ~/.bashrc

EXPOSE 4200 35730

CMD ["npm", "run", "start"]
